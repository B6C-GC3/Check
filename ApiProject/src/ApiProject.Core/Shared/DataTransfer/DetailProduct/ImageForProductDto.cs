using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.DetailProduct
{
    public class ImageForProductDto
    {
        public string VirtualPath { get; set; }
        public string AltAttribute { get; set; }
        public string SeoFilename { get; set; }
        public string TitleAttribute { get; set; }
        public int DisplayOrder { get; set; }
    }

    public class ImageProductContainerDto
    {
        public string Size { get; set; }
        public List<ImageForProductDto> Image { get; set; }
    }
}
