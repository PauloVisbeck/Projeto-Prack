using System.ComponentModel.DataAnnotations;

namespace AgendaPrack.Models
{
    public class Mensagem
    {
        public int Id { get; set; }
        public string? Conteudo { get; set; }
        public DateTime Data { get; set; }
        public DateTime CancelamentoData { get; set; }

    }
}
