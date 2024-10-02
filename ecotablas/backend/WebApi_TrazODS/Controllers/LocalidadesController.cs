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
    public class LocalidadesController : ApiController
    {
        // GET: api/Localidades
        [HttpGet]
        public List<Localidades> ListarTodo()
        {
            Localidades oLocalidad = new Localidades();

            DataTable dt = oLocalidad.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<Localidades>>(listaJson);

            return Lista;

        }


        [HttpGet]
        public Localidades ListarPorId(int id)
        {
            Localidades oLocalidad = new Localidades();
            oLocalidad.IdLocalidad = id;

            DataTable dt = oLocalidad.SelectId();

            var ListaJsom = JsonConvert.SerializeObject(dt);

            var obj = JsonConvert.DeserializeObject<List<Localidades>>(ListaJsom).ToList().FirstOrDefault();

            return obj;

        }



        [HttpPost]
        public void Insertar([FromBody] Localidades value)
        {
            Localidades oLocalidad = new Localidades();
            oLocalidad.Localidad = value.Localidad;
            oLocalidad.Insert();
        }



        [HttpPut]
        public void Modificar(int id, [FromBody] Localidades value)
        {

            Localidades oLocalidad = new Localidades();
            oLocalidad.IdLocalidad = id;
            oLocalidad.Localidad = value.Localidad;

            oLocalidad.Update();


        }


        [HttpDelete]
        public void Borrar(int id)
        {

            Localidades oLocalidad = new Localidades();
            oLocalidad.IdLocalidad = id;

            oLocalidad.Delete();

        }
    }
}
