namespace WebApi.Services
{
    public static class ClientService
    {
        public static ProductService.ProductService_v1_SoapClient GetProductServiceClient(string storeAddress)
        {
            var enpointAddress = new System.ServiceModel.EndpointAddress(storeAddress);

             var productServiceClient = new ProductService.
                ProductService_v1_SoapClient(ProductService.ProductService_v1_SoapClient.EndpointConfiguration.ProductService_v1_Soap, enpointAddress);

            return productServiceClient;
        }

        public static SalesApi.SalesApiSoapClient GetSalesApiClient(string storeAddress)
        {
            var enpointAddress = new System.ServiceModel.EndpointAddress(storeAddress);

            var salesApiClient = new SalesApi
                .SalesApiSoapClient(SalesApi.SalesApiSoapClient.EndpointConfiguration.SalesApiSoap, enpointAddress);

            return salesApiClient;
        }


    }
}
