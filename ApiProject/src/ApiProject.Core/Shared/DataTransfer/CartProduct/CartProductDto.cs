using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.CartProduct
{
    public class CartProductReqDto
    {
        public long IdFeature { get; set; }
        public int NumberProduct { get; set; }
    }

    public class CartProductResDto
    {

    }

    public class ReadCartProductResDto
    {
        public long IdShop { get; set; }
        public string ShopName { get; set; }
        public long ProductId { get; set; }
        public long FeatureId { get; set; }
        public string Name { get; set; }
        public int NumberProduct { get; set; }
        public int NumberProductMax { get; set; }
        public decimal Prices { get; set; }
        public string ImageProduct { get; set; }
    }

}
