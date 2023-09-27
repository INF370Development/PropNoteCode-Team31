using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; // Add this for [Column]

namespace WebApi.Models.Admin
{
    public class SnagListItemLine
    {
        [Key]
        public int SnagListId { get; set; }

        [Key]
        public int SnagListItemId { get; set; }

        public SnagList SnagList { get; set; }
        public SnagListItem SnagListItem { get; set; }
    }
}
