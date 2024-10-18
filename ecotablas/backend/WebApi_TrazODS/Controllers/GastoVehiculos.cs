using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi_TrazODS.Models;

namespace WebApi_TrazODS.Controllers
{
    [RoutePrefix("api/gastosvehiculos")]
    public class GastoVehiculoController : ApiController
    {
        private readonly GastoVehiculo gastoVehiculo = new GastoVehiculo();

        // GET: api/gastosvehiculos
        [HttpGet]
      
        public IHttpActionResult GetGastos()
        {
            var dataTable = gastoVehiculo.SelectAll();
            return Ok(dataTable);
        }

        // GET: api/gastosvehiculos/{id}
        [HttpGet]
     
        public IHttpActionResult GetGasto(int id)
        {
            var dataTable = gastoVehiculo.SelectById(id);
            if (dataTable.Rows.Count == 0)
            {
                return NotFound();
            }
            return Ok(dataTable);
        }

        // POST: api/gastosvehiculos
        [HttpPost]

        public IHttpActionResult PostGasto([FromBody] GastoVehiculo nuevoGasto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            gastoVehiculo.Insert(nuevoGasto);
            return CreatedAtRoute("DefaultApi", new { id = nuevoGasto.IdGasto }, nuevoGasto);
        }

        // PUT: api/gastosvehiculos/{id}
        [HttpPut]
     
        public IHttpActionResult PutGasto(int id, [FromBody] GastoVehiculo gastoActualizado)
        {
            if (id != gastoActualizado.IdGasto || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!gastoVehiculo.Exists(id))
            {
                return NotFound();
            }

            gastoVehiculo.Update(gastoActualizado);
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/gastosvehiculos/{id}
        [HttpDelete]
       
        public IHttpActionResult DeleteGasto(int id)
        {
            if (!gastoVehiculo.Exists(id))
            {
                return NotFound();
            }

            gastoVehiculo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
