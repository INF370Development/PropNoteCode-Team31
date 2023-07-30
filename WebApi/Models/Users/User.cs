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
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? PhoneNumber { get; set; }
    }
}