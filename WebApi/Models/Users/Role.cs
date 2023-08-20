using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Users
{
    public class Role
    {
        public int RoleID { get; set; }
        public string Name { get; set; }

        public List<UserRole> UserRoles { get; set; }
        public List<UserAccess> UserAccesses { get; set; }
    }


}
