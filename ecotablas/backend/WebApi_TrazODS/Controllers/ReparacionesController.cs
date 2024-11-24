using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi_TrazODS.Models.WebApi_TrazODS.Models;

namespace WebApi_TrazODS.Controllers
{
    public class ReparacionController : ApiController
    {
        // GET: api/Reparacion
        [HttpGet]
        public List<Reparacion> ListarTodo()
        {
            Reparacion oReparacion = new Reparacion();
            DataTable dt = oReparacion.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);
            var Lista = JsonConvert.DeserializeObject<List<Reparacion>>(listaJson);

            return Lista;
        }

        // GET: api/Reparacion/5
        [HttpGet]
        public Reparacion ListarPorId(int id)
        {
            Reparacion oReparacion = new Reparacion();
            oReparacion.Id = id;

            DataTable dt = oReparacion.SelectId();

            var listaJson = JsonConvert.SerializeObject(dt);
            var obj = JsonConvert.DeserializeObject<List<Reparacion>>(listaJson).FirstOrDefault();

            return obj;
        }
        // GET: api/Reparacion/5
        [HttpGet]
        public Reparacion ListarPorIdMaquinaria(int id)
        {
            Reparacion oReparacion = new Reparacion();
            oReparacion.IdMaquinaria = id;

            DataTable dt = oReparacion.SelectIdMaquinaria();

            var listaJson = JsonConvert.SerializeObject(dt);
            var obj = JsonConvert.DeserializeObject<List<Reparacion>>(listaJson).FirstOrDefault();

            return obj;
        }

        // POST: api/Reparacion
        [HttpPost]
        public void Insertar([FromBody] Reparacion value)
        {
            Reparacion oReparacion = new Reparacion();
            oReparacion.IdMaquinaria = value.IdMaquinaria;
            oReparacion.IdVehiculo = value.IdVehiculo;
            oReparacion.Detalle = value.Detalle;
            oReparacion.FechaInicio = value.FechaInicio;
            oReparacion.IdEstadoReparacion = value.IdEstadoReparacion;
            oReparacion.Costo = value.Costo;

            oReparacion.Insert();
        }

        // PUT: api/Reparacion/5
        [HttpPut]
        public void Modificar(int id, [FromBody] Reparacion value)
        {
            Reparacion oReparacion = new Reparacion();
            oReparacion.Id = id;
            oReparacion.IdMaquinaria = value.IdMaquinaria;
            oReparacion.IdVehiculo = value.IdVehiculo;
            oReparacion.Detalle = value.Detalle;
            oReparacion.FechaInicio = value.FechaInicio;
            oReparacion.IdEstadoReparacion = value.IdEstadoReparacion;
            oReparacion.Costo = value.Costo;

            oReparacion.Update();
        }

        // DELETE: api/Reparacion/5
        [HttpDelete]
        public void Borrar(int id)
        {
            Reparacion reparacion = new Reparacion();
            reparacion.Id = id;

            reparacion.Delete();
        }
    }
}
