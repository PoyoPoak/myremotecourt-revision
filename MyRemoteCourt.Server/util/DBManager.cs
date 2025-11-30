using Microsoft.EntityFrameworkCore;
using MyRemoteCourt.Server.Models;

namespace MyRemoteCourt.Server.util
{
    public class DBManager : DbContext
    {
        public DBManager(DbContextOptions<DBManager> options) : base(options) { }
        public DbSet<CourtCase> CourtCase { get; set; }
        public DbSet<RemoteRequest> RemoteRequest { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the one-to-one between CourtCase and RemoteRequest
            modelBuilder.Entity<CourtCase>()
                .HasOne(c => c.RemoteRequest)                   // CourtCase has one RemoteRequest
                .WithOne(r => r.CourtCase)                      // RemoteRequest has one CourtCase
                .HasForeignKey<RemoteRequest>(r => r.CaseId)    // Foreign key is in RemoteRequest table
                .IsRequired(false);                             // RemoteRequest is optional (can be null)
        }
    }
}
