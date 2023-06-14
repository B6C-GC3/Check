using ApiProject.ObjectValues;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using Utils.Any;

namespace ApiProject.Shared.DataTransfer.AssessmentProduct
{
    public class AssessmentProductReq
    {
        public List<string> Image { get; set; }
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        [Range(1, 5, ErrorMessage = ERROR_DATA.CHECK_FAIL)]
        public int StarNumber { get; set; }
        public List<int> Feel { get; set; }
        [RegularExpression(RegexProcess.NAME_VN, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public string Commnet { get; set; }
        public int Level { get; set; }
        public long? AssessmentProductId { get; set; }
    }

    public class AssessmentProductRes
    {

    }

    public class AssessmentProductStat
    {
        public int StarOne { get; set; }
        public int StarTwo { get; set; }
        public int StarThree { get; set; }
        public int StarForur { get; set; }
        public int StarFive { get; set; }
        public int StarTotal { get; set; }
    }

    public class AssessmentProductImage
    {
        public string ImageName80x80 { get; set; }
        public string ImageName340x340 { get; set; }
    }

    public class AttributeProductComment
    {
        public string AttributeKeyName { get; set; }
        public string AttributeValueName { get; set; }
    }

    public class AssessmentProductUserComment
    {
        public long Id { get; set; }
        public string Avatar { get; set; }
        public string Name { get; set; }
        public DateTime Time { get; set; }
        public int Evaluated { get; set; }
        public int Responded { get; set; }
        public int Respected { get; set; }
        public int Incorrected { get; set; }

    }

    public class AssessmentProductComment
    {
        public long Id { get; set; }
        public AssessmentProductUserComment UserComment { get; set; }
        public int? Star { get; set; }
        public string Commnet { get; set; }
        public bool Status { get; set; }
        public List<AttributeProductComment> AttributeProductComment { get; set; }
        public int Useful { get; set; }
        public int Meaningless { get; set; }
        public int Feedback { get; set; }
        public bool MyUseful { get; set; }
        public bool MyMeaningless { get; set; }
        public List<AssessmentProductImage> Image { get; set; }
    }

    public class ImageQuerySellected
    {
        public string Name { get; set; }
        public long AssessmentProductId { get; set; }
        public string Size { get; set; }
        public string Folder { get; set; }
        public string VirtualPath { get; set; }
    }

    public enum TypeLikeComment
    {
        IsDislike = 0,
        IsLike = 1
    }

    public class LikeCommentAssessmentProduct
    {
        public long Idsp { get; set; }
        public long IdAssessment { get; set; }
        public int Level { get; set; }
        public bool Status { get; set; }
        public TypeLikeComment TypeLike { get; set; }
    }
}
