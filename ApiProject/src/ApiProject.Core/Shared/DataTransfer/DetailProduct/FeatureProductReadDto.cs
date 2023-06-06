using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.DetailProduct
{
    public class FeatureProductReadDto
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public long AttributeValueOne { get; set; }
        public long? AttributeValueTwo { get; set; }
        public long? AttributeValueThree { get; set; }
        public string AttributeValueOneName { get; set; }
        public string AttributeValueTwoName { get; set; }
        public string AttributeValueThreeName { get; set; }
        public decimal Price { get; set; }
        public int QuantityRemaining { get; set; }
        public int QuantityTotal { get; set; }
        public int DisplayOrder { get; set; }
        public long PictureId { get; set; }
        public string PictureName { get; set; }
        public bool MainProduct { get; set; }
        public decimal WeightAdjustment { get; set; }
        public decimal LengthAdjustment { get; set; }
        public decimal WidthAdjustment { get; set; }
        public decimal HeightAdjustment { get; set; }
        public string Name { get; set; }
    }
}
