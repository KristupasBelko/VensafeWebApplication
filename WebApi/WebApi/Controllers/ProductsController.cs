using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        [HttpGet("{storeId}")]
        public async Task<List<Group>> GetProductsByStoreId(string storeId)
        {
            var serviceClient = ClientService.GetProductServiceClient(storeId);
            var productsInUse = await DataService.GetProductsInUse(serviceClient);
            var categorizedList = DataService.FilterByGroupAndBrand(productsInUse);

            return categorizedList;
        }

        // POST api/<ProductsController>
        [HttpPost]
        public async Task<string> Post(PostType dataObject)           
        {
            int randomNumber = DataService.GetRandomNumber();
            var salesApiClient = ClientService.GetSalesApiClient(dataObject.StoreId);

            var addResponse = new SalesApi.AddResponse();

            foreach (var product in dataObject.Products)
            {
                addResponse = await salesApiClient.AddAsync("web", randomNumber, product.EAN, 1);
            }

            var ticketEan = DataService.GetTicketEan(addResponse);
            var base64String = DataService.GenerateBarcode(ticketEan);

            return base64String;
        }
    }
}
