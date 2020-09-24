using GlobalService.Models;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Linq;

namespace GlobalService.Services
{
    public static class StoreService
    {
        public static string GetProductServiceAddress(string storeId, StoreContext context)
        {
            var query = from b in context.Stores
                        select b;

            return query.FirstOrDefault(item => item.StoreId == storeId)?.ProductsServiceLink;
        }

        public static string GetSalesApiAddress(string storeId, StoreContext context) 
        {
            var query = from b in context.Stores
                        select b;

            return query.FirstOrDefault(item => item.StoreId == storeId)?.SalesApiLink;
        }

        public static HttpContent GetHttpContent(string storeAddress)
        {
            var jsonString = JsonConvert.SerializeObject(storeAddress);
            HttpContent content = new StringContent(jsonString);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return content;
        }
    }
}
