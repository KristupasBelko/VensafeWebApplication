using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class PostType
    {
        public ProductService.ProductType[] Products { get; set; }
        public string StoreId { get; set; } 
    }
}
