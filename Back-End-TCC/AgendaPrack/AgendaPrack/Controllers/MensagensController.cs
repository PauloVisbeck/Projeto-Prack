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
    public class MensagensController : ControllerBase
    {

        private readonly AppDbContext _context;

        public MensagensController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mensagem>>> GetMensagem()
        {
            List<Mensagem> lista = await _context.Mensagem.ToListAsync();
            DateTime dataAtual = DateTime.Now;
            foreach (Mensagem m in lista)
            {
                if (DateTime.Compare(m.CancelamentoData, dataAtual) < 0)
                {
                    await DeleteMensagem(m.Id);
                }
            }
            lista = lista.OrderByDescending(mensagem => mensagem.Id).ToList();
            return lista.ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Mensagem>> GetMensagem(int id)
        {
            var Mensagem = await _context.Mensagem.FindAsync(id);

            if (Mensagem == null)
            {
                return NotFound();
            }

            return Mensagem;
        }
        [HttpPost]
        public async Task<ActionResult<Mensagem>> PostMensagem(Mensagem mensagem)
        {
            _context.Mensagem.Add(mensagem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMensagem), new { id = mensagem.Id }, mensagem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMensagem(int id, Mensagem mensagem)
        {
            if (id != mensagem.Id)
            {
                return BadRequest();
            }

            _context.Entry(mensagem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MensagemExists(id))
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
        public async Task<IActionResult> DeleteMensagem(int id)
        {
            var mensagem = await _context.Mensagem.FindAsync(id);
            if (mensagem == null)
            {
                return NotFound();
            }
            _context.Mensagem.Remove(mensagem);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        private bool MensagemExists(int id)
        {
            return _context.Mensagem.Any(e => e.Id == id);
        }
    }
}

