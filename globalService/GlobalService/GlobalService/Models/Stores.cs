using System;
using System.Collections.Generic;

namespace GlobalService.Models
{
    public partial class Stores
    {
        public int Id { get; set; }
        public string StoreId { get; set; }
        public string ProductsServiceLink { get; set; }
        public string SalesApiLink { get; set; }
    }
}
