using WebApi.Models.Users;

namespace WebApi.Models.Data
{
    public class Data
    {
        public int DataID { get; set; } 
        public int DataTypeID { get; set; }
        public int? EmployeeID { get; set; }
        public string DataDescription { get; set; }
        public DataType DataType { get; set; }
        public Employee Employee { get; set; }
    }
}
