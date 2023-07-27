namespace WebApi.Models.Users
{
#nullable enable

    public class RegisterUserModel
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

        public string userRole { get; set; }
    }
}