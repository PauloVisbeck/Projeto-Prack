using AgendaPrack.Data;
using AgendaPrack.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
[EnableCors]
public class LojasController : ControllerBase
{
    private readonly AppDbContext _context;

    public LojasController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Lojas
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<Loja>>> GetLojas()
    {
        return await _context.Lojas.ToListAsync();
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<Loja>>> GetLoja(int id)
    {
        List<Loja> lista = await _context.Lojas.ToListAsync();
        return lista.Where(li => li.RepresentanteId == id).ToList();
    }
    [HttpGet("getDetalhes{id}")]
    public async Task<ActionResult<IEnumerable<Loja>>> GetPedidoDetails(int id)
    {
        return await _context.Lojas.Where(idDetails => idDetails.Id == id).ToListAsync();
    }
    // POST: api/Lojas
    [HttpPost]
    public async Task<ActionResult<Loja>> PostLoja(Loja loja)
    {
        _context.Lojas.Add(loja);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetLojas), new { id = loja.Id }, loja);
    }

    // PUT: api/Lojas/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutLoja(int id, Loja loja)
    {
        if (id != loja.Id)
        {
            return BadRequest();
        }

        _context.Entry(loja).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!LojaExists(id))
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

    // DELETE: api/Lojas/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLoja(int id)
    {
        var loja = await _context.Lojas.FindAsync(id);

        if (loja == null)
        {
            return NotFound();
        }

        loja.Status = false;

        await _context.SaveChangesAsync();

        return NoContent();
    }



    private bool LojaExists(int id)
    {
        return _context.Lojas.Any(e => e.Id == id);
    }
}
