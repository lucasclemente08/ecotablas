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
    public class RutaxEmpleadosController : ApiController
    {
        // GET: api/RutaxEmpleados
        [HttpGet]
        public List<RutaxEmpleados> ListarTodo()
        {
            RutaxEmpleados oRutaxEmpleados = new RutaxEmpleados();

            DataTable dt = oRutaxEmpleados.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<RutaxEmpleados>>(listaJson);

            return Lista;

        }

        // GET: api/RutaxEmpleados/5
        [HttpGet]
        public List<RutaxEmpleados> ListarPorId(int id)
        {
            try
            {
                RutaxEmpleados oRutaxEmpleados = new RutaxEmpleados();
                oRutaxEmpleados.IdRuta = id;

                DataTable dt = oRutaxEmpleados.SelectId();

                if (dt.Rows.Count == 0)
                {
                    return new List<RutaxEmpleados>(); // Devuelve una lista vacía si no hay puntos
                }

                var ListaJson = JsonConvert.SerializeObject(dt);
                var listaEmpleados = JsonConvert.DeserializeObject<List<RutaxEmpleados>>(ListaJson);
                return listaEmpleados;
            }
            catch (Exception ex)
            {
                // Log del error (puedes usar un logger como NLog o Serilog)
                throw new Exception("Error al obtener los puntos de la ruta.", ex);
            }
        }

        // POST: api/RutaxEmpleados
        [HttpPost]
        public void Insertar([FromBody] RutaxEmpleados value)
        {
            RutaxEmpleados oRutaxEmpleados = new RutaxEmpleados();
            oRutaxEmpleados.IdRuta = value.IdRuta;
            oRutaxEmpleados.IdEmpleado = value.IdEmpleado;
            oRutaxEmpleados.Insert();
        }

        // PUT: api/RutaxEmpleados/5
        [HttpPut]
        public void Modificar(int id, [FromBody] RutaxEmpleados value)
        {
            RutaxEmpleados oRutaxEmpleados = new RutaxEmpleados();
            oRutaxEmpleados.IdRuta = value.IdRuta;
            oRutaxEmpleados.IdEmpleado = value.IdEmpleado;

            oRutaxEmpleados.Update();
        }

        // DELETE: api/RutaxEmpleados/5
        [HttpDelete]
        public void Delete(int id)
        {
            RutaxEmpleados oRutaxEmpleados = new RutaxEmpleados();
            oRutaxEmpleados.IdRuta = id;

            oRutaxEmpleados.Delete();
        }
    }
}
