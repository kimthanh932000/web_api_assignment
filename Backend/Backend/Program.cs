
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Models.Entities;
using Services.Data;
using Services.Data.Initialization;
using Services.Services;
using Services.Services.Base;
using Services.Services.Interfaces;

namespace Backend
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            // Register dbcontext
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")
                    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.")));

            builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 1;
                options.Password.RequiredUniqueChars = 0;
            })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Register all services
            builder.Services.AddScoped<IElementService, ElementService>();
            builder.Services.AddScoped<IServiceBase<Element>, ServiceBase<Element>>();

            // CORS config
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowAnyOrigin();
                });
            });

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();

                using var scope = app.Services.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                await SampleDataInitializer.SeedData(context, roleManager);
            }

            app.UseHttpsRedirection();

            // Apply the CORS policy
            app.UseCors("AllowAll");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
