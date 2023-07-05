using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using ApiProject.Authorization.Roles;
using ApiProject.Authorization.Users;
using ApiProject.MultiTenancy;
using ApiProject.Shared.Entitys;
using Abp.Domain.Entities;

namespace ApiProject.EntityFrameworkCore
{
    public class ApiProjectDbContext : AbpZeroDbContext<Tenant, Role, User, ApiProjectDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<MainPageSettingEntity> MainPageSettingEntitys { get; set; }
        public DbSet<InfoUser> InfoUsers { get; set; }
        public DbSet<CategoryProductEntity> CategoryProducts { get; set; }
        public DbSet<CarouselSupplierEntity> CarouselSupplierEntitys { get; set; }
        public DbSet<ExhibitEntity> ExhibitEntitys { get; set; }
        public DbSet<RepositoryCertificateEntity> RepositoryCertificateEntitys { get; set; }
        public DbSet<SeoEntity> SeoEntitys { get; set; }
        public DbSet<StoreSupplierEntity> ShopSupplierEntitys { get; set; }
        public DbSet<StorePickupPointEntity> StorePickupPointEntity { get; set; }
        public DbSet<SupplierEntity> SupplierEntitys { get; set; }
        public DbSet<SupplierMappingEntity> SupplierMappingEntitys { get; set; }
        public DbSet<TopicEntity> TopicEntitys { get; set; }
        public DbSet<FeatureProductEntity> FeatureProductEntitys { get; set; }
        public DbSet<FileSourceEntity> ImageSourceEntitys { get; set; }
        public DbSet<LikeEvaluatesProductEntity> LikeEvaluatesProductEntitys { get; set; }
        public DbSet<AttributeEntity> ProductAttributeEntitys { get; set; }
        public DbSet<ProductSpecificationsValueEntity> ProductAttributeMappingEntitys { get; set; }
        public DbSet<ProductMappingAttributeValueEntity> ProductMappingAttributeValueEntitys { get; set; }
        public DbSet<ProductAttributeValueEntity> ProductAttributeValueEntitys { get; set; }
        public DbSet<ProductCategoryMappingEntity> ProductCategoryMappingEntitys { get; set; }
        public DbSet<ProductEntity> ProductEntitys { get; set; }
        public DbSet<ProductImageMappingEntity> ProductPictureMappingEntitys { get; set; }
        public DbSet<ProductProductTagMappingEntity> ProductProductTagMappingEntitys { get; set; }
        public DbSet<ProductTagEntity> ProductTagEntitys { get; set; }
        public DbSet<SupplierFollowEntity> SupplierFollowEntitys { get; set; }
        public DbSet<SupplierHierarchicalEntity> SupplierHierarchicalEntitys { get; set; }
        public DbSet<SupplierNoteEntity> SupplierNoteEntitys { get; set; }
        public DbSet<SupplierAttributeValueEntity> SupplierAttributeValueEntitys { get; set; }
        public DbSet<AttributeEntity> SupplierAttributeEntitys { get; set; }
        public DbSet<BlogCommentEntity> BlogCommentEntitys { get; set; }
        public DbSet<BlogPostEntity> BlogPostEntitys { get; set; }
        public DbSet<CampaignEntity> CampaignEntitys { get; set; }
        public DbSet<CurrencyEntity> CurrencyEntitys { get; set; }
        public DbSet<CustomerAttributeValueEntity> CustomerAttributeValueEntitys { get; set; }
        public DbSet<DeliveryDateEntity> DeliveryDateEntitys { get; set; }
        public DbSet<DiscountEntity> DiscountEntitys { get; set; }
        public DbSet<DiscountRequirementEntity> DiscountRequirementEntitys { get; set; }
        public DbSet<DiscountUsageHistoryEntity> DiscountUsageHistoryEntitys { get; set; }
        public DbSet<DownloadEntity> DownloadEntitys { get; set; }
        public DbSet<EasyPostBatchEntity> EasyPostBatchEntitys { get; set; }
        public DbSet<FacebookPixelConfigurationEntity> FacebookPixelConfigurationEntitys { get; set; }
        public DbSet<ForumsForumEntity> ForumsForumEntitys { get; set; }
        public DbSet<ForumsGroupEntity> ForumsGroupEntitys { get; set; }
        public DbSet<ForumsPostEntity> ForumsPostEntitys { get; set; }
        public DbSet<ForumsPostVoteEntity> ForumsPostVoteEntitys { get; set; }
        public DbSet<ForumsPrivateMessageEntity> ForumsPrivateMessageEntitys { get; set; }
        public DbSet<ForumsSubscriptionEntity> ForumsSubscriptionEntitys { get; set; }
        public DbSet<ForumsTopicEntity> ForumsTopicEntitys { get; set; }
        public DbSet<GdprConsentEntity> GdprConsentEntitys { get; set; }
        public DbSet<GdprLogEntity> GdprLogEntitys { get; set; }
        public DbSet<GiftCardEntity> GiftCardEntitys { get; set; }
        public DbSet<GiftCardUsageHistoryEntity> GiftCardUsageHistoryEntitys { get; set; }
        public DbSet<GooglePixelConfigurationEntity> GooglePixelConfigurationEntitys { get; set; }
        public DbSet<ManufacturerEntity> ManufacturerEntitys { get; set; }
        public DbSet<ManufacturerMappingEntity> ManufacturerMappingEntitys { get; set; }
        public DbSet<ManufacturerTemplateEntity> ManufacturerTemplateEntitys { get; set; }
        public DbSet<MeasureDimensionEntity> MeasureDimensionEntitys { get; set; }
        public DbSet<MeasureWeightEntity> MeasureWeightEntitys { get; set; }
        public DbSet<MessageTemplateEntity> MessageTemplateEntitys { get; set; }
        public DbSet<MigrationVersionInfoEntity> MigrationVersionInfoEntitys { get; set; }
        public DbSet<NewsCommentEntity> NewsCommentEntitys { get; set; }
        public DbSet<NewsEntity> NewsEntitys { get; set; }
        public DbSet<NewsLetterSubscriptionEntity> NewsLetterSubscriptionEntitys { get; set; }
        public DbSet<OrderEntity> OrderEntitys { get; set; }
        public DbSet<OrderItemEntity> OrderItemEntitys { get; set; }
        public DbSet<OrderNoteEntity> OrderNoteEntitys { get; set; }
        public DbSet<PollAnswerEntity> PollAnswerEntitys { get; set; }
        public DbSet<SupplierCategoryMappingEntity> SupplierCategoryMappingEntitys { get; set; }
        public DbSet<PollEntity> PollEntitys { get; set; }
        public DbSet<PollVotingRecordEntity> PollVotingRecordEntitys { get; set; }
        public DbSet<ProductAttributeCombinationEntity> ProductAttributeCombinationEntitys { get; set; }
        public DbSet<ProductAvailabilityRangeEntity> ProductAvailabilityRangeEntitys { get; set; }
        public DbSet<ProductManufacturerMappingEntity> ProductManufacturerMappingEntitys { get; set; }
        public DbSet<ProductTemplateEntity> ProductTemplateEntitys { get; set; }
        public DbSet<ProductWarehouseInventoryEntity> ProductWarehouseInventoryEntitys { get; set; }
        public DbSet<RecurringPaymentEntity> RecurringPaymentEntitys { get; set; }
        public DbSet<RecurringPaymentHistoryEntity> RecurringPaymentHistoryEntitys { get; set; }
        public DbSet<RelatedProductEntity> RelatedProductEntitys { get; set; }
        public DbSet<ReturnRequestActionEntity> ReturnRequestActionEntitys { get; set; }
        public DbSet<ReturnRequestEntity> ReturnRequestEntitys { get; set; }
        public DbSet<ReturnRequestReasonEntity> ReturnRequestReasonEntitys { get; set; }
        public DbSet<ReviewTypeEntity> ReviewTypeEntitys { get; set; }
        public DbSet<RewardPointsHistoryEntity> RewardPointsHistoryEntitys { get; set; }
        public DbSet<ScheduleTaskEntity> ScheduleTaskEntitys { get; set; }
        public DbSet<SearchTermEntity> SearchTermEntitys { get; set; }
        public DbSet<ShipmentEntity> ShipmentEntitys { get; set; }
        public DbSet<ShipmentItemEntity> ShipmentItemEntitys { get; set; }
        public DbSet<ShippingByWeightByTotalRecordEntity> ShippingByWeightByTotalRecordEntitys { get; set; }
        public DbSet<ShippingMethodEntity> ShippingMethodEntitys { get; set; }
        public DbSet<ShippingMethodRestrictionsEntity> ShippingMethodRestrictionsEntitys { get; set; }
        public DbSet<ShoppingCartItemEntity> ShoppingCartItemEntitys { get; set; }
        public DbSet<SpecificationAttributeGroupEntity> SpecificationAttributeGroupEntitys { get; set; }
        public DbSet<SpecificationAttributeOptionEntity> SpecificationAttributeOptionEntitys { get; set; }
        public DbSet<StateProvinceEntity> StateProvinceEntitys { get; set; }
        public DbSet<StockQuantityHistoryEntity> StockQuantityHistoryEntitys { get; set; }
        public DbSet<StoreMappingEntity> StoreMappingEntitys { get; set; }
        public DbSet<TaxCategoryEntity> TaxCategoryEntitys { get; set; }
        public DbSet<TaxRateEntity> TaxRateEntitys { get; set; }
        public DbSet<TaxTransactionLogEntity> TaxTransactionLogEntitys { get; set; }
        public DbSet<TierPriceEntity> TierPriceEntitys { get; set; }
        public DbSet<TopicTemplateEntity> TopicTemplateEntitys { get; set; }
        public DbSet<UrlRecordEntity> UrlRecordEntitys { get; set; }
        public DbSet<WarehouseEntity> WarehouseEntitys { get; set; }
        public DbSet<LocalizationSystemEntity> LocalizationSystemEntitys { get; set; }
        public DbSet<AssessmentProductEntity> AssessmentProductEntitys { get; set; }
        public DbSet<AssessmentImageProductEntity> AssessmentImageProductEntitys { get; set; }


        public ApiProjectDbContext(DbContextOptions<ApiProjectDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AssessmentImageProductEntity>(entity =>
            {
                entity.ToTable("AssessmentImageProduct");

                entity.Property(s => s.IsActive).HasDefaultValueSql("1");
                entity.Property(s => s.IsDeleted).HasDefaultValueSql("0");
                entity.Property(s => s.CreationTime).HasDefaultValueSql("GETDATE()");
                entity.Property(s => s.LastModificationTime).HasDefaultValueSql("GETDATE()");
            });

            modelBuilder.Entity<AssessmentProductEntity>(entity =>
            {
                entity.ToTable("AssessmentProduct");

                entity.Property(s => s.IsActive).HasDefaultValueSql("1");
                entity.Property(s => s.IsDeleted).HasDefaultValueSql("0");
                entity.Property(s => s.CreationTime).HasDefaultValueSql("GETDATE()");
                entity.Property(s => s.LastModificationTime).HasDefaultValueSql("GETDATE()");
            });

            modelBuilder.Entity<CategoryProductEntity>(entity =>
            {
                entity.Property(s => s.IsActive).HasDefaultValueSql("1");
                entity.Property(s => s.CreationTime).HasDefaultValueSql("GETDATE()");
                entity.Property(s => s.LastModificationTime).HasDefaultValueSql("GETDATE()");
            });

            modelBuilder.Entity<SupplierMappingEntity>(entity =>
            {
                entity.Property(s => s.IsActive).HasDefaultValueSql("1");
                entity.Property(s => s.IsDeleted).HasDefaultValueSql("0");
                entity.Property(s => s.CreationTime).HasDefaultValueSql("GETDATE()");
                entity.Property(s => s.LastModificationTime).HasDefaultValueSql("GETDATE()");
            });

            modelBuilder.Entity<FeatureProductEntity>(entity =>
            {
                entity.ToTable("FeatureProduct");

                entity.Property(e => e.HeightAdjustment).HasColumnType("decimal(18, 4)");
                entity.Property(e => e.LengthAdjustment).HasColumnType("decimal(18, 4)");
                entity.Property(e => e.Price).HasColumnType("decimal(18, 4)");
                entity.Property(e => e.WeightAdjustment).HasColumnType("decimal(18, 4)");
                entity.Property(e => e.WidthAdjustment).HasColumnType("decimal(18, 4)");

                entity.Property(s => s.IsActive).HasDefaultValueSql("1");
                entity.Property(s => s.IsDeleted).HasDefaultValueSql("0");
                entity.Property(s => s.CreationTime).HasDefaultValueSql("GETDATE()");
                entity.Property(s => s.LastModificationTime).HasDefaultValueSql("GETDATE()");
            });

            modelBuilder.Entity<ProductAttributeValueEntity>(entity =>
            {
                entity.ToTable("ProductAttributeValue");

                entity.Property(s => s.IsActive).HasDefaultValueSql("1");
                entity.Property(s => s.IsDeleted).HasDefaultValueSql("0");
                entity.Property(s => s.CreationTime).HasDefaultValueSql("GETDATE()");
                entity.Property(s => s.LastModificationTime).HasDefaultValueSql("GETDATE()");
            });

            modelBuilder.Entity<ProductSpecificationsValueEntity>(entity =>
            {
                entity.ToTable("Attribute");

                entity.Property(s => s.IsActive).HasDefaultValueSql("1");
                entity.Property(s => s.IsDeleted).HasDefaultValueSql("0");
                entity.Property(s => s.CreationTime).HasDefaultValueSql("GETDATE()");
                entity.Property(s => s.LastModificationTime).HasDefaultValueSql("GETDATE()");
            });

            modelBuilder.Entity<ProductSpecificationsValueEntity>(entity =>
            {
                entity.ToTable("ProductSpecificationsValue");

                entity.Property(s => s.IsActive).HasDefaultValueSql("1");
                entity.Property(s => s.IsDeleted).HasDefaultValueSql("0");
                entity.Property(s => s.CreationTime).HasDefaultValueSql("GETDATE()");
                entity.Property(s => s.LastModificationTime).HasDefaultValueSql("GETDATE()");
            });

            modelBuilder.Entity<ProductEntity>(entity =>
            {
                entity.ToTable("Product");
                entity.Property(s => s.Published).HasDefaultValueSql("0");

                entity.Property(s => s.SupplierId).HasDefaultValueSql("3");

                entity.Property(s => s.CreatorUserId).HasDefaultValueSql("2");
                entity.Property(s => s.LastModifierUserId).HasDefaultValueSql("2");
                entity.Property(s => s.IsActive).HasDefaultValueSql("1");
                entity.Property(s => s.IsDeleted).HasDefaultValueSql("0");
                entity.Property(s => s.CreationTime).HasDefaultValueSql("GETDATE()");
                entity.Property(s => s.LastModificationTime).HasDefaultValueSql("GETDATE()");
            });
            
        }
    }
}
