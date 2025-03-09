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
    public class RutasController : ApiController
    {
        // GET: api/Rutas
        [HttpGet]
        public List<Rutas> ListarTodo()
        {
            Rutas oRutas = new Rutas();

            DataTable dt = oRutas.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<Rutas>>(listaJson);

            return Lista;

        }

        // GET: api/Rutas/5
        [HttpGet]
        public Rutas ListarPorId(int id)
        {
            Rutas oRutas = new Rutas();
            oRutas.IdRuta = id;

            DataTable dt = oRutas.SelectId();


            var ListaJsom = JsonConvert.SerializeObject(dt);

            var obj = JsonConvert.DeserializeObject<List<Rutas>>(ListaJsom).ToList().FirstOrDefault();

            return obj;
        }

        // POST: api/Rutas
        [HttpPost]
        public HttpResponseMessage Insertar([FromBody] Rutas value)
        {
            try
            {
                Rutas oRutas = new Rutas();
                oRutas.NombreRuta = value.NombreRuta;
                oRutas.Fecha = value.Fecha;

                // Insertar la ruta y obtener el IdRuta generado
                int idRuta = oRutas.Insert();

                // Devolver el IdRuta en la respuesta
                return Request.CreateResponse(HttpStatusCode.OK, new { IdRuta = idRuta });
            }
            catch (Exception ex)
            {
                // Manejar errores
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // PUT: api/Rutas/5
        [HttpPut]
        public void Modificar(int id, [FromBody] Rutas value)
        {
            Rutas oRutas = new Rutas();
            oRutas.IdRuta = id;
            oRutas.NombreRuta = value.NombreRuta;
            oRutas.Fecha = value.Fecha;

            oRutas.Update();
        }

        // DELETE: api/Rutas/5
        [HttpDelete]
        public void Delete(int id)
        {
            Rutas oRutas = new Rutas();
            oRutas.IdRuta = id;

            oRutas.Delete();
        }
    }
}
