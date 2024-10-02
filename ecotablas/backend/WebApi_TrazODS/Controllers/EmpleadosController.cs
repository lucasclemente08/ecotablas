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
    public class EmpleadosController : ApiController
    {
        
        // GET: api/Empleados
        [HttpGet]
        public List<Empleados> ListarTodo()
        {
            Empleados oEmpleado = new Empleados();

            DataTable dt = oEmpleado.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<Empleados>>(listaJson);

            return Lista;

        }


        [HttpGet]
        public Empleados ListarPorId(int id)
        {
            Empleados oEmpleado = new Empleados();
            oEmpleado.IdEmpleado = id;

            DataTable dt = oEmpleado.SelectId();

            var ListaJsom = JsonConvert.SerializeObject(dt);

            var obj = JsonConvert.DeserializeObject<List<Empleados>>(ListaJsom).ToList().FirstOrDefault();

            return obj;

        }



        [HttpPost]
        public void Insertar([FromBody] Empleados value)
        {
            Empleados oEmpleado = new Empleados();
            oEmpleado.Nombre = value.Nombre;
            oEmpleado.Apellido = value.Apellido;
            oEmpleado.DNI = value.DNI;
            oEmpleado.Calle = value.Calle;
            oEmpleado.Numero = value.Numero;
            oEmpleado.Piso = value.Piso;
            oEmpleado.Dpto = value.Dpto;
            oEmpleado.CodPostal = value.CodPostal;
            oEmpleado.IdLocalidad = value.IdLocalidad;
            oEmpleado.FechaIngreso = value.FechaIngreso;
            oEmpleado.Telefono = value.Telefono;
            oEmpleado.Mail = value.Mail;
            oEmpleado.IdArea = value.IdArea;

            oEmpleado.Insert();
        }



        [HttpPut]
        public void Modificar(int id, [FromBody] Empleados value)
        {

            Empleados oEmpleado = new Empleados();
            oEmpleado.IdEmpleado = id;
            oEmpleado.Nombre = value.Nombre;
            oEmpleado.Apellido = value.Apellido;
            oEmpleado.DNI = value.DNI;
            oEmpleado.Calle = value.Calle;
            oEmpleado.Numero = value.Numero;
            oEmpleado.Piso = value.Piso;
            oEmpleado.Dpto = value.Dpto;
            oEmpleado.CodPostal = value.CodPostal;
            oEmpleado.IdLocalidad = value.IdLocalidad;
            oEmpleado.FechaIngreso = value.FechaIngreso;
            oEmpleado.Telefono = value.Telefono;
            oEmpleado.Mail = value.Mail;
            oEmpleado.IdArea = value.IdArea;

            oEmpleado.Update();


        }


        [HttpDelete]
        public void Borrar(int id)
        {

            Empleados oEmpleado = new Empleados();
            oEmpleado.IdEmpleado = id;

            oEmpleado.Delete();

        }
    }
}
