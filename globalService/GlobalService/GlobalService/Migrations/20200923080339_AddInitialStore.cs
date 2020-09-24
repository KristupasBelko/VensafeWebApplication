using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace GlobalService.Migrations
{
    public partial class AddInitialStore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var storeId = Guid.NewGuid().ToString();
            migrationBuilder.Sql($"INSERT INTO [dbo].[Stores] ([StoreId], [ProductsServiceLink], [SalesApiLink]) VALUES (\'{storeId}\', \'http://10.1.1.86/WebServices/ProductService_v1.asmx\', \'katasunis\')");
        }
    }
}
