using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Entities.Base;
using Services.Services.Interfaces;

namespace API.Controllers.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseCRUDController<T> : ControllerBase where T : BaseEntity
    {
        private readonly IServiceBase<T> _service;

        public BaseCRUDController(IServiceBase<T> service)
        {
            _service = service;
        }

        // GET: api/[controller]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<T>>> GetAllAsync()
        {
            var entities = await _service.GetAllAsync();
            return Ok(entities);
        }

        // GET: api/[controller]/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<T>> GetByIdAsync(int id)
        {
            var entity = await _service.GetByIdAsync(id);
            return entity == null ? NotFound() : Ok(entity);
        }

        // POST: api/[controller]
        [HttpPost]
        public async Task<ActionResult<T>> Post([FromBody] T entity)
        {
            await _service.AddAsync(entity);
            return CreatedAtAction("Get", new { id = entity.Id }, entity);
        }

        // PUT: api/[controller]/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] T entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }
            await _service.UpdateAsync(entity);
            return NoContent();
        }

        // DELETE: api/[controller]/{id}
        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(int id)
        {
            var entity = await _service.GetByIdAsync(id);
            if (entity == null)
            {
                return NotFound();
            }
            await _service.DeleteAsync(entity);
            return NoContent();
        }
    }
}
