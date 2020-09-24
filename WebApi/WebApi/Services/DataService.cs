using BarcodeLib.Core;
using ProductService;
using SalesApi;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Services
{
    public static class DataService
    {
        public static List<Group> FilterByGroupAndBrand(List<ProductType> prodList)      
        {
            var groups = prodList.Select(prod => prod.Group).ToList();
            var brands = prodList.Select(prod => prod.Brand).ToList();

            var distinctedGroups = groups.GroupBy(o => o.Id)   
                              .Select(o => o.FirstOrDefault()).ToList();

            var distinctedBrands = brands.GroupBy(o => o.Id)
                .Select(o => o.FirstOrDefault()).ToList();

            var groupedList = new List<Group>();
            var brandedList = new List<Brand>();

            foreach (var brand in distinctedBrands)    
            {
                var brandID = brand.Id;

                brandedList.Add(new Brand
                {
                    BrandId = brandID,
                    BrandName = brand.Name,
                    Products = prodList.Where(product => product.Brand.Id == brandID).ToList(),
                });
            }

            foreach (var group in distinctedGroups)
            {
                var groupID = group.Id;

                groupedList.Add(new Group
                {
                    GroupId = groupID,
                    GroupName = group.Name,
                    Brands = brandedList.Where(brand => brand.Products.FirstOrDefault().Group.Id == groupID).ToList()
                }) ;
            }

            return groupedList;
        }

        public async static Task<List<ProductType>> GetProductsInUse(ProductService_v1_SoapClient serviceClient)
        {
            var productsInUse = new GetProductsInUse();

            var productsResponse = await serviceClient.GetProductsInUseAsync(productsInUse);
            var products = productsResponse.GetProductsInUseResponse.Products;
            var productInUseList = new List<ProductType>();

            productInUseList.AddRange(products);

            return productInUseList;
        }

        public static string GetTicketEan(AddResponse addResponse)
        {
            var contentObject = addResponse.Body.AddResult.Content;
            var podBarCodeProp = contentObject.GetType().GetProperty("PodBarcode");
            var ticketEan = (string)(podBarCodeProp.GetValue(contentObject, null));

            return ticketEan;
        }

        public static string GenerateBarcode(string ean)
        {
            Barcode barcode = new Barcode();
            Color foreColor = Color.Black;
            Color backColor = Color.Transparent;

            var img = barcode.Encode(TYPE.CODE128, ean, foreColor, backColor, 200, 150);

            using (var ms = new MemoryStream())
            {
                img.Save(ms, ImageFormat.Png);


                string base64String = Convert.ToBase64String(ms.ToArray());

                return base64String;
            }
        }

        public static int GetTicketNo(AddResponse addResponse)
        {
            var contentObject = addResponse.Body.AddResult.Content;
            var ticketNoProp = contentObject.GetType().GetProperty("TicketNo");
            var ticketNo = (int)(ticketNoProp.GetValue(contentObject, null));  

            return ticketNo;
        }
    }
}
