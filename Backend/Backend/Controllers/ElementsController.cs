using API.Controllers.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Entities;
using Services.Services.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ElementsController : BaseCRUDController<Element>
    {
        public ElementsController(IServiceBase<Element> service) : base(service)
        {
        }
    }
}
