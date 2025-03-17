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
        public List<PuntosRuta> ListarPorId(int id)
        {
            try
            {
                PuntosRuta oPuntosRuta = new PuntosRuta();
                oPuntosRuta.IdRuta = id;

                DataTable dt = oPuntosRuta.SelectId();

                if (dt.Rows.Count == 0)
                {
                    return new List<PuntosRuta>(); // Devuelve una lista vacía si no hay puntos
                }

                var ListaJson = JsonConvert.SerializeObject(dt);
                var listaPuntos = JsonConvert.DeserializeObject<List<PuntosRuta>>(ListaJson);
                return listaPuntos;
            }
            catch (Exception ex)
            {
                // Log del error (puedes usar un logger como NLog o Serilog)
                throw new Exception("Error al obtener los puntos de la ruta.", ex);
            }
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
            oPuntosRuta.IdRuta = id;

            oPuntosRuta.Delete();
        }
    }
}
