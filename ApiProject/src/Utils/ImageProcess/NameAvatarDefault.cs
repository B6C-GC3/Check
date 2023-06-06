using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Text;

namespace Lib.ImageProcessing
{
    public class NameAvatarDefault
    {
        public string GenerateAvtarImage(string text, string urlSave)
        {
            text = text.Substring(text.LastIndexOf(" ")).Trim();
            Random rnd = new Random();
            int X = 70;
            int size = 25;
            int Y = 25;
            if (text.Length == 1) { X = 45; Y = 60; size = 45; }
            if (text.Length == 2) { X = 40; Y = 55; size = 45; }
            if (text.Length == 3) { X = 15; size = 55; Y = 50; }
            if (text.Length == 4) { X = 15; size = 40; Y = 55; }
            if (text.Length == 5) { X = 15; size = 35; Y = 60; }
            if (text.Length == 6) { X = 10; size = 30; Y = 65; }
            Font font = new Font(FontFamily.GenericMonospace, size, FontStyle.Bold);
            string Url = "";
            using (Image img = new Bitmap(180, 180))
            {
                using (Graphics drawing = Graphics.FromImage(img))
                {
                    drawing.SmoothingMode = SmoothingMode.HighQuality;
                    drawing.InterpolationMode = InterpolationMode.High;
                    drawing.PixelOffsetMode = PixelOffsetMode.Half;
                    drawing.CompositingQuality = CompositingQuality.HighQuality;
                    SizeF textSize = drawing.MeasureString(text, font);
                    drawing.Clear(Color.FromArgb(rnd.Next(256), rnd.Next(256), rnd.Next(256)));
                    using (Brush textBrush = new SolidBrush(Color.FromArgb(rnd.Next(256), rnd.Next(256), rnd.Next(256))))
                    {
                        drawing.DrawString(text, font, textBrush, new Rectangle(X, Y, 180, 180));
                        drawing.Save();
                    }
                }

                Url = urlSave + text.Trim() + ".png";
                int i = 0;
            next:
                var sa = System.IO.File.Exists(Url);
                if (sa)
                {
                    Url = urlSave + text.Trim() + "(" + i + ").png";
                    i++;
                    goto next;
                }

                img.Save(Url);
            }
            return Url;
        }
    }
}
