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
    public class RolesController : ApiController
    {
        // GET: api/Roles
        [HttpGet]
        public List<Roles> ListarTodo()
        {
            Roles oRoles = new Roles();

            DataTable dt = oRoles.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<Roles>>(listaJson);

            return Lista;

        }


        [HttpGet]
        public Roles ListarPorId(int id)
        {
            Roles oRoles = new Roles();
            oRoles.IdRol = id;

            DataTable dt = oRoles.SelectId();

            var ListaJsom = JsonConvert.SerializeObject(dt);

            var obj = JsonConvert.DeserializeObject<List<Roles>>(ListaJsom).ToList().FirstOrDefault();

            return obj;

        }



        [HttpPost]
        public void Insertar([FromBody] Roles value)
        {
            Roles oRoles = new Roles();
            oRoles.NombreRol = value.NombreRol;

            oRoles.Insert();
        }



        [HttpPut]
        public void Modificar(int id, [FromBody] Roles value)
        {

            Roles oRoles = new Roles();
            oRoles.IdRol = id;
            oRoles.NombreRol = value.NombreRol;

            oRoles.Update();


        }


        [HttpDelete]
        public void Borrar(int id)
        {

            Roles oRoles = new Roles();
            oRoles.IdRol = id;

            oRoles.Delete();

        }
    }
}
