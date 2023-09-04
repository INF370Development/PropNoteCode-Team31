using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebApi.Interfaces;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserRoleController : Controller
    {
        private IUserRoleRepository _userRoleRepository;

        public UserRoleController(IUserRoleRepository userRoleRepository)
        {
            _userRoleRepository = userRoleRepository;
        }

        [HttpGet]
        [Route("GetAllRoles")]
        public async Task<IActionResult> GetAllUserRoles()
        {
            var userRoles = await _userRoleRepository.GetAllRolesAsync();
            return Ok(userRoles);
        }
    }
}