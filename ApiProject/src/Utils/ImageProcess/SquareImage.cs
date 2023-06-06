using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Text;

namespace Utils.ImageProcess
{
    public class SquareImage
    {
        /// <summary>
        /// Chuyển đổi ảnh vuông và ảnh nằm giữa
        /// </summary>
        public Image ConvertSquareImage(Image image)
        {
            // Lấy cạnh lớn nhất
            var MaxEdge = Math.Max(image.Width, image.Height);
            // Tạo bitMap Vuông
            using (Bitmap newImage = new Bitmap(MaxEdge, MaxEdge, PixelFormat.Format24bppRgb))
            {
                // cài độ phân giải
                newImage.SetResolution(80, 60);

                using (Graphics drawing = Graphics.FromImage(newImage))
                {
                    drawing.SmoothingMode = SmoothingMode.HighQuality;
                    drawing.InterpolationMode = InterpolationMode.High;
                    drawing.PixelOffsetMode = PixelOffsetMode.Half;
                    drawing.CompositingQuality = CompositingQuality.HighQuality;
                    Brush aBrush = (Brush)Brushes.LightGray;
                    // ảnh đang nằm ngang => cho ảnh nằm ngang ở giữa nền hình vuông
                    // lấy Width làm cạnh hình vuông
                    if (image.Width > image.Height)
                    {
                        drawing.FillRectangle(aBrush, 0, 0, image.Width, image.Width);
                        drawing.DrawImage(image,
                                      new Rectangle(0, (image.Width - image.Height) / 2,
                                                    image.Width, image.Height),
                                      0, 0, image.Width, image.Height, GraphicsUnit.Pixel);
                    }
                    else
                    {
                        // gán màu nền
                        drawing.FillRectangle(aBrush, 0, 0, image.Height, image.Height);
                        // di chuyển ảnh vào trung tâm
                        drawing.DrawImage(image,
                                      new Rectangle((image.Height - image.Width) / 2, 0,
                                      image.Width, image.Height),
                                      0, 0, image.Width, image.Height, GraphicsUnit.Pixel);
                    }
                    return newImage;
                }
            }
        }

    }
}
