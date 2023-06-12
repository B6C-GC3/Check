using System;
using System.Collections.Generic;
using System.Drawing;
using System.Text;
using Utils.ImageProcess.Dto;
using Utils.ImageProcess.Enum;

namespace Utils.ImageProcess
{
    public static class ResizeImage
    {
        /// <summary>
        /// ResizeImage đơn từng ảnh một
        /// </summary>
        public static List<ResizeImageOutput> ResizeImageToBitmap(List<ResizeImageDto> data)
        {
            List<ResizeImageOutput> allImageRetunName = new List<ResizeImageOutput>();
            foreach (var resizeImageDto in data)
            {
                string uid = Guid.NewGuid().ToString();
                // cho phép tăng cả chiều cao và chiều dài hay không .
                // nếu true thì chỉ tăng theo cạnh nhỏ nhất cạnh còn lại phụ thuộc vào tỷ lệ hình gốc
                if (resizeImageDto.Ratio)
                {
                    foreach (var ItemSize in resizeImageDto.ListSizeImages)
                    {
                        //convert image to size
                        var size = ConfigSizeImage.ReturnSizeDefault(ItemSize);
                        #region Ảnh theo kích thước truyền vào và giữ nguyên cấu trúc ảnh
                        // tỉ lệ các cạnh
                        var ratioX = (double)size.MaxWidth / resizeImageDto.Image.Width;
                        var ratioY = (double)size.MaxHeight / resizeImageDto.Image.Height;
                        //lấy tỷ lệ thấp nhất trong 2 tỷ lệ truyền vào để giữ cấu trúc của ảnh
                        var ratioNow = Math.Min(ratioX, ratioY);
                        //Tinh lai cac canh moi
                        int newWidth = (int)(resizeImageDto.Image.Width * ratioNow);
                        int newHeight = (int)(resizeImageDto.Image.Height * ratioNow);

                        var newImage = new Bitmap(newWidth, newHeight);
                        Graphics thumbGraph = Graphics.FromImage(newImage);
                        ConfigGraphics.quatityImaging(thumbGraph, resizeImageDto.Quality);
                        thumbGraph.DrawImage(resizeImageDto.Image, 0, 0, newWidth, newHeight);
                        allImageRetunName.Add(new ResizeImageOutput { Uid = uid, Size = ItemSize, Bitmap = newImage });

                        #endregion
                    }
                }
                else
                {
                    //foreach (var itemSize in resizeImageDto.ListSizeImages)
                    //{
                    //    //convert image to size
                    //    var size = ConfigSizeImage.ReturnSizeDefault(itemSize);
                    //    #region Ảnh theo kích thước truyền vào và giữ nguyên cấu trúc ảnh
                    //    // tỉ lệ các cạnh
                    //    var ratioX = (double)size.MaxWidth / resizeImageDto.Image.Width;
                    //    var ratioY = (double)size.MaxHeight / resizeImageDto.Image.Height;
                    //    //lấy tỷ lệ thấp nhất trong 2 tỷ lệ truyền vào để giữ cấu trúc của ảnh
                    //    var ratioNow = Math.Min(ratioX, ratioY);
                    //    //Tinh lai cac canh moi
                    //    int newWidth = (int)(resizeImageDto.Image.Width * ratioNow);
                    //    int newHeight = (int)(resizeImageDto.Image.Height * ratioNow);

                    //    var newImage = new Bitmap(newWidth, newHeight);
                    //    Graphics thumbGraph = Graphics.FromImage(newImage);
                    //    ConfigGraphics.quatityImaging(thumbGraph, resizeImageDto.Quality);
                    //    thumbGraph.DrawImage(resizeImageDto.Image, 0, 0, newWidth, newHeight);
                    //    allImageRetunName.Add(new ResizeImageOutput { Uid = uid, Size = itemSize, Bitmap = newImage });
                    //    #endregion

                    //    #region Ảnh theo kích thước truyền vào và theo tỷ lệ truyền vào
                    //    // tỉ lệ các cạnh
                    //    ratioX = (double)size.MaxWidth / resizeImageDto.Image.Width;
                    //    ratioY = (double)size.MaxHeight / resizeImageDto.Image.Height;
                    //    //tỉ lệ ảnh và chiều dài rộng truyền vào => ảnh sẽ có kích thước như tham số truyền vào
                    //    newWidth = (int)(resizeImageDto.Image.Width * ratioX);
                    //    newHeight = (int)(resizeImageDto.Image.Height * ratioY);

                    //    using (var newImage = new Bitmap(newWidth, newHeight))
                    //    {
                    //        using (Graphics thumbGraph = Graphics.FromImage(newImage))
                    //        {
                    //            ConfigGraphics.quatityImaging(thumbGraph, resizeImageDto.Quality);
                    //            thumbGraph.DrawImage(resizeImageDto.Image, 0, 0, newWidth, newHeight);
                    //        }
                    //        allImageRetunName.Add(new ResizeImageOutput { Uid = uid, Size = itemSize, Bitmap = newImage });
                    //    }
                    //    #endregion
                    //}
                }
            }
            return allImageRetunName;
        }

        public static Image ResizeNotChangeStructure(Image image, int maxWidth, int maxHeight, ConfigImaging configImaging)
        {
            #region Ảnh theo kích thước truyền vào và giữ nguyên cấu trúc ảnh
            var ratioX = (double)maxWidth / image.Width;
            var ratioY = (double)maxHeight / image.Height;
            var ratioNow = Math.Min(ratioX, ratioY);
            int newWidth = (int)(image.Width * ratioNow);
            int newHeight = (int)(image.Height * ratioNow);

            var newImage = new Bitmap(newWidth, newHeight);
            using (Graphics thumbGraph = Graphics.FromImage(newImage))
            {
                ConfigGraphics.quatityImaging(thumbGraph, configImaging);
                thumbGraph.DrawImage(image, 0, 0, newWidth, newHeight);
            }
            return newImage;
            #endregion
        }

        public static Image ResizeChangeStructure(Image image, int maxWidth, int maxHeight, ConfigImaging configImaging)
        {
            #region Ảnh theo kích thước truyền vào và giữ nguyên cấu trúc ảnh
            var ratioX = (double)maxWidth / image.Width;
            var ratioY = (double)maxHeight / image.Height;
            int newWidth = (int)(image.Width * ratioX);
            int newHeight = (int)(image.Height * ratioY);

            var newImage = new Bitmap(newWidth, newHeight);
            using (Graphics thumbGraph = Graphics.FromImage(newImage))
            {
                ConfigGraphics.quatityImaging(thumbGraph, configImaging);
                thumbGraph.DrawImage(image, 0, 0, newWidth, newHeight);
            }
            return newImage;
            #endregion
        }

        public static Image ResizeImageV2(Image Imagen, int maxWidth, int MaxHeight)
        {
            Image resizedimage = Imagen;

            if (((double)maxWidth / (double)Imagen.Width) < ((double)MaxHeight / (double)Imagen.Height))
                resizedimage = (Image)(new Bitmap((Bitmap)resizedimage, new Size((int)(((double)maxWidth / (double)resizedimage.Width) * (double)resizedimage.Width), (int)(((double)maxWidth / (double)resizedimage.Width) * (double)resizedimage.Height))));
            else
                resizedimage = (Image)(new Bitmap((Bitmap)resizedimage, new Size((int)(((double)MaxHeight / (double)resizedimage.Height) * (double)resizedimage.Width), (int)(((double)MaxHeight / (double)resizedimage.Height) * (double)resizedimage.Height))));
            return resizedimage;
        }
    }
}
