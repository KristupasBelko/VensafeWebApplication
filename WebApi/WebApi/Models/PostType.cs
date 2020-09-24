using ProductService;

namespace WebApi.Models
{
    public class PostType
    {
        public ProductType[] Products { get; set; }
        public string StoreId { get; set; } 
    }
}
