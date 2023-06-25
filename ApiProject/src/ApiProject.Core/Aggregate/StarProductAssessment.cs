using ApiProject.Shared.DataTransfer.AssessmentProduct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Aggregate
{
    public static class StarProductAssessment
    {
        public static double AvgStar(AssessmentProductStat star)
        {
            var val = (double)(
                     (star.StarOne * 1)
                   + (star.StarTwo * 2)
                   + (star.StarThree * 3)
                   + (star.StarForur * 4)
                   + (star.StarFive * 5)
                   ) / star.StarTotal;
            return Math.Round(val, 2);
        }
    }
}
