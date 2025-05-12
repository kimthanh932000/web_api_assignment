using Models.Entities;
using Services.Data;
using Services.Services.Base;
using Services.Services.Interfaces;

namespace Services.Services
{
    public class ElementService : ServiceBase<Element>, IElementService
    {
        public ElementService(ApplicationDbContext context) : base(context)
        {
        }
    }
}
