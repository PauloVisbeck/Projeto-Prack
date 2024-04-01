using AgendaPrack.Models;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using System.Collections.Generic;

namespace AgendaPrack.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Empresa> Empresas { get; set; }
        public DbSet<Loja> Lojas { get; set; }
        public DbSet<Representante> Representantes { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Mensagem> Mensagem { get; set; }
        public DbSet<Metas> Metas { get; set; }
        public DbSet<Alertas> Lembretes {  get; set; }
    }
}
