using AgendaPrack.Data;
using AgendaPrack.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AgendaPrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class MetasController : Controller
    {

        private readonly AppDbContext _context;

        public MetasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Metas>>> GetMetas()
        {
            return _context.Metas.ToList();
        }


        [HttpPost]
        public async Task<ActionResult<Metas>> PostMeta(Metas meta)
        {
            _context.Metas.Add(meta);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMetas), new { id = meta.Id }, meta);
        }
    }
}
