using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SalesApi;
using WebApi.Models;
using WebApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/Products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        [Route("GetProducts")]
        [HttpPost]
        public async Task<List<Group>> GetProducts([FromBody] string storeAddress)  
        {
            var serviceClient = ClientService.GetProductServiceClient(storeAddress);
            var productsInUse = await DataService.GetProductsInUse(serviceClient);
            var categorizedList = DataService.FilterByGroupAndBrand(productsInUse);

            return categorizedList;
        }

        [Route("GetTicket")]
        [HttpPost]
        public async Task<string> GetTicket(PostType dataObject)            
        {
            var callerId = Guid.NewGuid().ToString();
            var salesApiClient = ClientService.GetSalesApiClient(dataObject.StoreId);

            var addResponse = new AddResponse();

            foreach (var product in dataObject.Products)
            {
                addResponse = await salesApiClient.AddAsync(callerId, 1, product.EAN, 1);
            }

            var ticketEan = DataService.GetTicketEan(addResponse);
            int ticketNo = DataService.GetTicketNo(addResponse);

            var confirmResponse = await salesApiClient.ConfirmAsync(ticketNo, callerId, 1, null, null);

            var base64String = DataService.GenerateBarcode(ticketEan);

            return base64String;
        }
    }
}
