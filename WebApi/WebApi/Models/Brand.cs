using ProductService;
using System.Collections.Generic;

namespace WebApi.Models
{
    public class Brand
    {
        public int BrandId { get; set; }
        public string BrandName { get; set; }

        public List<ProductType> Products { get; set; }

        public Brand()  
        {
            Products = new List<ProductType>();
        }
    }
}
