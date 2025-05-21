using Microsoft.AspNetCore.Identity;
using Models.Entities;

namespace Services.Data.Initialization
{
    public static class SampleData
    {
        public static List<Element> Elements = new()
        {
            new Element { Name = "Hydrogen", Description = "Lightest element", ElementType = "Gas" },
            new Element { Name = "Carbon", Description = "Common non-metal", ElementType = "Solid" },
            new Element { Name = "Oxygen", Description = "Essential for respiration", ElementType = "Gas" },
            new Element { Name = "Iron", Description = "Used in construction", ElementType = "Metal" },
            new Element { Name = "Gold", Description = "Precious metal", ElementType = "Metal" },
            new Element { Name = "Mercury", Description = "Liquid metal at room temperature", ElementType = "Liquid" },
            new Element { Name = "Helium", Description = "Inert noble gas", ElementType = "Gas" },
            new Element { Name = "Silicon", Description = "Used in electronics", ElementType = "Metalloid" },
            new Element { Name = "Chlorine", Description = "Used in disinfectants", ElementType = "Gas" },
            new Element { Name = "Aluminium", Description = "Lightweight metal", ElementType = "Metal" }
        };

        public static List<string> Roles = new()
        {
            "Admin",
            "User"
        };
    }
}
