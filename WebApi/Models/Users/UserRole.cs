using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Users
{
    public class UserRole
    {
        public int UserRoleID { get; set; }

        public int UserID { get; set; }
    }
}
