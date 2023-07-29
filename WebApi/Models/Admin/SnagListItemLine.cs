using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Admin
{
    public class SnagListItemLine
    {
        [Key] 
        public int SnagListItemLineId { get; set; }
        public int SnagListId { get; set; }
        public int SnagListItemsId { get; set; }

    }
}
