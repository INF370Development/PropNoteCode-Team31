using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Access",
                columns: table => new
                {
                    AccessID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccessName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccessDescription = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Access", x => x.AccessID);
                });

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
                    CommissionRate = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Broker", x => x.BrokerID);
                });

            migrationBuilder.CreateTable(
                name: "ContractorType",
                columns: table => new
                {
                    ContractorTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContractorTypeName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContractorType", x => x.ContractorTypeID);
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
                name: "Deposit",
                columns: table => new
                {
                    DepositID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LeaseID = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deposit", x => x.DepositID);
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
                name: "InspectionStatus",
                columns: table => new
                {
                    InspectionStatusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InspectionStatusName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectionStatus", x => x.InspectionStatusID);
                });

            migrationBuilder.CreateTable(
                name: "InspectionType",
                columns: table => new
                {
                    InspectionTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InspectionTypeName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectionType", x => x.InspectionTypeID);
                });

            migrationBuilder.CreateTable(
                name: "Maintenance",
                columns: table => new
                {
                    MaintenaceID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PropertyID = table.Column<int>(type: "int", nullable: false),
                    ContractorID = table.Column<int>(type: "int", nullable: false),
                    MaintenanceStatusID = table.Column<int>(type: "int", nullable: false),
                    MaintenanceTypeID = table.Column<int>(type: "int", nullable: false),
                    MaintenanceDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MaintenanceTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maintenance", x => x.MaintenaceID);
                });

            migrationBuilder.CreateTable(
                name: "MaintenanceNote",
                columns: table => new
                {
                    MaintenaceNoteID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaintenaceID = table.Column<int>(type: "int", nullable: false),
                    MaintenaceNoteDescription = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintenanceNote", x => x.MaintenaceNoteID);
                });

            migrationBuilder.CreateTable(
                name: "MaintenanceStatus",
                columns: table => new
                {
                    MaintenaceStatusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaintenaceStatusName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintenanceStatus", x => x.MaintenaceStatusID);
                });

            migrationBuilder.CreateTable(
                name: "MaintenanceType",
                columns: table => new
                {
                    MaintenaceTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaintenaceTypeName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintenanceType", x => x.MaintenaceTypeID);
                });

            migrationBuilder.CreateTable(
                name: "Payment",
                columns: table => new
                {
                    PaymentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaintenaceID = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment", x => x.PaymentID);
                });

            migrationBuilder.CreateTable(
                name: "RecoveryType",
                columns: table => new
                {
                    RecoveryTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RecoveryTypeDescription = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecoveryType", x => x.RecoveryTypeID);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    RoleID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.RoleID);
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
                name: "SnagListItem",
                columns: table => new
                {
                    SnagListItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SnagListItemDescription = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SnagListItem", x => x.SnagListItemId);
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
                name: "User",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfilePhoto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserID);
                });

            migrationBuilder.CreateTable(
                name: "Property",
                columns: table => new
                {
                    PropertyID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PropertyStatusID = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BuildingNumber = table.Column<int>(type: "int", nullable: false),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Suburb = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PurchaseAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PurchaseYear = table.Column<int>(type: "int", nullable: false),
                    Size = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Yard = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BrokerID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Property", x => x.PropertyID);
                    table.ForeignKey(
                        name: "FK_Property_Broker_BrokerID",
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
                name: "UserAccess",
                columns: table => new
                {
                    RoleID = table.Column<int>(type: "int", nullable: false),
                    AccessID = table.Column<int>(type: "int", nullable: false),
                    AccessID1 = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAccess", x => new { x.RoleID, x.AccessID });
                    table.ForeignKey(
                        name: "FK_UserAccess_Access_AccessID",
                        column: x => x.AccessID,
                        principalTable: "Access",
                        principalColumn: "AccessID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAccess_Access_AccessID1",
                        column: x => x.AccessID1,
                        principalTable: "Access",
                        principalColumn: "AccessID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAccess_Role_RoleID",
                        column: x => x.RoleID,
                        principalTable: "Role",
                        principalColumn: "RoleID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                columns: table => new
                {
                    RoleID = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => new { x.UserID, x.RoleID });
                    table.ForeignKey(
                        name: "FK_UserRole_Role_RoleID",
                        column: x => x.RoleID,
                        principalTable: "Role",
                        principalColumn: "RoleID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Contractor",
                columns: table => new
                {
                    ContractorID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    ContractorTypeID = table.Column<int>(type: "int", nullable: false),
                    AreaOfBusiness = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Availability = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contractor", x => x.ContractorID);
                    table.ForeignKey(
                        name: "FK_Contractor_ContractorType_ContractorTypeID",
                        column: x => x.ContractorTypeID,
                        principalTable: "ContractorType",
                        principalColumn: "ContractorTypeID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Contractor_User_UserID",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tenant",
                columns: table => new
                {
                    TenantID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompanyNumber = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tenant", x => x.TenantID);
                    table.ForeignKey(
                        name: "FK_Tenant_User_UserID",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Inspection",
                columns: table => new
                {
                    InspectionID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InspectionTypeID = table.Column<int>(type: "int", nullable: true),
                    PropertyID = table.Column<int>(type: "int", nullable: false),
                    EmployeeID = table.Column<int>(type: "int", nullable: true),
                    InspectionStatusID = table.Column<int>(type: "int", nullable: true),
                    InspectionDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InspectionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InspectionTime = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inspection", x => x.InspectionID);
                    table.ForeignKey(
                        name: "FK_Inspection_InspectionStatus_InspectionStatusID",
                        column: x => x.InspectionStatusID,
                        principalTable: "InspectionStatus",
                        principalColumn: "InspectionStatusID");
                    table.ForeignKey(
                        name: "FK_Inspection_InspectionType_InspectionTypeID",
                        column: x => x.InspectionTypeID,
                        principalTable: "InspectionType",
                        principalColumn: "InspectionTypeID");
                    table.ForeignKey(
                        name: "FK_Inspection_Property_PropertyID",
                        column: x => x.PropertyID,
                        principalTable: "Property",
                        principalColumn: "PropertyID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PropertyImage",
                columns: table => new
                {
                    PropertyImageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageData = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PropertyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyImage", x => x.PropertyImageId);
                    table.ForeignKey(
                        name: "FK_PropertyImage_Property_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "Property",
                        principalColumn: "PropertyID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Recovery",
                columns: table => new
                {
                    RecoveryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PropertyID = table.Column<int>(type: "int", nullable: false),
                    RecoveryTypeID = table.Column<int>(type: "int", nullable: false),
                    RecoveryDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecoveryAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recovery", x => x.RecoveryID);
                    table.ForeignKey(
                        name: "FK_Recovery_Property_PropertyID",
                        column: x => x.PropertyID,
                        principalTable: "Property",
                        principalColumn: "PropertyID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Recovery_RecoveryType_RecoveryTypeID",
                        column: x => x.RecoveryTypeID,
                        principalTable: "RecoveryType",
                        principalColumn: "RecoveryTypeID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Lease",
                columns: table => new
                {
                    LeaseID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MonthlyAmount = table.Column<int>(type: "int", nullable: false),
                    TenantID = table.Column<int>(type: "int", nullable: false),
                    PropertyID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lease", x => x.LeaseID);
                    table.ForeignKey(
                        name: "FK_Lease_Property_PropertyID",
                        column: x => x.PropertyID,
                        principalTable: "Property",
                        principalColumn: "PropertyID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Lease_Tenant_TenantID",
                        column: x => x.TenantID,
                        principalTable: "Tenant",
                        principalColumn: "TenantID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Contractor_ContractorTypeID",
                table: "Contractor",
                column: "ContractorTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Contractor_UserID",
                table: "Contractor",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Data_DataTypeID",
                table: "Data",
                column: "DataTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Data_EmployeeID",
                table: "Data",
                column: "EmployeeID");

            migrationBuilder.CreateIndex(
                name: "IX_Inspection_InspectionStatusID",
                table: "Inspection",
                column: "InspectionStatusID");

            migrationBuilder.CreateIndex(
                name: "IX_Inspection_InspectionTypeID",
                table: "Inspection",
                column: "InspectionTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Inspection_PropertyID",
                table: "Inspection",
                column: "PropertyID");

            migrationBuilder.CreateIndex(
                name: "IX_Lease_PropertyID",
                table: "Lease",
                column: "PropertyID");

            migrationBuilder.CreateIndex(
                name: "IX_Lease_TenantID",
                table: "Lease",
                column: "TenantID");

            migrationBuilder.CreateIndex(
                name: "IX_Property_BrokerID",
                table: "Property",
                column: "BrokerID");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyImage_PropertyId",
                table: "PropertyImage",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_Recovery_PropertyID",
                table: "Recovery",
                column: "PropertyID");

            migrationBuilder.CreateIndex(
                name: "IX_Recovery_RecoveryTypeID",
                table: "Recovery",
                column: "RecoveryTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Tenant_UserID",
                table: "Tenant",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_UserAccess_AccessID",
                table: "UserAccess",
                column: "AccessID");

            migrationBuilder.CreateIndex(
                name: "IX_UserAccess_AccessID1",
                table: "UserAccess",
                column: "AccessID1");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_RoleID",
                table: "UserRole",
                column: "RoleID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contractor");

            migrationBuilder.DropTable(
                name: "Data");

            migrationBuilder.DropTable(
                name: "Deposit");

            migrationBuilder.DropTable(
                name: "Inspection");

            migrationBuilder.DropTable(
                name: "Lease");

            migrationBuilder.DropTable(
                name: "Maintenance");

            migrationBuilder.DropTable(
                name: "MaintenanceNote");

            migrationBuilder.DropTable(
                name: "MaintenanceStatus");

            migrationBuilder.DropTable(
                name: "MaintenanceType");

            migrationBuilder.DropTable(
                name: "Payment");

            migrationBuilder.DropTable(
                name: "PropertyImage");

            migrationBuilder.DropTable(
                name: "Recovery");

            migrationBuilder.DropTable(
                name: "SnagList");

            migrationBuilder.DropTable(
                name: "SnagListItem");

            migrationBuilder.DropTable(
                name: "SnagListItemLine");

            migrationBuilder.DropTable(
                name: "UserAccess");

            migrationBuilder.DropTable(
                name: "UserRole");

            migrationBuilder.DropTable(
                name: "ContractorType");

            migrationBuilder.DropTable(
                name: "DataType");

            migrationBuilder.DropTable(
                name: "Employee");

            migrationBuilder.DropTable(
                name: "InspectionStatus");

            migrationBuilder.DropTable(
                name: "InspectionType");

            migrationBuilder.DropTable(
                name: "Tenant");

            migrationBuilder.DropTable(
                name: "Property");

            migrationBuilder.DropTable(
                name: "RecoveryType");

            migrationBuilder.DropTable(
                name: "Access");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Broker");
        }
    }
}
