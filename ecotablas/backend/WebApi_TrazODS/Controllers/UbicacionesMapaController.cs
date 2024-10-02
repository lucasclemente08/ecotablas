using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using System.Data;
using WebApi_TrazODS.Models;
using Newtonsoft.Json;

namespace WebApi_TrazODS.Controllers
{
    public class UbicacionesMapaController : ApiController
    {
        // GET: api/UbicacionesMapa
        [HttpGet]
        public List<UbicacionesMapa> ListarTodo()
        {
            UbicacionesMapa oUbicacionesMapa = new UbicacionesMapa();

            DataTable dt = oUbicacionesMapa.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<UbicacionesMapa>>(listaJson);

            return Lista;

        }

        // GET: api/UbicacionesMapa/5
        [HttpGet]
        public UbicacionesMapa ListarPorId(int id)
        {
            UbicacionesMapa oUbicacionesMapa = new UbicacionesMapa();
            oUbicacionesMapa.IdUbicacion = id;

            DataTable dt = oUbicacionesMapa.SelectId();
            

            var ListaJsom = JsonConvert.SerializeObject(dt);

            var obj = JsonConvert.DeserializeObject<List<UbicacionesMapa>>(ListaJsom).ToList().FirstOrDefault();

            return obj;
        }

        // POST: api/UbicacionesMapa
        [HttpPost]
        public void Insertar([FromBody] UbicacionesMapa value)
        {
            UbicacionesMapa oUbicacionesMapa = new UbicacionesMapa();
            oUbicacionesMapa.Nombre = value.Nombre;
            oUbicacionesMapa.Lat = value.Lat;
            oUbicacionesMapa.Long = value.Long;

            oUbicacionesMapa.Insert();
        }

        // PUT: api/UbicacionesMapa/5
        [HttpPut]
        public void Modificar(int id, [FromBody] UbicacionesMapa value)
        {
            UbicacionesMapa oUbicacionesMapa = new UbicacionesMapa();
            oUbicacionesMapa.IdUbicacion = id;
            oUbicacionesMapa.Nombre = value.Nombre;
            oUbicacionesMapa.Lat = value.Lat;
            oUbicacionesMapa.Long = value.Long;

            oUbicacionesMapa.Insert();
        }

        // DELETE: api/UbicacionesMapa/5
        [HttpDelete]
        public void Delete(int id)
        {
            UbicacionesMapa oUbicacionesMapa = new UbicacionesMapa();
            oUbicacionesMapa.IdUbicacion = id;

            oUbicacionesMapa.Delete();
        }
    }
}
