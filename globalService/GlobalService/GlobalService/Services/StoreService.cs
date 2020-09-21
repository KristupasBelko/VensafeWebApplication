using System;
using System.ServiceModel;

namespace GlobalService.Services
{
    public static class StoreService
    {
        public static string GetEndpointAddress(string storeId)
        {
            if ((storeId == Stores.Store1))
            {
                return "10.1.1.86";
            }
            throw new InvalidOperationException(string.Format("Could not find endpoint with name \'{0}\'.", storeId));
        }

        public static class Stores 
        {
            public static string Store1 = "Store_1";
            public static string Store2 = "Store_2";
        }
    }
}
