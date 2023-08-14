﻿using WebApi.Models.Users;

namespace WebApi.Models.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> SaveChangesAsync();

        public void Add<T>(T entity) where T : class;

        User? GetUserByUserName(string userName);

        public bool CheckUserPassword(string username, string hashedPassword);

        public bool CheckIfUserNameExsists(string username);
    }
}