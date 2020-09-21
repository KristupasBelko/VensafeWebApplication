using GlobalService.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Diagnostics;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GlobalService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        // POST api/<StoreController>
        [HttpPost]
        public async Task<string> Post([FromBody] string storeId)
        {
            try
            {
                var storeIp = StoreService.GetEndpointAddress(storeId);

                var client = new HttpClient();
                var jsonString = JsonConvert.SerializeObject(storeId);  
                HttpContent content = new StringContent(jsonString);
                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                var response = await client.GetAsync("http://localhost:49812/api/products/" + storeIp);

                //Process.Start("http://10.1.1.208:3000/");

                return "Opening";
            }
            catch(Exception e)
            {
                return "No such store.";
            }

        }


        [HttpGet]
        public void Get() 
        {
        }
    }
}
