namespace WebApi.Models.Users
{
    public class Access
    {
        public int AccessID { get; set; }
        public string AccessName { get; set; }
        public string AccessDescription { get; set; }

        public List<UserAccess> UserAccesses { get; set; }
    }

    public class UserAccess
    {
        public int RoleID { get; set; }
        public Role Role { get; set; }

        public int AccessID { get; set; }
        public Access Access { get; set; }
    }
}
