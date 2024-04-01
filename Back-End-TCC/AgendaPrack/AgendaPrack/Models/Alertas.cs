using System.ComponentModel.DataAnnotations;

namespace AgendaPrack.Models
{
    public class Alertas
    {
        public int Id { get; set; }
        public virtual Loja? Loja { get; set; }
        public int LojaId { get; set; }
        [DataType(DataType.Date)]
        public DateTime dataLembrete { get; set; }
    }
}
