using Microsoft.EntityFrameworkCore.Storage;
using System.ComponentModel.DataAnnotations;

namespace AgendaPrack.Models
{
    public class Loja
    {
        public int Id { get; set; }
        public string? RazaoSocial { get; set; }
        public string? Cnpj { get; set; }
        public string? InscEstadual { get; set; }
        public string? Segmento { get; set; }
        public string? Fone { get; set; }
        public string? Email { get; set; }
        public string? Cep { get; set; }
        public string? Estado { get; set; }
        public string? Rua { get; set; }
        public string? Numero { get; set; }
        public string? Bairro { get; set; }
        public string? Cidade { get; set; }
        [DataType(DataType.Date)]
        public DateTime? UltimaCompra { get; set; }
        public int RepresentanteId {  get; set; }
        public bool? Status { get; set; }
    }
}
