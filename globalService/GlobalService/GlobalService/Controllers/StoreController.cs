using GlobalService.Models;
using GlobalService.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Linq;


namespace GlobalService.Controllers
{
    [Route("api/StoreApi")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        // POST api/<StoreController>
        [Route("GetProductsByStoreId")]
        [HttpPost]
        public async Task<ActionResult<List<object>>> GetProductsByStoreId([FromBody] string storeId)
        {
            var storeAddress = StoreService.GetProductServiceAddress(storeId);

            if(storeAddress != null)
            {
                var content = StoreService.GetHttpContent(storeAddress);
                var client = new HttpClient();
                var response = await client.PostAsync("http://localhost:49812/api/Products/GetProducts", content);
                var responseJsonString = await response.Content.ReadAsStringAsync();
                var contents = JsonConvert.DeserializeObject<List<object>>(responseJsonString);

                return contents;
            }
            else
            {
                return NotFound();
            }
          
        }

        [Route("GetTicketByStoreId")]
        [HttpPost]
        public async Task<ActionResult<string>> GetTicketByStoreId(PostType dataObject)    
        {
            var storeAddress = StoreService.GetSalesApiAddress(dataObject.StoreId);

            if(storeAddress != null)
            {
                dataObject.StoreId = storeAddress;
                var jsonString = JsonConvert.SerializeObject(dataObject);
                HttpContent content = new StringContent(jsonString);
                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                var client = new HttpClient();
                var response = await client.PostAsync("http://localhost:49812/api/Products/GetTicket", content);
                var responseJsonString = await response.Content.ReadAsStringAsync();

                return responseJsonString;
            }
            else
            {
               return NotFound();
            }
        }
    }
}
