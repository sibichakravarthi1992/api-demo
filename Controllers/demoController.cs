using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using demoapi.Models;

namespace demoapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class demoController : ControllerBase
    {
        private readonly demoContext _context;

        public demoController(demoContext context)
        {
            _context = context;
        }

        // GET: api/demo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<demo>>> Getdemos()
        {
            return await _context.demos.ToListAsync();
        }

        // GET: api/demo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<demo>> Getdemo(long id)
        {
            var demo = await _context.demos.FindAsync(id);

            if (demo == null)
            {
                return NotFound();
            }

            return demo;
        }

        // PUT: api/demo/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putdemo(long id, demo demo)
        {
            if (id != demo.Id)
            {
                return BadRequest();
            }

            _context.Entry(demo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!demoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/demo
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<demo>> Postdemo(demo demo)
        {
            _context.demos.Add(demo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getdemo", new { emailId = demo.EmailId }, demo);
        }

        // DELETE: api/demo/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<demo>> Deletedemo(long id)
        {
            var demo = await _context.demos.FindAsync(id);
            if (demo == null)
            {
                return NotFound();
            }

            _context.demos.Remove(demo);
            await _context.SaveChangesAsync();

            return demo;
        }

        private bool demoExists(long id)
        {
            return _context.demos.Any(e => e.Id == id);
        }
        private bool demoExists(string emailId)
        {
            return _context.demos.Any(e => e.EmailId == emailId);
        }
    }
}
