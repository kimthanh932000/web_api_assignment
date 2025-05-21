using API.Wrappers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Models.DTOs.Auth;
using Models.DTOs.User;
using Models.Entities;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult<ApiResponse<UserDto>>> Register([FromBody] RegisterRequestDto request)
        {
            try
            {
                // Check existed user
                var existedUser = await _userManager.FindByEmailAsync(request.Email);

                if (existedUser != null)
                {
                    return BadRequest(ApiResponse<object>.FailedResponse(new List<string>
                        {"This user already exists"},
                        "Registration failed"));
                }

                var user = new ApplicationUser
                {
                    UserName = request.Email,
                    Email = request.Email
                };

                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, password: request.Password);

                var result = await _userManager.CreateAsync(user);

                // Check if registration success
                if (!result.Succeeded)
                {
                    var errorMessages = result.Errors.Select(e => e.Description).ToList();
                    return BadRequest(ApiResponse<object>.FailedResponse(errorMessages, "Registration failed"));
                }

                // Assign role to user
                var roleResult = await _userManager.AddToRoleAsync(user, request.Role);

                if (!roleResult.Succeeded)
                {
                    var errorMessages = roleResult.Errors.Select(e => e.Description).ToList();
                    return BadRequest(ApiResponse<UserDto>.FailedResponse(
                        errorMessages,
                        "Failed to assign role"
                    ));
                }

                return Ok(ApiResponse<object>.SuccessResponse(null, "Registration success"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse<UserDto>.FailedResponse(
                            new List<string> { ex.Message },
                            "An error has occurred"
                        ));
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<ApiResponse<UserDto>>> Login([FromBody] LoginRequestDto request)
        {
            // Check if email exists
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return Unauthorized(ApiResponse<object>.FailedResponse(
                    new List<string> { "Invalid credentials" },
                    "Login failed"
                ));
            }

            // Check if password match
            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                return Unauthorized(ApiResponse<object>.FailedResponse(
                    new List<string> { "Invalid credentials." },
                    "Login failed"
                ));
            }

            // Get user roles
            var roles = await _userManager.GetRolesAsync(user);

            var userDto = user.ToUserDto(roles);

            return Ok(ApiResponse<UserDto>.SuccessResponse(userDto, "Login successful"));
        }

    }
}