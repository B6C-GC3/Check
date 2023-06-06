using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utils.FileProcess
{
    public interface ISaveFile
    {

    }

    public class SaveFile : ISaveFile
    {
        private readonly IHostingEnvironment _environment;

        public SaveFile(IHostingEnvironment environment)
        {
            _environment = environment;
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
    }
}
