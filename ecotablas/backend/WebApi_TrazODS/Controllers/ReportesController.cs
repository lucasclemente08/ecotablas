using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi_TrazODS.Models;

namespace WebApi_TrazODS.Controllers
{
    public class ReportesController : ApiController
    {
        // GET: api/reportes
        [HttpGet]
        public IHttpActionResult ListarTodo()
        {
            Reportes oReportes = new Reportes();
            DataTable dt = oReportes.SelectAll();

            if (dt.Rows.Count == 0)
            {
                return NotFound();
            }

            List<Reportes> listaReportes = new List<Reportes>();
            foreach (DataRow row in dt.Rows)
            {
                listaReportes.Add(new Reportes
                {
                    Id_reporte = Convert.ToInt32(row["Id_reporte"]),
                    Titulo = row["Titulo"].ToString(),
                    Descripcion = row["Descripcion"].ToString(),
                    Area = row["Area"].ToString(),
                    FechaIncidente = Convert.ToDateTime(row["FechaIncidente"]),
                    FechaReporte = Convert.ToDateTime(row["FechaReporte"]),
                    Estado = row["Estado"].ToString()
                });
            }

            return Ok(listaReportes);
        }

        // GET: api/reportes/{id}
        [HttpGet]
        public IHttpActionResult ObtenerReporte(int id)
        {
            Reportes oReportes = new Reportes();
            DataTable dt = oReportes.SelectById(id);

            if (dt.Rows.Count == 0)
            {
                return NotFound();
            }

            DataRow row = dt.Rows[0];
            Reportes reporte = new Reportes
            {
                Id_reporte = Convert.ToInt32(row["Id_reporte"]),
                Titulo = row["Titulo"].ToString(),
                Descripcion = row["Descripcion"].ToString(),
                Area = row["Area"].ToString(),
                FechaIncidente = Convert.ToDateTime(row["FechaIncidente"]),
                FechaReporte = Convert.ToDateTime(row["FechaReporte"]),
                Estado = row["Estado"].ToString()
            };

            return Ok(reporte);
        }

        // POST: api/reportes
        [HttpPost]
        public IHttpActionResult CrearReporte([FromBody] Reportes nuevoReporte)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Lógica para agregar el nuevo reporte a la base de datos
            Reportes oReportes = new Reportes();
            oReportes.Insert(nuevoReporte);

            return CreatedAtRoute("DefaultApi", new { id = nuevoReporte.Id_reporte }, nuevoReporte);
        }

        // PUT: api/reportes/{id}
        [HttpPut]
        public IHttpActionResult ActualizarReporte(int id, [FromBody] Reportes reporteActualizado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Reportes oReportes = new Reportes();
            bool existe = oReportes.Exists(id);
            if (!existe)
            {
                return NotFound();
            }

            reporteActualizado.Id_reporte = id;
            oReportes.Update(reporteActualizado);

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/reportes/{id}
        [HttpDelete]
        public IHttpActionResult EliminarReporte(int id)
        {
            Reportes oReportes = new Reportes();
            bool existe = oReportes.Exists(id);
            if (!existe)
            {
                return NotFound();
            }

            oReportes.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
