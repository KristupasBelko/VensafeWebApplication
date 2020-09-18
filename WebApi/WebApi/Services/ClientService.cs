namespace WebApi.Services
{
    public static class ClientService
    {
        public static ProductService.ProductService_v1_SoapClient GetProductServiceClient(string storeId)
        {
            var storeLink = $"http://{storeId}/WebServices/ProductService_v1.asmx";
            var enpointAddress = new System.ServiceModel.EndpointAddress(storeLink);

             var productServiceClient = new ProductService.
                ProductService_v1_SoapClient(ProductService.ProductService_v1_SoapClient.EndpointConfiguration.ProductService_v1_Soap, enpointAddress);

            return productServiceClient;
        }

        public static SalesApi.SalesApiSoapClient GetSalesApiClient(string storeId)
        {
            var storeLink = $"http://{storeId}/WebServices/api/SalesApi.asmx";
            var enpointAddress = new System.ServiceModel.EndpointAddress(storeLink);

            var salesApiClient = new SalesApi
                .SalesApiSoapClient(SalesApi.SalesApiSoapClient.EndpointConfiguration.SalesApiSoap, enpointAddress);

            return salesApiClient;
        }


    }
}
