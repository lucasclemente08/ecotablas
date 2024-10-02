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
    public class AreaTrabajoController : ApiController
    {
        // GET: api/AreaTrabajo
        [HttpGet]
        public List<AreaTrabajo> ListarTodo()
        {
            AreaTrabajo oAreaTrabajo = new AreaTrabajo();

            DataTable dt = oAreaTrabajo.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<AreaTrabajo>>(listaJson);

            return Lista;

        }


        [HttpGet]
        public AreaTrabajo ListarPorId(int id)
        {
            AreaTrabajo oAreaTrabajo = new AreaTrabajo();
            oAreaTrabajo.IdArea = id;

            DataTable dt = oAreaTrabajo.SelectId();

            var ListaJsom = JsonConvert.SerializeObject(dt);

            var obj = JsonConvert.DeserializeObject<List<AreaTrabajo>>(ListaJsom).ToList().FirstOrDefault();

            return obj;

        }



        [HttpPost]
        public void Insertar([FromBody] AreaTrabajo value)
        {
            AreaTrabajo oAreaTrabajo = new AreaTrabajo();
            oAreaTrabajo.Area = value.Area;

            oAreaTrabajo.Insert();
        }



        [HttpPut]
        public void Modificar(int id, [FromBody] AreaTrabajo value)
        {

            AreaTrabajo oAreaTrabajo = new AreaTrabajo();
            oAreaTrabajo.IdArea = id;
            oAreaTrabajo.Area = value.Area;

            oAreaTrabajo.Update();


        }


        [HttpDelete]
        public void Borrar(int id)
        {

            AreaTrabajo oAreaTrabajo = new AreaTrabajo();
            oAreaTrabajo.IdArea = id;

            oAreaTrabajo.Delete();

        }
    }
}
