using System;
using System.Collections.Generic;
using System.Drawing;
using System.Text;
using System.Threading.Tasks;
using Utils.Exceptions;
using Microsoft.AspNetCore.Hosting;

namespace Utils.ImageProcess
{
    public class OpenFile
    {
        public IHostingEnvironment _environment;
        public OpenFile()
        {
            _environment = (IHostingEnvironment)StaticServiceProvider.Provider.GetService(typeof(IHostingEnvironment));
        }

        public async Task<Bitmap> ReadImageToBitmap(string file)
        {
            Bitmap bitmap = null;
            try
            {
                if (file != null && file.Length > 0)
                {
                    var pathRoot = _environment.WebRootPath;
                    var filePath = string.Format(@"{0}{1}", pathRoot, file);
                    bitmap = (Bitmap)Image.FromFile(filePath);
                }
            }
            catch (Exception ex)
            {
                throw new ClientException("IMAGE", ERROR_DATA.WRONG_FORMAT);
            }
            return bitmap;
        }

        public async Task<List<Bitmap>> ReadImageToBitmaps(List<string> files)
        {
            List<Bitmap> bitmaps = new List<Bitmap>();
            if (files != null && files.Count != 0)
            {
                for (int i = 0; i < files.Count; i++)
                {
                    if (files[i] != null && files[i].Length > 0)
                    {
                        var pathRoot = _environment.WebRootPath;
                        var filePath = string.Format(@"{0}{1}", pathRoot, files[i]);
                        bitmaps.Add((Bitmap)Image.FromFile(filePath));
                    }
                    else
                    {
                        bitmaps.Clear();
                        break;
                    }
                }
            }
            return bitmaps;
        }
    }
}
