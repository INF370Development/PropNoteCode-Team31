namespace WebApi.Models.Users.Requests
{
#nullable enable

    public class RegisterUserRequest
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

        public string userRole { get; set; }
    }
}