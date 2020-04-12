using Microsoft.EntityFrameworkCore;

namespace demoapi.Models
{
    public class demoContext : DbContext
    {
        public demoContext(DbContextOptions<demoContext> options)
            : base(options)
        {
        }

        public DbSet<demo> demos { get; set; }
    }
}