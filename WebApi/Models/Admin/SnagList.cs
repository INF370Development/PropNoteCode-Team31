using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Admin
{
    public class SnagList
    {
        [Key]
        public int SnagListId { get; set; }
        public int PropertyId { get; set; }
        public string SnagListDescription { get; set; }
        public DateTime SnagListCreated { get; set; }
        public DateTime SnagListModified { get; set; }
    }
}
