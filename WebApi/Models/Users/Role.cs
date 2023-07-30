using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Users
{
    public class Role
    {
        [Key]
        public int RoleID { get; set; }

        public string Name { get; set; }
    }
}
