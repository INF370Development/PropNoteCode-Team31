using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Broker",
                columns: table => new
                {
                    BrokerID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OfficeAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LicenseNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CommissionRate = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Broker", x => x.BrokerID);
                });

            migrationBuilder.CreateTable(
                name: "ContractorTypes",
                columns: table => new
                {
                    ContractorTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContractorTypeName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContractorTypes", x => x.ContractorTypeId);
                });

            migrationBuilder.CreateTable(
                name: "DataType",
                columns: table => new
                {
                    DataTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataTypeName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataType", x => x.DataTypeID);
                });

            migrationBuilder.CreateTable(
                name: "Employee",
                columns: table => new
                {
                    EmployeeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ScheduleID = table.Column<int>(type: "int", nullable: false),
                    JobTitle = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee", x => x.EmployeeID);
                });

            migrationBuilder.CreateTable(
                name: "MaintenanceContractorLines",
                columns: table => new
                {
                    MaintenaceContractorLiineID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaintenaceID = table.Column<int>(type: "int", nullable: false),
                    ContractorID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintenanceContractorLines", x => x.MaintenaceContractorLiineID);
                });

            migrationBuilder.CreateTable(
                name: "MaintenanceNotes",
                columns: table => new
                {
                    MaintenaceNoteID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaintenaceID = table.Column<int>(type: "int", nullable: false),
                    MaintenaceNoteDescription = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintenanceNotes", x => x.MaintenaceNoteID);
                });

            migrationBuilder.CreateTable(
                name: "MaintenancePropertyLines",
                columns: table => new
                {
                    MaintenacePropertyLineID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaintenaceID = table.Column<int>(type: "int", nullable: false),
                    PropertyID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintenancePropertyLines", x => x.MaintenacePropertyLineID);
                });

            migrationBuilder.CreateTable(
                name: "Maintenances",
                columns: table => new
                {
                    MaintenaceID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PropertyID = table.Column<int>(type: "int", nullable: false),
                    EmployeeID = table.Column<int>(type: "int", nullable: false),
                    ContractorID = table.Column<int>(type: "int", nullable: false),
                    MaintenanceStatusID = table.Column<int>(type: "int", nullable: false),
                    MaintenanceTypeID = table.Column<int>(type: "int", nullable: false),
                    MaintenanceDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MaintenanceTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maintenances", x => x.MaintenaceID);
                });

            migrationBuilder.CreateTable(
                name: "MaintenanceStatuses",
                columns: table => new
                {
                    MaintenaceStatusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaintenaceStatusName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintenanceStatuses", x => x.MaintenaceStatusID);
                });

            migrationBuilder.CreateTable(
                name: "MaintenanceTypes",
                columns: table => new
                {
                    MaintenaceTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaintenaceTypeName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintenanceTypes", x => x.MaintenaceTypeID);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    PaymentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaintenaceID = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.PaymentID);
                });

            migrationBuilder.CreateTable(
                name: "SnagList",
                columns: table => new
                {
                    SnagListId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PropertyId = table.Column<int>(type: "int", nullable: false),
                    SnagListDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modified = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SnagList", x => x.SnagListId);
                });

            migrationBuilder.CreateTable(
                name: "SnagListItemLine",
                columns: table => new
                {
                    SnagListItemLineId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SnagListId = table.Column<int>(type: "int", nullable: false),
                    SnagListItemsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SnagListItemLine", x => x.SnagListItemLineId);
                });

            migrationBuilder.CreateTable(
                name: "SnagListItems",
                columns: table => new
                {
                    SnagListItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SnagListItemDescription = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SnagListItems", x => x.SnagListItemId);
                });

            migrationBuilder.CreateTable(
                name: "Tenants",
                columns: table => new
                {
                    TenantID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompanyNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tenants", x => x.TenantID);
                });

            migrationBuilder.CreateTable(
                name: "Properties",
                columns: table => new
                {
                    PropertyID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BuildingNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Suburb = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PurchaseAmount = table.Column<int>(type: "int", nullable: false),
                    PurchaseDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Size = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Yard = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BrokerID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Properties", x => x.PropertyID);
                    table.ForeignKey(
                        name: "FK_Properties_Broker_BrokerID",
                        column: x => x.BrokerID,
                        principalTable: "Broker",
                        principalColumn: "BrokerID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Data",
                columns: table => new
                {
                    DataID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataTypeID = table.Column<int>(type: "int", nullable: false),
                    EmployeeID = table.Column<int>(type: "int", nullable: true),
                    DataDescription = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Data", x => x.DataID);
                    table.ForeignKey(
                        name: "FK_Data_DataType_DataTypeID",
                        column: x => x.DataTypeID,
                        principalTable: "DataType",
                        principalColumn: "DataTypeID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Data_Employee_EmployeeID",
                        column: x => x.EmployeeID,
                        principalTable: "Employee",
                        principalColumn: "EmployeeID");
                });

            migrationBuilder.CreateTable(
                name: "Leases",
                columns: table => new
                {
                    LeaseID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TenantID = table.Column<int>(type: "int", nullable: false),
                    PropertyID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Leases", x => x.LeaseID);
                    table.ForeignKey(
                        name: "FK_Leases_Properties_PropertyID",
                        column: x => x.PropertyID,
                        principalTable: "Properties",
                        principalColumn: "PropertyID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Leases_Tenants_TenantID",
                        column: x => x.TenantID,
                        principalTable: "Tenants",
                        principalColumn: "TenantID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Data_DataTypeID",
                table: "Data",
                column: "DataTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Data_EmployeeID",
                table: "Data",
                column: "EmployeeID");

            migrationBuilder.CreateIndex(
                name: "IX_Leases_PropertyID",
                table: "Leases",
                column: "PropertyID");

            migrationBuilder.CreateIndex(
                name: "IX_Leases_TenantID",
                table: "Leases",
                column: "TenantID");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_BrokerID",
                table: "Properties",
                column: "BrokerID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContractorTypes");

            migrationBuilder.DropTable(
                name: "Data");

            migrationBuilder.DropTable(
                name: "Leases");

            migrationBuilder.DropTable(
                name: "MaintenanceContractorLines");

            migrationBuilder.DropTable(
                name: "MaintenanceNotes");

            migrationBuilder.DropTable(
                name: "MaintenancePropertyLines");

            migrationBuilder.DropTable(
                name: "Maintenances");

            migrationBuilder.DropTable(
                name: "MaintenanceStatuses");

            migrationBuilder.DropTable(
                name: "MaintenanceTypes");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "SnagList");

            migrationBuilder.DropTable(
                name: "SnagListItemLine");

            migrationBuilder.DropTable(
                name: "SnagListItems");

            migrationBuilder.DropTable(
                name: "DataType");

            migrationBuilder.DropTable(
                name: "Employee");

            migrationBuilder.DropTable(
                name: "Properties");

            migrationBuilder.DropTable(
                name: "Tenants");

            migrationBuilder.DropTable(
                name: "Broker");
        }
    }
}
