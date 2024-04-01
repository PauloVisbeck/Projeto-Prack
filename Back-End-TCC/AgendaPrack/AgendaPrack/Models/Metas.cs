using System.ComponentModel.DataAnnotations;

namespace AgendaPrack.Models
{
    public class Metas
    {
        public int Id { get; set; }

        [DataType(DataType.Date)]
        public DateTime? Data { get; set; }
        public int MetaDeVendas { get; set; }
    }
} 