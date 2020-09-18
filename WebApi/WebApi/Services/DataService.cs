using BarcodeLib.Core;
using Newtonsoft.Json;
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
        public static List<Group> FilterByGroupAndBrand(List<ProductService.ProductType> prodList)      
        {
            var groups = prodList.Select(prod => prod.Group).ToList();
            var brands = prodList.Select(prod => prod.Brand).ToList();

            var distinctedGroups = groups.GroupBy(o => o.GroupId)   
                              .Select(o => o.FirstOrDefault()).ToList();

            var distinctedBrands = brands.GroupBy(o => o.BrandId)
                .Select(o => o.FirstOrDefault()).ToList();

            var groupedList = new List<Group>();
            var brandedList = new List<Brand>();

            foreach (var brand in distinctedBrands)    
            {
                var brandID = brand.BrandId;

                brandedList.Add(new Brand
                {
                    BrandId = brandID,
                    BrandName = brand.BrandName,
                    Products = prodList.Where(product => product.Brand.BrandId == brandID).ToList(),
                });
            }

            foreach (var group in distinctedGroups)
            {
                var groupID = group.GroupId;

                groupedList.Add(new Group
                {
                    GroupId = groupID,
                    GroupName = group.GroupName,
                    Brands = brandedList.Where(brand => brand.Products.FirstOrDefault().Group.GroupId == groupID).ToList()
                }) ;
            }

            return groupedList;
        }

        public async static Task<List<ProductService.ProductType>> GetProductsInUse(ProductService.ProductService_v1_SoapClient serviceClient)
        {
            var productsInUse = new ProductService.GetProductsInUse();

            var productsResponse = await serviceClient.GetProductsInUseAsync(productsInUse);
            var products = productsResponse.GetProductsInUseResponse.Products;
            var productInUseList = new List<ProductService.ProductType>();

            productInUseList.AddRange(products);

            return productInUseList;
        }

        public static int GetRandomNumber()
        {
            Random rnd = new Random();
            int maxInt = 2147483647;
            int randomNumber = rnd.Next(maxInt);

            return randomNumber;
        }

        public static string GetTicketEan(SalesApi.AddResponse addResponse)
        {
            var contentObject = addResponse.Body.AddResult.Content;
            var podBarCode = contentObject.GetType().GetProperty("PodBarcode");
            var ticketEan = (string)(podBarCode.GetValue(contentObject, null));

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
    }
}
