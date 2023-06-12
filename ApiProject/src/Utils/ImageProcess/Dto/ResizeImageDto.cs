using System;
using System.Collections.Generic;
using System.Drawing;
using System.Text;
using Utils.ImageProcess.Enum;

namespace Utils.ImageProcess.Dto
{
    public class ResizeImageDto : BasicImage
    {
        public ResizeImageDto()
        {

        }

        public ResizeImageDto(Bitmap image)
        {
            this.Image = image;
            this.Quality = ConfigImaging.High;
            this.Ratio = true;
            this.ListSizeImages = new List<SizeImage>(){
                 SizeImage.S120x120,
                 SizeImage.S300x300,
                 SizeImage.S180x180,
                 SizeImage.S340x340,
                 SizeImage.S80x80,
                 SizeImage.S220x220,
                 SizeImage.S1360x1360
            };
        }

        public bool Ratio { get; set; }
        public List<SizeImage> ListSizeImages { get; set; }
    }

    public class ListSizeImage
    {
        public int MaxWidth { get; set; }
        public int MaxHeight { get; set; }
    }

    public class BasicImage
    {
        public Image Image { get; set; }
        public string UrlReturn { get; set; }
        public string NameReturn { get; set; }
        public ConfigImaging Quality { get; set; } = ConfigImaging.Low;
    }

    public class SizeImageDto
    {
        public int MaxWidth { get; set; }
        public int MaxHeight { get; set; }
    }

    public class ResizeImageOutput
    {
        public string Uid { get; set; }
        public SizeImage Size { get; set; }
        public Bitmap Bitmap { get; set; }

    }

    public class ImageResizeOutput
    {
        public string Uid { get; set; }
        public string Size { get; set; }
        public string Url { get; set; }
    }

    public static class ConfigSizeImage
    {
        public static SizeImageDto ReturnSizeDefault(SizeImage sizeImage)
        {
            return sizeImage switch
            {
                SizeImage.S120x120 => new SizeImageDto { MaxWidth = 120, MaxHeight = 120 },
                SizeImage.S300x400 => new SizeImageDto { MaxWidth = 300, MaxHeight = 400 },
                SizeImage.S600x800 => new SizeImageDto { MaxWidth = 600, MaxHeight = 800 },
                SizeImage.S800x500 => new SizeImageDto { MaxWidth = 800, MaxHeight = 500 },
                SizeImage.S300x188 => new SizeImageDto { MaxWidth = 300, MaxHeight = 188 },
                SizeImage.S1360x540 => new SizeImageDto { MaxWidth = 1360, MaxHeight = 540 },
                SizeImage.S300x300 => new SizeImageDto { MaxWidth = 300, MaxHeight = 300 },
                SizeImage.S640x360 => new SizeImageDto { MaxWidth = 640, MaxHeight = 360 },
                SizeImage.S180x180 => new SizeImageDto { MaxWidth = 180, MaxHeight = 180 },
                SizeImage.S340x340 => new SizeImageDto { MaxWidth = 340, MaxHeight = 340 },
                SizeImage.S80x80 => new SizeImageDto { MaxWidth = 80, MaxHeight = 80 },
                SizeImage.S220x220 => new SizeImageDto { MaxWidth = 220, MaxHeight = 220 },
                SizeImage.S1360x1360 => new SizeImageDto { MaxWidth = 1360, MaxHeight = 1360 },
                _ => throw new NotImplementedException()
            };
        }

        public static string NameSizeDefault(SizeImage sizeImage)
        {
            return sizeImage switch
            {
                SizeImage.S120x120 => "s120x120",
                SizeImage.S300x400 => "s300x400",
                SizeImage.S600x800 => "s600x800",
                SizeImage.S800x500 => "s800x500",
                SizeImage.S300x188 => "s300x188",
                SizeImage.S1360x540 => "s1360x540",
                SizeImage.S300x300 => "s300x300",
                SizeImage.S640x360 => "s640x360",
                SizeImage.S180x180 => "s180x180",
                SizeImage.S340x340 => "s340x340",
                SizeImage.S80x80 => "s80x80",
                SizeImage.S220x220 => "s220x220",
                SizeImage.S1360x1360 => "s1360x1360",
                _ => throw new NotImplementedException()
            };
        }
    }
}
