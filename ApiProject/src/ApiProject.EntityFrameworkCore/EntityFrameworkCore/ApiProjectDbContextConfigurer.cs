using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace ApiProject.EntityFrameworkCore
{
    public static class ApiProjectDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<ApiProjectDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<ApiProjectDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
