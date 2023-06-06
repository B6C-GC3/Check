using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.DetailProduct
{
    public class DetailInfoBasicProductDto
    {
        public long AttributeIdOne { get; set; }
        public long? AttributeIdTwo { get; set; }
        public long? AttributeIdThree { get; set; }
        public string AttributeIdOneName { get; set; }
        public string AttributeIdTwoName { get; set; }
        public string AttributeIdThreeName { get; set; }
        // info 
        public bool Fragile { get; set; }
        public long Trademark { get; set; }
        public string TrademarkValue { get; set; }
        public long UnitProduct { get; set; }
        public string UnitProductValue { get; set; }
        // setting
        public bool IsGiftCard { get; set; }
        public bool HasUserAgreement { get; set; }
        public bool IsRecurring { get; set; }
        public bool DisableBuyButton { get; set; }
        public bool IsFreeShipping { get; set; }
        // for cart
        public int OrderMinimumQuantity { get; set; }
        public int OrderMaximumQuantity { get; set; }
        // other
        public string FullDescription { get; set; }
        public List<ProductSpecificationsAttributeDto> SpeccificationAttribute { get; set; }
        public long SupplierId { get; set; }
    }

    public class ProductSpecificationsAttributeDto
    {
        public string Group { get; set; }
        public string AttributeValue { get; set; }
        public long AttributeId { get; set; }
        public string Value { get; set; }
    }
}
