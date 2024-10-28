using System;
using System.Collections.Generic;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi_TrazODS.Models;

namespace WebApi_TrazODS.Controllers
{
    public class TolvaController : ApiController
    {
        private readonly Tolva _tolva;

        public TolvaController()
        {
            _tolva = new Tolva(); // Inicializar la clase del modelo
        }

        // GET: api/tolvas
        [HttpGet]
        public IHttpActionResult ListarTodo()
        {
            DataTable dt = _tolva.SelectAll();

            if (dt.Rows.Count == 0)
            {
                return NotFound(); // Si no hay tolvas, devuelve 404
            }

            var listaTolvas = new List<Tolva>();
            foreach (DataRow row in dt.Rows)
            {
                listaTolvas.Add(new Tolva
                {
                    IdTolva = Convert.ToInt32(row["idTolva"]),
                    IdTriturado = Convert.ToInt32(row["id_triturado"]),
                    HorarioInicio = Convert.ToDateTime(row["horario_inicio"]),
                    CantidadCargada = Convert.ToDecimal(row["cantidad_cargada"]),
                    TipoPlastico = row["tipo_plastico"].ToString(),
                    Proporcion = row["proporcion"].ToString(),
                    Especificaciones = row["especificaciones"].ToString()
                });
            }

            return Ok(listaTolvas); // Devuelve la lista de tolvas
        }

        // GET: api/tolvas/{id}
        //[HttpGet]
        //[Route("api/tolvas/{id:int}")]
        //public IHttpActionResult ObtenerTolva(int id)
        //{
        //    DataTable dt = _tolva.SelectById(id); // Asume que tienes un método SelectById

        //    if (dt.Rows.Count == 0)
        //    {
        //        return NotFound(); // Si no se encuentra la tolva, devuelve 404
        //    }

        //    DataRow row = dt.Rows[0];
        //    var tolva = new Tolva
        //    {
        //        IdTolva = Convert.ToInt32(row["idTolva"]),
        //        IdTriturado = Convert.ToInt32(row["id_triturado"]),
        //        HorarioInicio = Convert.ToDateTime(row["horario_inicio"]),
        //        CantidadCargada = Convert.ToDecimal(row["cantidad_cargada"]),
        //        TipoPlastico = row["tipo_plastico"].ToString(),
        //        Proporcion = row["proporcion"].ToString(),
        //        Especificaciones = row["especificaciones"].ToString()
        //    };

        //    return Ok(tolva); // Devuelve la tolva encontrada
        //}

        // POST: api/tolvas
        [HttpPost]
        public IHttpActionResult CrearTolva([FromBody] Tolva nuevaTolva)
        {
            if (nuevaTolva == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState); // Manejo de errores de modelo
            }

            // Lógica para agregar la nueva tolva a la base de datos
            _tolva.Insert(nuevaTolva);

            return CreatedAtRoute("DefaultApi", new { id = nuevaTolva.IdTolva }, nuevaTolva); // Devuelve 201 Created
        }

        // PUT: api/tolvas/{id}
        [HttpPut]
        [Route("api/tolvas/{id:int}")]
        public IHttpActionResult ActualizarTolva(int id, [FromBody] Tolva tolvaActualizada)
        {
            if (tolvaActualizada == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState); // Manejo de errores de modelo
            }

            // Verificar si la tolva existe
            if (!_tolva.Exists(id))
            {
                return NotFound(); // Si no se encuentra la tolva, devuelve 404
            }

            tolvaActualizada.IdTolva = id;
            _tolva.Update(tolvaActualizada);

            return StatusCode(HttpStatusCode.NoContent); // Devuelve 204 No Content
        }

        // DELETE: api/tolvas/{id}
        [HttpDelete]
        [Route("api/tolvas/{id:int}")]
        public IHttpActionResult EliminarTolva(int id)
        {
            // Verificar si la tolva existe
            if (!_tolva.Exists(id))
            {
                return NotFound(); // Si no se encuentra la tolva, devuelve 404
            }

            _tolva.Delete(id);
            return StatusCode(HttpStatusCode.NoContent); // Devuelve 204 No Content
        }
    }
}
