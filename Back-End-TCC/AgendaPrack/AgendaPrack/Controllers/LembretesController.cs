using AgendaPrack.Data;
using AgendaPrack.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AgendaPrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class LembretesController : Controller
    {

        private readonly AppDbContext _context;

        public LembretesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Alertas>>> GetAlerta()
        {
            List<Alertas> alertas = new();
            DateTime dataAtual = DateTime.Now;

            foreach (Alertas lembrete in _context.Lembretes)
                if (DateTime.Compare(lembrete.dataLembrete, dataAtual) < 0)
                {
                    alertas.Add(lembrete);
                }
            return alertas;
        }


        [HttpPost]
        public async Task<ActionResult<Alertas>> PostAlerta(Alertas alerta)
        {
            alerta.LojaId = alerta.Loja.Id;
            alerta.Loja = _context.Lojas.Find(alerta.Loja.Id);

            _context.Lembretes.Add(alerta);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAlerta), new { id = alerta.Id }, alerta);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLembrete(int id, Alertas alerta)
        {
            if (id != alerta.Id)
            {
                return BadRequest();
            }

            _context.Entry(alerta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LembreteExists(id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLembrete(int id)
        {
            var lembretes = await _context.Lembretes.FindAsync(id);
            if (lembretes == null)
            {
                return NotFound();
            }
            _context.Lembretes.Remove(lembretes);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        private bool LembreteExists(int id)
        {
            return _context.Lembretes.Any(e => e.Id == id);
        }
    }
}
