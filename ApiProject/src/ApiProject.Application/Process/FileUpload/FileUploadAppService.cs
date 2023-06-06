using ApiProject.Aggregate.TypeFile;
using ApiProject.ObjectValues;
using ApiProject.Shared.DataTransfer.FileUpload;
using AutoMapper;
using DocumentFormat.OpenXml.Bibliography;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utils.Exceptions;

namespace ApiProject.Process.FileUpload
{
    public class FileUploadAppService : IFileUploadAppService
    {
        [Obsolete]
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IConfiguration _configuration;
        public readonly int chunkSize;
        private readonly string tempFolder;

        [Obsolete]
        public FileUploadAppService(IHostingEnvironment hostingEnvironment, IConfiguration configuration)
        {
            _hostingEnvironment = hostingEnvironment;
            _configuration = configuration;
            chunkSize = 1048576 * Convert.ToInt32(_configuration["ChunkSize"]);
            tempFolder = _configuration["TargetFolder"];
        }

        [HttpGet]
        [Obsolete]
        public Task<List<string>> GetFullUriNameByNameRoot(string uriRoot)
        {
            string path = _hostingEnvironment.WebRootPath + "/" + uriRoot;

            FileInfo file = new(path);
            if (!file.Exists) throw new ClientException("URI_FILE", ERROR_DATA.NOT_EXIST);

            var nameFile = file.Name;
            var exten = file.Extension;
            // bộ size ảnh
            ImageTypes data = ImageConversion.ImageTypeGroupDictionary.FirstOrDefault(m => m.Value.Any(n => n == exten)).Key;
            string[] SizesFile = FormatFile.ImageSizeDictionary.FirstOrDefault(m => m.Key == data).Value;
            string folderSave = ImageConversion.FolderSaveImageDictionary.FirstOrDefault(m => m.Key == data).Value;
            string NameRoot = nameFile.Replace(exten, string.Empty).Replace(FormatFile.RootImage, string.Empty).Trim();

            List<string> urlSubImages = new();
            if (nameFile.Contains(FormatFile.RootImage)) // nếu xóa iamge gốc thì xóa hết image con
            {
                // cắt rootImage
                foreach (var size in SizesFile)
                {
                    var uriImage = $"/{folderSave}/" + @$"{NameRoot}{size}{exten}";
                    var imgPath = _hostingEnvironment.WebRootPath + uriImage;
                    FileInfo fileSub = new(imgPath);
                    if (fileSub.Exists) urlSubImages.Add(uriImage);
                }
            }

            return Task.FromResult(urlSubImages);
        }

        [HttpDelete]
        [Obsolete]
        public async Task<bool> RemoveFileBasic(string uriFile)
        {
            //ImageTypes data =  ImageProcess.ImageTypeGroupDictionary.FirstOrDefault(m => m.Value.Any(n => n == ".png")).Key;

            if (string.IsNullOrEmpty(uriFile))
                throw new ClientException("URI_FILE", ERROR_DATA.NOT_NULL);

            string path = _hostingEnvironment.WebRootPath + "/" + uriFile;

            // xác định phần mở rộng
            FileInfo file = new(path);
            var exten = file.Extension;

            if (!file.Exists)
                throw new ClientException("URI_FILE", ERROR_DATA.NOT_EXIST);

            if (string.IsNullOrEmpty(exten))
                throw new ClientException("URI_FILE", ERROR_DATA.WRONG_FORMAT);

            // get file name
            var nameFile = file.Name;
            if (nameFile.Contains(FormatFile.RootImage)) // nếu xóa iamge gốc thì xóa hết image con
            {
                // xóa image con
                var urlSubImgs = await GetFullUriNameByNameRoot(uriFile);
                foreach (var subImg in urlSubImgs)
                {
                    FileInfo fileSub = new(subImg);
                    fileSub.Delete();
                }

                // xóa image gốc
                file.Delete();
            }
            else // chỉ xóa image con
                file.Delete();

            return true;
        }

        [HttpDelete]
        public async Task<List<string>> RemoveFilesBasic(List<string> uriFiles)
        {
            List<string> filedeleted = new();

            foreach (var file in uriFiles)
            {
                try
                {
                    if (await RemoveFileBasic(file)) filedeleted.Add(file);
                }
                catch { }
            }

            return filedeleted;
        }

        [HttpPost]
        [Obsolete]
        public async Task<FileUploadRep> UploadAndCleanFileBasic([FromForm] IFormFile file, string historyFile)
        {
            if (file == null && file.Length <= 0) throw new ClientException("URI_FILE", ERROR_DATA.WRONG_FORMAT);

            var fileName = Path.GetFileName(file.FileName);
            //var nameFile = file.Name;
            var exten = Path.GetExtension(file.FileName);
            ImageTypes data = ImageConversion.ImageTypeGroupDictionary.FirstOrDefault(m => m.Value.Any(n => n == exten)).Key;
            string[] sizesFile = FormatFile.ImageSizeDictionary.FirstOrDefault(m => m.Key == data).Value;
            string folderSave = ImageConversion.FolderSaveImageDictionary.FirstOrDefault(m => m.Key == data).Value;
            //string nameRoot = nameFile.Replace(exten, string.Empty).Replace(FormatFile.RootImage, string.Empty).Trim();
            var directorySave = _hostingEnvironment.WebRootPath + $"/{folderSave}/";
            // kiểm tra folder
            if (!Directory.Exists(directorySave)) Directory.CreateDirectory(directorySave);
            // kiểm tra kích thước tiêu chuẩn
            // móc kích thức và phân chia theo yêu cầu
            // tạo tên
            var nameSave = @$"{Guid.NewGuid().ToString("N").ToLower() + FormatFile.RootImage + exten}";
            var filePath = directorySave + nameSave;
            // save
            using (var fileStream = new FileStream(filePath, FileMode.Create)) await file.CopyToAsync(fileStream);
            // xóa file cũ
            return new FileUploadRep
            {
                Name = nameSave,
                Status = FileUploadStatus.Done,
                Uid = "1",
                Url = $"/{folderSave}/{nameSave}"
            };
        }

        public Task<string> UploadFileBasic([FromForm] IFormFile file)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public Task<List<string>> UploadAndCleanFilesBasic([FromForm] List<IFormFile> files, List<string> historyFiles)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public Task<List<string>> UploadFilesBasic([FromForm] List<IFormFile> files)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        [Obsolete]
        public async Task<FileUploadRep> UploadChunks([FromForm] FileUploadRequest input)
        {
            if (input.File == null && input.File.Length <= 0) throw new ClientException("URI_FILE", ERROR_DATA.WRONG_FORMAT);
            var directorySave = _hostingEnvironment.WebRootPath + $"/{tempFolder}/";
            if (!Directory.Exists(directorySave)) Directory.CreateDirectory(directorySave);
            var nameSave = $@"{input.Id}x{input.NumberOrder}";
            var filePath = directorySave + nameSave;
            using (var fileStream = new FileStream(filePath, FileMode.Create)) await input.File.CopyToAsync(fileStream);
            return new FileUploadRep
            {
                Name = nameSave,
                Status = FileUploadStatus.Done,
                Uid = "1",
                Url = $"/{tempFolder}/{nameSave}"
            };
        }

        [HttpGet]
        [Obsolete]
        public Task<FileUploadRep> UploadComplete(string fileName)
        {
            var repo = new FileUploadRep();
            try
            {
                FileInfo file = new(fileName);
                var exten = file.Extension;
                fileName = fileName.Replace(exten, String.Empty);

                var directorySave = _hostingEnvironment.WebRootPath + $"/{tempFolder}/";
                string newPath = Path.Combine(directorySave, fileName);
                var filePaths = Directory.GetFiles(directorySave).Where(p => p.Contains(fileName)).Select(n => n).ToList();
                int maxLength = filePaths.Count();

                for (int itemFile = 1; itemFile <= maxLength; itemFile++)
                {
                    var filePath = $@"{newPath}x{itemFile}";
                    if (!filePaths.Any(m => m == filePath)) throw new ClientException("FILE_UPLOAD", ERROR_DATA.UNKNOWN);
                    MergeChunks(newPath, filePath);
                }
                // map kết thúc
                ImageTypes data = ImageConversion.ImageTypeGroupDictionary.FirstOrDefault(m => m.Value.Any(n => n == exten)).Key;
                string folderSave = ImageConversion.FolderSaveImageDictionary.FirstOrDefault(m => m.Key == data).Value;
                // kiểm tra folder
                if (!Directory.Exists($@"{_hostingEnvironment.WebRootPath}/{folderSave}"))
                    Directory.CreateDirectory($@"{_hostingEnvironment.WebRootPath}/{folderSave}");
                string UrlSaveFile = $@"{_hostingEnvironment.WebRootPath}/{folderSave}/{fileName}{exten}";
                File.Move($@"{directorySave}{fileName}", UrlSaveFile);

                repo.Uid = fileName;
                repo.Name = fileName;
                repo.Status = FileUploadStatus.Success;
                repo.NumberOrder = 0;
                repo.Url = $@"/{folderSave}/{fileName}{exten}";

            }
            catch (Exception)
            {
                repo.Uid = fileName;
                repo.Name = fileName;
                repo.Status = FileUploadStatus.Error;
                repo.NumberOrder = 0;
            }
            return Task.FromResult(repo);
        }

        private static void MergeChunks(string chunk1, string chunk2)
        {
            FileStream fs1 = null;
            FileStream fs2 = null;
            try
            {
                fs1 = System.IO.File.Open(chunk1, FileMode.Append);
                fs2 = System.IO.File.Open(chunk2, FileMode.Open);
                byte[] fs2Content = new byte[fs2.Length];
                fs2.Read(fs2Content, 0, (int)fs2.Length);
                fs1.Write(fs2Content, 0, (int)fs2.Length);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + " : " + ex.StackTrace);
            }
            finally
            {
                if (fs1 != null) fs1.Close();
                if (fs2 != null) fs2.Close();
                System.IO.File.Delete(chunk2);
            }
        }
    }
}
