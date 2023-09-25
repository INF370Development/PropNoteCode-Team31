using Microsoft.EntityFrameworkCore;
using WebApi.Models.Admin;

namespace WebApi.Interfaces
{
    public interface ISnagListRepository
    {

        Task<bool> SaveChangesAsync();
        Task AddSnagListItem(SnagListItem item);
        Task<SnagListItem[]> GetAllSnagListItemsAsync();
        Task<SnagListItem> GetSnagListItemByID(int SnagListItemID);
        Task<SnagListItem> EditSnagListItem(int SnagListItemId, string item);
        Task<SnagListItem> DeleteSnagListItemAsync(SnagListItem item);

        Task<SnagList> CreateSnagList(SnagList Prop);
        Task<SnagList[]> GetAllSnagListsAsync();
        Task<SnagList> GetSnagListByID(int SnagListID);
        Task<SnagList> EditSnagList(int SnagListId, int PropertyId);
        Task<SnagList> DeleteSnagListAsync(int listId);
        /*
                Task<SnagListItem[]> GetAllSnagListItemLineAsync(int x);
                Task<SnagListItemLine> GetSnagListItemLineById(int SnagList, int item);
                Task<SnagListItemLine> AddItem(int snag, int list);
                Task<SnagListItemLine> DeleteSnagListItemLineAsync(SnagListItemLine item);*/
        Task<int> CountSnagList();
    }
}
