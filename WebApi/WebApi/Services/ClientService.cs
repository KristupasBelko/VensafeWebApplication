using ProductService;
using SalesApi;
using System.ServiceModel;

namespace WebApi.Services
{
    public static class ClientService
    {
        public static ProductService_v1_SoapClient GetProductServiceClient(string storeAddress)
        {
            var enpointAddress = new EndpointAddress(storeAddress);

             var productServiceClient = 
                new ProductService_v1_SoapClient(ProductService_v1_SoapClient.EndpointConfiguration.ProductService_v1_Soap, enpointAddress);

            return productServiceClient;
        }

        public static SalesApiSoapClient GetSalesApiClient(string storeAddress)
        {
            var enpointAddress = new EndpointAddress(storeAddress);

            var salesApiClient = 
                new SalesApiSoapClient(SalesApiSoapClient.EndpointConfiguration.SalesApiSoap, enpointAddress);

            return salesApiClient;
        }
    }
}
