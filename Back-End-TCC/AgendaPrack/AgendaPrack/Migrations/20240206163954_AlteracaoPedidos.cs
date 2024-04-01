using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgendaPrack.Migrations
{
    /// <inheritdoc />
    public partial class AlteracaoPedidos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "quantidade",
                table: "Pedidos",
                newName: "Quantidade");

            migrationBuilder.AddColumn<string>(
                name: "Colecao",
                table: "Pedidos",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Colecao",
                table: "Pedidos");

            migrationBuilder.RenameColumn(
                name: "Quantidade",
                table: "Pedidos",
                newName: "quantidade");
        }
    }
}
