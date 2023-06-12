using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Utils.Aggregate;
using Utils.ImageProcess.Dto;
using Utils.ImageProcess.Enum;

namespace Utils.ImageProcess
{
    public class SaveFile
    {
        public IHostingEnvironment _environment;
        public SaveFile()
        {
            _environment = (IHostingEnvironment)StaticServiceProvider.Provider.GetService(typeof(IHostingEnvironment));
        }

        public async Task<string> SaveToHostAsync(IFormFile file)
        {
            return "";
        }

        public async Task<string> SaveToHereAsync(IFormFile file)
        {
            return "";
        }

        public string SaveToHost(IFormFile file)
        {
            return "";
        }

        public string SaveToHere(IFormFile file)
        {
            string wwwPath = _environment.WebRootPath;
            string contentPath = _environment.ContentRootPath;

            string path = Path.Combine(_environment.WebRootPath, "Uploads");

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            string fileName = Path.GetFileName(file.FileName);
            using (FileStream stream = new FileStream(Path.Combine(path, fileName), FileMode.Create))
            {
                file.CopyTo(stream);
            }
            return "";
        }

        public ImageResizeOutput SaveImageConvert(ResizeImageOutput file)
        {
            const string IMAGE_SAVE_FOLDER = "Zzartjvost";

            string path = Path.Combine(_environment.WebRootPath, IMAGE_SAVE_FOLDER);

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            string fullName = @$"{file.Uid}{ConfigSizeImage.NameSizeDefault(file.Size)}{ExtensionType.JPG}";
            var fullpath = Path.Combine(path, fullName);
            using (FileStream stream = new FileStream(fullpath, FileMode.Create))
            {
                try
                {
                    file.Bitmap.Save(stream, format: ImageFormat.Jpeg);
                    return new ImageResizeOutput
                    {
                        Uid = file.Uid,
                        Size = ConfigSizeImage.NameSizeDefault(file.Size),
                        Url = fullName
                    };
                }
                catch
                {
                    return null;
                }
            }
        }
    }
}
