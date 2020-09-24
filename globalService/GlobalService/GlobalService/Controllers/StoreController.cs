using GlobalService.Models;
using GlobalService.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace GlobalService.Controllers
{
    [Route("api/StoreApi")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly StoreContext _context;

        public StoreController(StoreContext context)
        {
            _context = context;
        }

        [Route("GetProductsByStoreId")]
        [HttpPost]
        public async Task<ActionResult<List<object>>> GetProductsByStoreId([FromBody] string storeId)
        {
            var storeAddress = StoreService.GetProductServiceAddress(storeId, _context);

            if(storeAddress != null)
            {
                try
                {
                    var content = StoreService.GetHttpContent(storeAddress);
                    var client = new HttpClient();
                    var response = await client.PostAsync("http://localhost:49812/api/Products/GetProducts", content);
                    var responseJsonString = await response.Content.ReadAsStringAsync();
                    var deserializedContent = JsonConvert.DeserializeObject<List<object>>(responseJsonString);

                    return deserializedContent;
                }
                catch
                {
                    return NoContent();
                }
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
            var storeAddress = StoreService.GetSalesApiAddress(dataObject.StoreId, _context);

            if(storeAddress != null)
            {
                try
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
                catch
                {
                    return NoContent();
                }
            }
            else
            {
               return NotFound();
            }
        }
    }
}
