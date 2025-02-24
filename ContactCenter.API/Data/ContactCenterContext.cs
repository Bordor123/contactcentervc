using Microsoft.EntityFrameworkCore;
using ContactCenter.API.Models;

namespace ContactCenter.API.Data
{
    public class ContactCenterContext : DbContext
    {
        public ContactCenterContext(DbContextOptions<ContactCenterContext> options)
            : base(options)
        {
        }

        public DbSet<Agent> Agents { get; set; }
        public DbSet<Client> Clients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var staticDate = new DateTime(2025, 2, 1);
            
            // Datos de ejemplo
            modelBuilder.Entity<Agent>().HasData(
                new Agent 
                { 
                    Id = 1, 
                    Name = "Agent 1", 
                    Status = AgentStatus.Available, 
                    LastStatusChange = staticDate 
                },
                new Agent 
                { 
                    Id = 2, 
                    Name = "Agent 2", 
                    Status = AgentStatus.InCall, 
                    LastStatusChange = staticDate 
                }
            );

            modelBuilder.Entity<Client>().HasData(
                new Client 
                { 
                    Id = 1, 
                    Name = "Client 1", 
                    JoinedQueue = staticDate,
                    WaitTime = 5 // Valor inicial de ejemplo
                },
                new Client 
                { 
                    Id = 2, 
                    Name = "Client 2", 
                    JoinedQueue = staticDate,
                    WaitTime = 10 // Valor inicial de ejemplo
                }
            );
        }
    }
}