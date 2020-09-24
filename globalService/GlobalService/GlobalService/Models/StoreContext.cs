using Microsoft.EntityFrameworkCore;

namespace GlobalService.Models
{
    public class StoreContext : DbContext
    {
        public DbSet<Store> Stores { get; set; }

        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {

        }
    }
}
