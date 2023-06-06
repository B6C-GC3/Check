using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO.Pipelines;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Aggregate.TypeFile
{
    public enum ImageTypes
    {
        Apng,
        Avif,
        Gif,
        Jpeg,
        Png,
        Svg,
        Webp,
        Bmp,
        Ico,
        Tiff,
        Mp4
    }

    public static class MimeImage
    {
        public static readonly string Apng = "image/apng";
        public static readonly string Avif = "image/avif";
        public static readonly string Gif = "image/gif";
        public static readonly string Jpeg = "image/jpeg";
        public static readonly string Png = "image/png";
        public static readonly string Svg = "image/svg+xml";
        public static readonly string Webp = "image/webp";
        public static readonly string Bmp = "image/bmp";
        public static readonly string Ico = "image/ico";
        public static readonly string Tiff = "image/tiff";
        public static readonly string Mp4 = "video/mp4";
    }

    public static class ImageExtention
    {
        public static readonly string Apng = ".apng";
        public static readonly string Avif = ".avif";
        public static readonly string Gif = ".gif";
        public static readonly string Jpeg = ".jpeg";
        public static readonly string Png = ".png";
        public static readonly string Svg = ".svg";
        public static readonly string Webp = ".webp";
        public static readonly string Bmp = ".bmp";
        public static readonly string Ico = ".ico";
        public static readonly string Tiff = ".tiff";
        public static readonly string Mp4 = ".mp4";

        public static readonly string[] ApngGroup = new string[] { ".apng" };
        public static readonly string[] AvifGroup = new string[] { ".avif" };
        public static readonly string[] GifGroup = new string[] { ".gif" };
        public static readonly string[] JpegGroup = new string[] { ".jpg", ".jpeg", ".jfif", ".pjpeg", ".pjp" };
        public static readonly string[] PngGroup = new string[] { ".png" };
        public static readonly string[] SvgGroup = new string[] { ".svg" };
        public static readonly string[] WebpGroup = new string[] { ".webp" };
        public static readonly string[] BmpGroup = new string[] { ".bmp" };
        public static readonly string[] IcoGroup = new string[] { ".ico", ".cur" };
        public static readonly string[] TiffGroup = new string[] { ".tif", ".tiff" };
        public static readonly string[] Mp4Group = new string[] { ".mp4" };

        public static readonly string[] ApngSize = new string[] {};
        public static readonly string[] AvifSize = new string[] { };
        public static readonly string[] GifSize = new string[] { };
        /// <summary>120x120,60x60,48x48</summary>
        public static readonly string[] JpegSize = new string[] { "x31323078313230", "x3630783630", "x3438783438" };
        public static readonly string[] PngSize = new string[] { };
        public static readonly string[] SvgSize = new string[] { };
        public static readonly string[] WebpSize = new string[] { };
        public static readonly string[] BmpSize = new string[] { };
        public static readonly string[] IcoSize = new string[] { };
        public static readonly string[] TiffSize = new string[] { };
        public static readonly string[] Mp4Size = new string[] { };

    }

    public static class ImageConversion
    {
        public static readonly IDictionary<ImageTypes, string[]> ImageTypeGroupDictionary = new Dictionary<ImageTypes, string[]>
        {
            { ImageTypes.Apng, ImageExtention.ApngGroup },
            { ImageTypes.Avif, ImageExtention.AvifGroup },
            { ImageTypes.Gif, ImageExtention.GifGroup },
            { ImageTypes.Jpeg, ImageExtention.JpegGroup },
            { ImageTypes.Png, ImageExtention.PngGroup },
            { ImageTypes.Svg, ImageExtention.SvgGroup },
            { ImageTypes.Webp, ImageExtention.WebpGroup},
            { ImageTypes.Bmp, ImageExtention.BmpGroup },
            { ImageTypes.Ico, ImageExtention.IcoGroup },
            { ImageTypes.Tiff, ImageExtention.TiffGroup },
            { ImageTypes.Mp4, ImageExtention.Mp4Group }
        };

        public static readonly IDictionary<ImageTypes, string> ImageExtentionDictionary = new Dictionary<ImageTypes, string>
        {
            { ImageTypes.Apng, ImageExtention.Apng },
            { ImageTypes.Avif, ImageExtention.Avif },
            { ImageTypes.Gif, ImageExtention.Gif },
            { ImageTypes.Jpeg, ImageExtention.Jpeg },
            { ImageTypes.Png, ImageExtention.Png },
            { ImageTypes.Svg, ImageExtention.Svg },
            { ImageTypes.Webp, ImageExtention.Webp},
            { ImageTypes.Bmp, ImageExtention.Bmp },
            { ImageTypes.Ico, ImageExtention.Ico },
            { ImageTypes.Tiff, ImageExtention.Tiff },
            { ImageTypes.Mp4, ImageExtention.Mp4 }
        };

        public static readonly IDictionary<ImageTypes, string> ImageMimeTypeDictionary = new Dictionary<ImageTypes, string>
        {
            { ImageTypes.Apng, MimeImage.Apng },
            { ImageTypes.Avif, MimeImage.Avif },
            { ImageTypes.Gif, MimeImage.Gif },
            { ImageTypes.Jpeg, MimeImage.Jpeg },
            { ImageTypes.Png, MimeImage.Png },
            { ImageTypes.Svg, MimeImage.Svg },
            { ImageTypes.Webp, MimeImage.Webp},
            { ImageTypes.Bmp, MimeImage.Bmp },
            { ImageTypes.Ico, MimeImage.Ico },
            { ImageTypes.Tiff, MimeImage.Tiff },
            { ImageTypes.Mp4, MimeImage.Mp4 },
        };

        public static readonly IDictionary<ImageTypes, string> FolderSaveImageDictionary = new Dictionary<ImageTypes, string>
        {
            { ImageTypes.Apng, "Btntimtbnk" },
            { ImageTypes.Avif, "Qyclyapzyy" },
            { ImageTypes.Gif,  "Bpnliueqjf" },
            { ImageTypes.Jpeg, "Cxrovxxtvv" },
            { ImageTypes.Png,  "Zzartjvost" },
            { ImageTypes.Svg,  "Arkvyevhrk" },
            { ImageTypes.Webp, "Lyjeuxceyy" },
            { ImageTypes.Bmp,  "Qrjmxmloiw" },
            { ImageTypes.Ico,  "Pxkcqpyhlp" },
            { ImageTypes.Tiff, "Uqqpknnysf" },
            { ImageTypes.Mp4, "BbvTHviiQD" },
        };
    }

    public static class FormatFile
    {
        public static readonly string RootImage = "x726f6f74";

        public static readonly IDictionary<ImageTypes, string[]> ImageSizeDictionary = new Dictionary<ImageTypes, string[]>
        {
            { ImageTypes.Apng, ImageExtention.ApngSize },
            { ImageTypes.Avif, ImageExtention.AvifSize },
            { ImageTypes.Gif, ImageExtention.GifSize },
            { ImageTypes.Jpeg, ImageExtention.JpegSize },
            { ImageTypes.Png, ImageExtention.PngSize },
            { ImageTypes.Svg, ImageExtention.SvgSize },
            { ImageTypes.Webp, ImageExtention.WebpSize },
            { ImageTypes.Bmp, ImageExtention.BmpSize },
            { ImageTypes.Ico, ImageExtention.IcoSize },
            { ImageTypes.Tiff, ImageExtention.TiffSize },
            { ImageTypes.Mp4, ImageExtention.Mp4Size },
        };
    }
}
