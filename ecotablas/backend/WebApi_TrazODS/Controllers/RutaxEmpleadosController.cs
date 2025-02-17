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
        public RutaxEmpleados RutaxEmpleados(int id)
        {
            RutaxEmpleados oRutaxEmpleados = new RutaxEmpleados();
            oRutaxEmpleados.IdRuta = id;

            DataTable dt = oRutaxEmpleados.SelectId();


            var ListaJsom = JsonConvert.SerializeObject(dt);

            var obj = JsonConvert.DeserializeObject<List<RutaxEmpleados>>(ListaJsom).ToList().FirstOrDefault();

            return obj;
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
            oRutaxEmpleados.IdRutaxEmpleado = id;

            oRutaxEmpleados.Delete();
        }
    }
}
