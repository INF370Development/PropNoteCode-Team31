﻿using WebApi.Models.Users;

namespace WebApi.Models;

public class Tenant
{
    public int TenantID { get; set; }
    public int UserID { get; set; }
    public string CompanyName { get; set; }
    public string CompanyNumber { get; set; }
    public virtual ICollection<WebApi.Models.Lease.Lease> Leases { get; set; }
    public User User { get; set; }

    public List<Document> Documents { get; set; }
}

public class CreateTenantUserRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string ProfilePhoto { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string PhoneNumber { get; set; }
    public string CompanyName { get; set; }
    public string CompanyNumber { get; set; }
}

public class Document
{
    public int DocumentID { get; set; }
    public int TenantID { get; set; }
    public string DocumentName { get; set; }
    public byte[] FileData { get; set; }
    public DateTime UploadDate { get; set; }
}

public class DocumentUploadModel
{
    public IFormFile File { get; set; }
    public string DocumentName { get; set; }
}
