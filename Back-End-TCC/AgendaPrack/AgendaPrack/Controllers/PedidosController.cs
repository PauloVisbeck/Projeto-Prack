using AgendaPrack.Data;
using AgendaPrack.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
[EnableCors]
public class PedidosController : ControllerBase
{
    private readonly AppDbContext _context;

    public PedidosController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Pedidos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pedido>>> GetPedidos()
    {
        var listaPedidos = await _context.Pedidos.ToListAsync();
        foreach (Pedido ped in listaPedidos)
        {
            ped.Loja = await _context.Lojas.FindAsync(ped.LojaId);
            ped.Empresa = await _context.Empresas.FindAsync(ped.EmpresaId);
            ped.Representante = await _context.Representantes.FindAsync(ped.RepresentanteId);
        }
        return listaPedidos;
    }

    // GET: api/Pedidos/5
    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<Pedido>>> GetPedido(int id)
    {
        List<Pedido> listaPedidos = await _context.Pedidos.ToListAsync();
        listaPedidos = (from listafiltrada in listaPedidos where listafiltrada.RepresentanteId == id select listafiltrada).ToList();
        foreach (Pedido ped in listaPedidos)
        {
            ped.Loja = await _context.Lojas.FindAsync(ped.LojaId);
            ped.Empresa = await _context.Empresas.FindAsync(ped.EmpresaId);
            ped.Representante = await _context.Representantes.FindAsync(ped.RepresentanteId);
        }
        return listaPedidos;
    }
    [HttpGet("getDetalhes{id}")]
    public async Task<ActionResult<IEnumerable<Pedido>>> GetPedidoDetails(int id)
    {
        List<Pedido> listaPedidos = await _context.Pedidos.Where(idDetails => idDetails.Id == id).ToListAsync();
        foreach (Pedido ped in listaPedidos)
        {
            ped.Loja = await _context.Lojas.FindAsync(ped.LojaId);
            ped.Empresa = await _context.Empresas.FindAsync(ped.EmpresaId);
            ped.Representante = await _context.Representantes.FindAsync(ped.RepresentanteId);
        }
        return listaPedidos;
    }

    // POST: api/Pedidos
    [HttpPost]
    public async Task<ActionResult<Pedido>> PostPedido(Pedido pedido)
    {
        pedido.RepresentanteId = pedido.Representante.Id;
        pedido.EmpresaId = pedido.Empresa.Id;
        pedido.LojaId = pedido.Loja.Id;

        pedido.Loja = _context.Lojas.Find(pedido.Loja.Id);
        pedido.Empresa = _context.Empresas.Find(pedido.EmpresaId);
        pedido.Representante = _context.Representantes.Find(pedido.RepresentanteId);

        _context.Pedidos.Add(pedido);
        if (pedido.Loja != null)
        {
            pedido.Loja.UltimaCompra = pedido.Data;
            _context.Lojas.Update(pedido.Loja);
        }

        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPedido), new { id = pedido.Id }, pedido);
    }

    // PUT: api/Pedidos/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPedido(int id, Pedido pedido)
    {
        if (id != pedido.Id)
        {
            return BadRequest();
        }
        pedido.RepresentanteId = pedido.Representante.Id;
        pedido.EmpresaId = pedido.Empresa.Id;
        pedido.LojaId = pedido.Loja.Id;
        pedido.Loja = _context.Lojas.Find(pedido.Loja.Id);
        pedido.Empresa = _context.Empresas.Find(pedido.EmpresaId);
        pedido.Representante = _context.Representantes.Find(pedido.RepresentanteId);
        _context.Entry(pedido).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PedidoExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/Pedidos/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePedido(int id)
    {
        var pedido = await _context.Pedidos.FindAsync(id);
        if (pedido == null)
        {
            return NotFound();
        }
        pedido.Status = false;
        _context.Entry(pedido).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool PedidoExists(int id)
    {
        return _context.Pedidos.Any(e => e.Id == id);
    }
}
