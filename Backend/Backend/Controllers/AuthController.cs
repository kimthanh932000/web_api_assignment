using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public AuthController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                var existedUser = _userManager.FindByEmailAsync(request.Email);

                if (existedUser != null)
                {
                    return BadRequest("This user already exists.");
                }

                var user = new IdentityUser
                {
                    UserName = request.Email,
                    Email = request.Email
                };

                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, password: request.Password);

                await _userManager.CreateAsync(user);
            } 
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            return Ok();
        }
    }
}
