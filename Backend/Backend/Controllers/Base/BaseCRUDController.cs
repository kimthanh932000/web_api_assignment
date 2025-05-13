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
            try
            {
                var entities = await _service.GetAllAsync();
                return Ok(entities);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // GET: api/[controller]/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<T>> GetByIdAsync(int id)
        {
            try
            {
                var entity = await _service.GetByIdAsync(id);
                return entity == null ? NoContent() : entity;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // POST: api/[controller]
        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] T entity)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }
            try
            {
                await _service.AddAsync(entity);
            }
            catch (Exception ex) {
                return BadRequest(ex);
            }
            return Ok(entity);
            //return CreatedAtAction("GetByIdAsync", new { id = entity.Id }, entity);
        }

        // PUT: api/[controller]/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<T>> UpdateAsync(int id, [FromBody] T entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }
            
            try
            {
                await _service.UpdateAsync(entity);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok(entity);
        }

        // DELETE: api/[controller]/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            //if (id != entity.Id)
            //{
            //    return BadRequest();
            //}

            try
            {
                await _service.DeleteAsync(id);
            } 
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            return Ok();
        }
    }
}
