using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using WebApi.Models.Admin;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class SnagListRepository : ISnagListRepository
    {
        private readonly AppDbContext _appDbContext;

        public SnagListRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }

        public async Task<SnagListItem[]> GetAllSnagListItemsAsync()
        {
            IQueryable<SnagListItem> query = _appDbContext.SnagListItem;
            return await query.ToArrayAsync();
        }
        public async Task<SnagListItem> GetSnagListItemByID(int SnagListItemID)
        {
            IQueryable<SnagListItem> query = _appDbContext.SnagListItem.Where(c => c.SnagListItemId == SnagListItemID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task AddSnagListItem(SnagListItem item)
        {
            _appDbContext.SnagListItem.Add(item);
            await _appDbContext.SaveChangesAsync();
        }
        public async Task<SnagListItem> EditSnagListItem(int snagListItemID, string item)
        {
            IQueryable<SnagListItem> query = _appDbContext.SnagListItem.Where(c => c.SnagListItemId == snagListItemID);
            SnagListItem x = query.FirstOrDefault();
            if (x != null)
            {
                x.SnagListItemDescription = item;
                await _appDbContext.SaveChangesAsync();
            }
            return x;
        }
        public async Task<SnagListItem> DeleteSnagListItemAsync(SnagListItem item)
        {
            _appDbContext.SnagListItem.Remove(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }

        public async Task<SnagList> CreateSnagList(SnagList x)
        {
            _appDbContext.SnagList.Add(x);
            await _appDbContext.SaveChangesAsync();
            return x;
        }
        public async Task<SnagList[]> GetAllSnagListsAsync()
        {
            IQueryable<SnagList> query = _appDbContext.SnagList;
            return await query.ToArrayAsync();
        }
        public async Task<SnagList> GetSnagListByID(int SnagListID)
        {
            IQueryable<SnagList> query = _appDbContext.SnagList.Where(c => c.SnagListId == SnagListID);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<SnagList> EditSnagList(int SnagListId, int PropertyId)
        {
            IQueryable<SnagList> query = _appDbContext.SnagList.Where(c => c.SnagListId == SnagListId);
            SnagList x = query.FirstOrDefault();
            if (x != null)
            {
                x.PropertyId = PropertyId;
                await _appDbContext.SaveChangesAsync();
            }
            return x;
        }
        public async Task<SnagList> DeleteSnagListAsync(int listId)
        {
            SnagList list = await GetSnagListByID(listId);
            _appDbContext.SnagList.Remove(list);
            await _appDbContext.SaveChangesAsync();
            return list;
        }


        public async Task<SnagListItem[]> GetAllSnagListItemLineAsync(int x)
        {
            IQueryable<SnagListItemLine> query = _appDbContext.SnagListItemLine.Where(c => c.SnagListId == x);
            int y = 0, z = 0;
            foreach (SnagListItemLine item in query)
            {
                SnagListItem check = (SnagListItem)await GetSnagListItemByID(query.ElementAt(y).SnagListItemsId);
                if (check != null) { y++; }
            }
            SnagListItem[] list = new SnagListItem[y];
            y = 0;
            foreach (SnagListItemLine item in query)
            {
                SnagListItem check = (SnagListItem)await GetSnagListItemByID(query.ElementAt(y).SnagListItemsId);
                if (check != null)
                {
                    list[z] = check;
                    z++;
                }
                y++;
            }
            return list;
        }
        public async Task<SnagListItemLine> GetSnagListItemLineById(int SnagList, int item)
        {
            IQueryable<SnagListItemLine> query = _appDbContext.SnagListItemLine.Where(c => c.SnagListId == SnagList & c.SnagListItemsId == item);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<SnagListItemLine> AddItem(int snag, int list)
        {
            SnagListItemLine x = new SnagListItemLine();

            {
                x.SnagListId = snag; x.SnagListItemsId = list;
                _appDbContext.SnagListItemLine.Add(x);
                await _appDbContext.SaveChangesAsync();
            }
            return x;
        }
        public async Task<SnagListItemLine> DeleteSnagListItemLineAsync(SnagListItemLine item)
        {
            _appDbContext.SnagListItemLine.Remove(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }
        public async Task<int> CountSnagList()
        {
            int x=0;
            IQueryable<SnagList> query = _appDbContext.SnagList;
            foreach (var item in query) 
            {
                x=item.SnagListId;
            }
            return x+1;
        }


    }
}
