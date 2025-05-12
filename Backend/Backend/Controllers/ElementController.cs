using API.Controllers.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Entities;
using Services.Services.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ElementController : BaseCRUDController<Element>
    {
        public ElementController(IServiceBase<Element> service) : base(service)
        {
        }
    }
}
