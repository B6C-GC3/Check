using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.Product
{
    public class ProductQueryDto
    {
        [Comment("Tên sản phẩm")]
        public string Name { get; set; }

        [Comment("Hàng dễ vỡ")]
        public bool Fragile { get; set; }

        [Comment("Thương hiệu, nhãn hiệu")]
        public long Trademark { get; set; }

        [Comment("Đơn vị tính")]
        public long UnitProduct { get; set; }

        [Comment("Cho phép người dùng đánh giá")]
        public bool AllowCustomerReviews { get; set; }

        [Comment("Cho phép mở rộng quy mô sản phẩm")]
        public bool SubjectToAcl { get; set; }

        [Comment("Giới hạn từ nhà cung cấp - để ám chỉ việc sắp hết hàng")]
        public bool LimitedToStores { get; set; }

        [Comment("Có thỏa thuận từ nhà cung cấp và người dùng")]
        public bool HasUserAgreement { get; set; }

        [Comment("Thanh toán định kỳ, trả góp sản phẩm")]
        public bool IsRecurring { get; set; }

        [Comment("Số lượng đặt hàng tối thiểu")]
        public int OrderMinimumQuantity { get; set; }

        [Comment("Số lượng đặt hàng tối đa")]
        public int OrderMaximumQuantity { get; set; }

        [Comment("Chỉ cho phép thêm mới các sản phẩm mà đã khai báo thuộc tính từ trước")]
        public bool AllowAddingOnlyExistingAttributeCombinations { get; set; }

        [Comment("Được phép xem hàng khi nhận hàng")]
        public bool ViewReceived { get; set; }

        [Comment("Vô hiệu hóa danh sách sản phẩm yêu thích")]
        public bool DisableWishListButton { get; set; }

        [Comment("Đánh dấu là sản phẩm mới")]
        public bool MarkAsNew { get; set; }

        [Comment("Sản phẩm có nhiều mức giá")]
        public bool HasTierPrices { get; set; }

        [Comment("Album nhà cung cấp")]
        public string ProductAlbum { get; set; }

    }
}
