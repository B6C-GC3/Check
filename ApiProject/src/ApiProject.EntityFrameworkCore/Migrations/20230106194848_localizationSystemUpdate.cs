using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiProject.Migrations
{
    public partial class localizationSystemUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Key",
                table: "LocalizationSystem",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Source",
                table: "LocalizationSystem",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Key",
                table: "LocalizationSystem");

            migrationBuilder.DropColumn(
                name: "Source",
                table: "LocalizationSystem");
        }
    }
}
