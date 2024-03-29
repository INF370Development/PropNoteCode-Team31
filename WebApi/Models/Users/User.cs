﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApi.Models.Users;

namespace WebApi.Models
{
#nullable enable

    public class User
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string? ProfilePhoto { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string? Surname { get; set; }
        public string? PhoneNumber { get; set; }

        public bool HasLoggedIn { get; set; }
    }
}

public class UserRole
{
    [Key]
    [Column(Order = 0)]
    public int RoleID { get; set; }

    [Key]
    [Column(Order = 1)]
    public int UserID { get; set; }

    // ... other properties ...
}