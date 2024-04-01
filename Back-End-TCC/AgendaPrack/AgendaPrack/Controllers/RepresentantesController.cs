using AgendaPrack.Config;
using AgendaPrack.Data;
using AgendaPrack.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
[EnableCors]
public class RepresentantesController : ControllerBase
{
    private readonly AppDbContext _context;

    public RepresentantesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Representantes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Representante>>> GetRepresentantes()
    {
        return await _context.Representantes.ToListAsync();
    }



    // GET: api/Representantes/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Representante>> GetRepresentante(int id)
    {
        var representante = await _context.Representantes.FindAsync(id);

        if (representante == null)
        {
            return NotFound();
        }

        return representante;
    }

    // POST: api/Representantes
    [HttpPost]
    public async Task<ActionResult<Representante>> PostRepresentante(Representante representante)
    {
        _context.Representantes.Add(representante);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetRepresentante), new { id = representante.Id }, representante);
    }

    // PUT: api/Representantes/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutRepresentante(int id, Representante representante)
    {
        if (id != representante.Id)
        {
            return BadRequest();
        }

        _context.Entry(representante).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!RepresentanteExists(id))
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

    // DELETE: api/Representantes/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRepresentante(int id)
    {
        var representante = await _context.Representantes.FindAsync(id);

        if (representante == null)
        {
            return NotFound();
        }

        representante.Status = false;

        await _context.SaveChangesAsync();

        return NoContent();
    }


    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] ModeloLogin loginModel)
    {
        var representante = await _context.Representantes
                                            .FirstOrDefaultAsync(r => r.Cnpj == loginModel.Cnpj && r.Senha == loginModel.Senha);

        if (representante == null)
        {
            return Unauthorized("CNPJ ou senha inválidos.");
        }

        var token = TokenService.GenerateToken(representante);

        return Ok(new { Token = token });
    }

    private bool RepresentanteExists(int id)
    {
        return _context.Representantes.Any(e => e.Id == id);
    }
}
