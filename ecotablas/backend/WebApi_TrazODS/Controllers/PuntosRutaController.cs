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
    public class PuntosRutaController : ApiController
    {
        // GET: api/PuntosRuta
        [HttpGet]
        public List<PuntosRuta> ListarTodo()
        {
            PuntosRuta oPuntosRuta = new PuntosRuta();

            DataTable dt = oPuntosRuta.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<PuntosRuta>>(listaJson);

            return Lista;

        }

        // GET: api/PuntosRuta/5
        [HttpGet]
        public PuntosRuta ListarPorId(int id)
        {
            PuntosRuta oPuntosRuta = new PuntosRuta();
            oPuntosRuta.IdRuta = id;

            DataTable dt = oPuntosRuta.SelectId();


            var ListaJsom = JsonConvert.SerializeObject(dt);

            var obj = JsonConvert.DeserializeObject<List<PuntosRuta>>(ListaJsom).ToList().FirstOrDefault();

            return obj;
        }

        // POST: api/PuntosRuta
        [HttpPost]
        public void Insertar([FromBody] PuntosRuta value)
        {
            PuntosRuta oPuntosRuta = new PuntosRuta();
            oPuntosRuta.IdRuta = value.IdRuta;
            oPuntosRuta.Orden = value.Orden;
            oPuntosRuta.Latitud = value.Latitud;
            oPuntosRuta.Longitud = value.Longitud;
            oPuntosRuta.Insert();
        }

        // PUT: api/PuntosRuta/5
        [HttpPut]
        public void Modificar(int id, [FromBody] PuntosRuta value)
        {
            PuntosRuta oPuntosRuta = new PuntosRuta();
            oPuntosRuta.IdPunto = id;
            oPuntosRuta.IdRuta = value.IdRuta;
            oPuntosRuta.Orden = value.Orden;
            oPuntosRuta.Latitud = value.Latitud;
            oPuntosRuta.Longitud = value.Longitud;

            oPuntosRuta.Update();
        }

        // DELETE: api/PuntosRuta/5
        [HttpDelete]
        public void Delete(int id)
        {
            PuntosRuta oPuntosRuta = new PuntosRuta();
            oPuntosRuta.IdPunto = id;

            oPuntosRuta.Delete();
        }
    }
}
