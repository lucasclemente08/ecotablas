using System;
using System.Collections.Generic;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi_TrazODS.Models;

namespace WebApi_TrazODS.Controllers
{
    public class TablaProducidasController : ApiController
    {
        private readonly TablasProducidas _tablasProducidas;

        // Constructor
        public TablaProducidasController()
        {
            _tablasProducidas = new TablasProducidas(); // Inicializar la clase que maneja la lógica de negocio
        }

        // GET: api/TablasProducidas
        [HttpGet]

        public IHttpActionResult GetAll()
        {
            try
            {
                DataTable result = _tablasProducidas.SelectAll();
                return Ok(result); // Retornar un 200 OK con los datos
            }
            catch (Exception ex)
            {
                return InternalServerError(ex); // Retornar un 500 si ocurre un error
            }
        }

        // GET: api/TablasProducidas/5
        [HttpGet]
     
        public IHttpActionResult GetById(int id)
        {
            try
            {
                DataTable result = _tablasProducidas.SelectById(id);
                if (result.Rows.Count == 0)
                {
                    return NotFound(); // Retornar 404 si no se encuentra la tabla
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // POST: api/TablasProducidas
        [HttpPost]
        
        public IHttpActionResult Create([FromBody] TablasProducidas nuevaTabla)
        {
            if (nuevaTabla == null)
            {
                return BadRequest("Los datos de la tabla producida son inválidos."); // Retornar 400 si la solicitud es inválida
            }

            try
            {
                _tablasProducidas.Insert(nuevaTabla); // Inserta la nueva tabla producida
                return CreatedAtRoute("DefaultApi", new { id = nuevaTabla.ID_Tabla }, nuevaTabla); // Retornar 201 con la ubicación del nuevo recurso
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/TablasProducidas/5
        [HttpPut]
     
        public IHttpActionResult Update(int id, [FromBody] TablasProducidas tablaActualizada)
        {
            if (tablaActualizada == null || tablaActualizada.ID_Tabla != id)
            {
                return BadRequest("Los datos de la tabla producida son inválidos."); // Retornar 400 si la solicitud es inválida
            }

            try
            {
                // Aquí puedes agregar lógica para verificar si la tabla existe antes de actualizar
                _tablasProducidas.Update(tablaActualizada); // Actualiza la tabla producida
                return StatusCode(HttpStatusCode.NoContent); // Retornar 204 si la actualización fue exitosa
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE: api/TablasProducidas/5
        [HttpDelete]
 
        public IHttpActionResult Delete(int id)
        {
            try
            {
                _tablasProducidas.Delete(id); // Elimina la tabla producida
                return StatusCode(HttpStatusCode.NoContent); // Retornar 204 si la eliminación fue exitosa
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
