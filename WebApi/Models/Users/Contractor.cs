using System.ComponentModel.DataAnnotations;
using WebApi.Models.Users;

namespace WebApi.Models;

public class Contractor
{
    public int ContractorID { get; set; }
    public int UserID { get; set; }
    public int ContractorTypeID { get; set; }
    public string AreaOfBusiness { get; set; }
    public string Availability { get; set; }
    public User User { get; set; }
    public ContractorType ContractorType { get; set; }
}

public class CreateContractorUserRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string ProfilePhoto { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string PhoneNumber { get; set; }
    public int ContractorTypeID { get; set; }
    public string AreaOfBusiness { get; set; }
    public string Availability { get; set; }
}

public class ContractorType
{
    [Key]
    public int ContractorTypeID { get; set; }

    [MaxLength(50)]
    public string ContractorTypeName { get; set; } = string.Empty;
}

public class ContractorTypeViewModel
{
    public string ContractorTypeName { get; set; }
}
