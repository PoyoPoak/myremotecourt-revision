using Microsoft.EntityFrameworkCore;
using MyRemoteCourt.Server.Models;

namespace MyRemoteCourt.Server.util
{
    public class DBManager : DbContext
    {
        public DBManager(DbContextOptions<DBManager> options) : base(options) { }
        public DbSet<CourtCase> CourtCases { get; set; }
        public DbSet<RemoteRequest> RemoteRequests { get; set; }


    }
}
