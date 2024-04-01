using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AgendaPrack.Models
{
    public class Pedido
    {
        public int Id { get; set; }

        [DataType(DataType.Date)]
        public DateTime Data { get; set; }
        public double PercentualComissao { get; set; }
        public string Colecao { get; set; }

        public double? valorTotal { get; set; }
        [JsonIgnore]
        public int? RepresentanteId { get; set; }
        [JsonIgnore]
        public int? EmpresaId { get; set; }
        [JsonIgnore]
        public int? LojaId { get; set; }
        public bool Status { get; set; }
        public virtual Representante? Representante { get; set; }

        public virtual Empresa? Empresa { get; set; }

        public virtual Loja? Loja { get; set; }
    }
}
