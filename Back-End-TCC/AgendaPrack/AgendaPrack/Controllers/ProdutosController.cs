using AgendaPrack.Config;
using AgendaPrack.Data;
using AgendaPrack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AgendaPrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProdutosController(AppDbContext context)
        {
            _context = context;
        }



        [HttpGet("id")]
        public async Task<ActionResult<IEnumerable<Produto>>> GetProdutos(int id)
        {
            List<Produto> listaProdutos = new();
            listaProdutos = await _context.Produtos.Where(prod => prod.PedidoId == id).ToListAsync();
            return listaProdutos;
        }

        [HttpPost]
        public async Task<ActionResult<Produto>> PostProduto(Produto produto)
        {
            List<Pedido> pedidoLista = _context.Pedidos.Where(ped => ped.Id == produto.PedidoId).ToList();
            _context.Produtos.Add(produto);
            foreach (Pedido pedido in pedidoLista) {
                double valor = produto.Quantidade * produto.ValorUnitario;
                pedido.valorTotal += valor;
                _context.Pedidos.Update(pedido);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProdutos), new { id = produto.Id }, produto);
        }
    }
}
