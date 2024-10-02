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
    public class UsuariosController : ApiController
    {
        // GET: api/Empleados
        [HttpGet]
        public List<Usuarios> ListarTodo()
        {
            Usuarios oUsuarios = new Usuarios();

            DataTable dt = oUsuarios.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<Usuarios>>(listaJson);

            return Lista;

        }

        
        [HttpGet]
        public Usuarios ListarPorId(int id)
        {
            Usuarios oUsuarios = new Usuarios();
            oUsuarios.IdUsuario = id;

            DataTable dt = oUsuarios.SelectId();

            var ListaJsom = JsonConvert.SerializeObject(dt);

            var obj = JsonConvert.DeserializeObject<List<Usuarios>>(ListaJsom).ToList().FirstOrDefault();

            return obj;

        }


        
       [HttpPost]
        public void Insertar([FromBody] Usuarios value)
        {
            Usuarios oUsuarios = new Usuarios();
            oUsuarios.NombreUsuario = value.NombreUsuario;
            oUsuarios.Contraseña = value.Contraseña;

            oUsuarios.Insert();
        }


        
        [HttpPut]
        public void Modificar(int id, [FromBody] Usuarios value)
        {

            Usuarios oUsuarios = new Usuarios();
            oUsuarios.IdUsuario = id;
            oUsuarios.NombreUsuario = value.NombreUsuario;
            oUsuarios.Contraseña = value.Contraseña;

            oUsuarios.Update();


        }


        [HttpDelete]
        public void Borrar(int id)
        {

            Usuarios oUsuarios = new Usuarios();
            oUsuarios.IdUsuario = id;
            
            oUsuarios.Delete();

        }
    }
}
