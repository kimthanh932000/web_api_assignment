using Microsoft.AspNetCore.Identity;
using Models.Entities;
using System.Data;

namespace Models.DTOs.User
{
    public static class UserMapper
    {
        public static UserDto ToUserDto(this ApplicationUser user, IList<string> roles)
        {
            return new UserDto()
            {
                Id = user.Id,
                Email = user.Email,
                UserName = user.UserName,
                Roles = roles.ToList(),
            };
        }
    }
}
