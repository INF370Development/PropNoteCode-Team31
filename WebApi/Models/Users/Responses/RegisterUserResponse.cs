namespace WebApi.Models.Users.Responses
{
    public class RegisterUserResponse : User
    {
        public bool IsSuccess { get; set; }

        public string? UserRoleName { get; set; }

        public string SecurityToken { get; set; }
    }
}