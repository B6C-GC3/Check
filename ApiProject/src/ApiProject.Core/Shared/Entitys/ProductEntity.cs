using Abp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiProject.Shared.Entitys
{
    /// <summary>
    /// Thông số cơ bản của sản phẩm
    /// </summary>
    [Table("Product")]
    public class ProductEntity : Entity<long>
    {
        [Comment("Tên sản phẩm")]
        public string Name { get; set; }

        [Comment("Hàng dễ vỡ")]
        public bool Fragile { get; set; }

        [Comment("Thương hiệu, nhãn hiệu")]
        public long Trademark { get; set; }

        [Comment("Đơn vị tính")]
        public long UnitProduct { get; set; }

        [Comment("Stock Keeping Unit - đơn vị phân loại hàng hóa tồn kho")]
        public string Sku { get; set; }

        [Comment("MPN (Mã số linh kiện của nhà sản xuất)")]
        public string ManufacturerPartNumber { get; set; }

        [Comment("Global Trade Item Number - Mã số sản phẩm thương mại toàn cầu")]
        public string Gtin { get; set; }

        [Comment("Mô tả ngắn")]
        public string ShortDescription { get; set; }

        [Comment("Mô tả chi tiết")]
        public string FullDescription { get; set; }

        [Comment("Hiển thị trên trang chủ")]
        public bool ShowOnHomepage { get; set; }

        [Comment("Cho phép người dùng đánh giá")]
        public bool AllowCustomerReviews { get; set; }

        [Comment("Số xếp hạng được phê duyệt (Đánh giá sản phẩm)")]
        public long ApprovedRatingSum { get; set; }

        [Comment("Số xếp hạng không được phê duyệt (Đánh giá sản phẩm)")]
        public long NotApprovedRatingSum { get; set; }

        [Comment("Cho phép mở rộng quy mô sản phẩm")]
        public bool SubjectToAcl { get; set; }

        [Comment("Giới hạn từ nhà cung cấp - để ám chỉ việc sắp hết hàng")]
        public bool LimitedToStores { get; set; }

        [Comment("Có quà tặng kèm theo")]
        public bool IsGiftCard { get; set; }

        [Comment("Mã quà tặng kèm theo")]
        public long GiftCardTypeId { get; set; }

        [Comment("Giá trị tối đa quà tặng")]
        public long OverriddenGiftCardAmount { get; set; }

        [Comment("Quà tặng yêu cầu từ sản phẩm khác, có thể từ nhà cung cấp khác")]
        public bool RequireOtherProducts { get; set; }

        [Comment("Tự động ghép thêm các sản phẩm quà tặng cần thiết")]
        public bool AutomaticallyAddRequiredProducts { get; set; }

        [Comment("Có thỏa thuận từ nhà cung cấp và người dùng")]
        public bool HasUserAgreement { get; set; }

        [Comment("Nguồn thỏa thuân với người dùng. Ví dụ đoạn chat, file đính kèm.....")]
        public string UserAgreementText { get; set; }

        [Comment("Thanh toán định kỳ, trả góp sản phẩm")]
        public bool IsRecurring { get; set; }

        [Comment("Chu kỳ trả góp")]
        public int RecurringCycleLength { get; set; }

        [Comment("Giai đoạn trả góp được lưu tại một bảng khác, nhật ký trả góp")]
        public long RecurringCyclePeriodId { get; set; }

        [Comment("Tổng thời gian trả góp tính bằng chu kỳ trả góp")]
        public int RecurringTotalCycles { get; set; }

        [Comment("Đăng ký vận chuyển")]
        public bool IsShipEnabled { get; set; }

        [Comment("Miễn phí vận chuyển")]
        public bool IsFreeShipping { get; set; }

        [Comment("Vận chuyển ngoài - hai bên thỏa thuận")]
        public bool ShipSeparately { get; set; }

        [Comment("Phí vận chuyển bổ sung")]
        public decimal AdditionalShippingCharge { get; set; }

        [Comment("Thời gian nhập kho giao hàng")]
        public long DeliveryDateId { get; set; }

        [Comment("Phạm vi khả dụng sản phẩm")]
        public long ProductAvailabilityRangeId { get; set; }

        [Comment("Sử dụng nhiều nhà kho")]
        public bool UseMultipleWarehouses { get; set; }

        [Comment("Hiển thị kho hàng sẵn có")]
        public bool DisplayStockAvailability { get; set; }

        [Comment("Hiển thị số lượng kho hàng")]
        public bool DisplayStockQuantity { get; set; }

        [Comment("Số lượng kho hàng tối thiểu")]
        public int MinStockQuantity { get; set; }

        [Comment("Số lượng trong kho thấp nhất để hoạt động")]
        public long LowStockActivityId { get; set; }

        [Comment("Thông báo admin về số lượng đơn hàng chạm ngưỡng")]
        public int NotifyAdminForQuantityBelow { get; set; }

        [Comment("Đơn hàng chờ")]
        public long BackorderModeId { get; set; }

        [Comment("Cho phép đăng ký trở lại kho khi hàng bị booooooom")]
        public bool AllowBackInStockSubscriptions { get; set; }

        [Comment("Số lượng đặt hàng tối thiểu")]
        public int OrderMinimumQuantity { get; set; }

        [Comment("Số lượng đặt hàng tối đa")]
        public int OrderMaximumQuantity { get; set; }

        [Comment("Chỉ cho phép thêm mới các sản phẩm mà đã khai báo thuộc tính từ trước")]
        public bool AllowAddingOnlyExistingAttributeCombinations { get; set; }

        [Comment("Không cho phép hoàn trả đơn hàng")]
        public bool NotReturnable { get; set; }

        [Comment("Được phép xem hàng khi nhận hàng")]
        public bool ViewReceived { get; set; }

        [Comment("Tắt giao dịch bán hàng, tắt nút mua trên trang order")]
        public bool DisableBuyButton { get; set; }

        [Comment("Vô hiệu hóa danh sách sản phẩm yêu thích")]
        public bool DisableWishListButton { get; set; }

        [Comment("Số người dùng đưa vào sản phẩm yêu thích")]
        public int WishlistNumber { get; set; }

        [Comment("Sản phầm cho phép đặt hàng trước")]
        public bool AvailableForPreOrder { get; set; }

        [Comment("Thời gian bắt đàu áp dụng đặt hàng trước")]
        public DateTime? PreOrderAvailabilityStartDateTimeUtc { get; set; }

        [Comment("Đánh dấu là sản phẩm mới")]
        public bool MarkAsNew { get; set; }

        [Comment("Thời gian bắt đầu bán phiên bản mới")]
        public DateTime? MarkAsNewStartDateTimeUtc { get; set; }

        [Comment("Thời gian kết thúc bán phiên bản mới")]
        public DateTime? MarkAsNewEndDateTimeUtc { get; set; }

        [Comment("Sản phẩm có nhiều mức giá")]
        public bool HasTierPrices { get; set; }

        [Comment("Đã áp dụng giảm giá")]
        public bool HasDiscountsApplied { get; set; }

        [Comment("Đã được phát hành")]
        public bool Published { get; set; }

        [Comment("Mã nhà cung cấp")]
        public long SupplierId { get; set; }

        [Comment("Album nhà cung cấp")]
        public string ProductAlbum { get; set; }

        [Comment("Tối ưu tìm kiếm")]
        public long SeoId { get; set; }

        /* ---------------------------------------------------------*/

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

        public DateTime? CreationTime { get; set; }

        public long? CreatorUserId { get; set; }

        public DateTime? LastModificationTime { get; set; }

        public long? LastModifierUserId { get; set; }
    }
}
