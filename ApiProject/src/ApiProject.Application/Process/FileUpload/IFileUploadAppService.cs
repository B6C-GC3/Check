using Abp.Application.Services;
using ApiProject.Shared.DataTransfer.FileUpload;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Process.FileUpload
{
    public interface IFileUploadAppService : IApplicationService
    {
        // get name image by root image
        Task<List<string>> GetFullUriNameByNameRoot(string uriRoot);
        // basic file
        Task<FileUploadRep> UploadAndCleanFileBasic([FromForm] IFormFile file, string historyFile);
        Task<string> UploadFileBasic([FromForm] IFormFile file);
        Task<bool> RemoveFileBasic(string uriFile);
        Task<List<string>> UploadAndCleanFilesBasic([FromForm] List<IFormFile> files, List<string> historyFiles);
        Task<List<string>> UploadFilesBasic([FromForm] List<IFormFile> files);
        Task<List<string>> RemoveFilesBasic(List<string> uriFiles);
        Task<FileUploadRep> UploadChunks([FromForm] FileUploadRequest input);
        //Task UploadChunks([FromForm] FileUploadRequest input);
        Task<FileUploadRep> UploadComplete(string fileName);

        //// FTP file
        //Task<string> UploadFile([FromForm] IFormFile file, string historyFile);
        //Task<string> RemoveFile(string uriFile);
        //Task<List<string>> UploadFiles([FromForm] List<IFormFile> files, List<string> historyFiles);
        //Task<List<string>> RemoveFiles(List<string> uriFiles);
    }
}
