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
    public class GastoVehiculosController : ApiController
    {

        // GET: api/GastoVehiculos
        [HttpGet]
        public IHttpActionResult ListarTodo()
        {

            GastoVehiculos oGastoVehiculos = new GastoVehiculos();
            DataTable dt = oGastoVehiculos.SelectAll();

            if (dt.Rows.Count == 0)
            {
                return NotFound();
            }


            var listaGastoVehiculos = new List<GastoVehiculos>();
            foreach (DataRow row in dt.Rows)
            {
                listaGastoVehiculos.Add(new GastoVehiculos
                {
                    IdGasto = Convert.ToInt32(row["IdGasto"]),
                    TipoGasto = row["TipoGasto"].ToString(),
                    TipoComprobante = row["TipoComprobante"].ToString(),
                    IdVehiculo = Convert.ToInt32(row["IdVehiculo"]),
                    Comprobante = row["Comprobante"].ToString(),
                    Proveedor = row["Proveedor"].ToString(),
                    Monto = Convert.ToDecimal(row["Monto"]),
                    Fecha = Convert.ToDateTime(row["Fecha"]),
                    Descripcion = row["Descripcion"].ToString()
                });
            }

            return Ok(listaGastoVehiculos); // Devuelve la lista de gastos de vehículos
        }

        [HttpPost]
        public IHttpActionResult CrearGastoVehiculo([FromBody] GastoVehiculos nuevoGasto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            GastoVehiculos oGastoVehiculo = new GastoVehiculos();
            oGastoVehiculo.Insert(nuevoGasto);

            return CreatedAtRoute("DefaultApi", new { id = nuevoGasto.IdGasto }, nuevoGasto);
        }

        [HttpPut]

        public IHttpActionResult ActualizarGastoVehiculo(int id, [FromBody] GastoVehiculos gastoActualizado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            GastoVehiculos oGastoVehiculo = new GastoVehiculos();
            bool existe = oGastoVehiculo.Exists(id);
            if (!existe)
            {
                return NotFound();
            }

            gastoActualizado.IdGasto = id;
            oGastoVehiculo.Update(gastoActualizado);

            return StatusCode(HttpStatusCode.NoContent);
        }



        [HttpDelete]

        public IHttpActionResult EliminarGastoVehiculo(int id)
        {
            GastoVehiculos oGastoVehiculo = new GastoVehiculos();
            bool existe = oGastoVehiculo.Exists(id);
            if (!existe)
            {
                return NotFound();
            }

            oGastoVehiculo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
