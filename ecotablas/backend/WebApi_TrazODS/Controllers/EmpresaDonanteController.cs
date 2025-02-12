using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using WebApi_TrazODS.Models;

namespace WebApi_TrazODS.Controllers
{
    public class EmpresaDonanteController : ApiController
    {
        // GET: api/EmpresaDonante
        [HttpGet]
        public List<EmpresaDonante> ListarTodo()
        {
            EmpresaDonante oEmpresaDonante = new EmpresaDonante();
            DataTable dt = oEmpresaDonante.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);
            var lista = JsonConvert.DeserializeObject<List<EmpresaDonante>>(listaJson);

            return lista;
        }


        // POST: api/EmpresaDonante
        [HttpPost]
        public void Insertar([FromBody] EmpresaDonante value)
        {
            EmpresaDonante oEmpresaDonante = new EmpresaDonante();
            oEmpresaDonante.CUIT = value.CUIT;
            oEmpresaDonante.Nombre = value.Nombre;
            oEmpresaDonante.Direccion = value.Direccion;
            oEmpresaDonante.Telefono = value.Telefono;
            oEmpresaDonante.Email = value.Email;
            oEmpresaDonante.TipoPlastico = value.TipoPlastico;
            oEmpresaDonante.Rubro = value.Rubro;
            oEmpresaDonante.DonacionesDisponibles = value.DonacionesDisponibles;
            oEmpresaDonante.Web = value.Web;


            oEmpresaDonante.Insert();
        }

        // PUT: api/EmpresaDonante/{id}
        [HttpPut]
        public void Modificar(int id, [FromBody] EmpresaDonante value)
        {
            EmpresaDonante oEmpresaDonante = new EmpresaDonante();
                oEmpresaDonante.Id_empresaDonante = id;
                oEmpresaDonante.CUIT = value.CUIT;
                oEmpresaDonante.Nombre = value.Nombre;
                oEmpresaDonante.Direccion = value.Direccion;
                oEmpresaDonante.Telefono = value.Telefono;
                oEmpresaDonante.Email = value.Email;
                oEmpresaDonante.TipoPlastico = value.TipoPlastico;
                oEmpresaDonante.Rubro = value.Rubro;
                oEmpresaDonante.DonacionesDisponibles = value.DonacionesDisponibles;
                oEmpresaDonante.Web = value.Web;

            oEmpresaDonante.Update();
        }

        // DELETE: api/EmpresaDonante/{id}
        [HttpDelete]
        public void Borrar(int id)
        {
            EmpresaDonante empresaDonante = new EmpresaDonante();
            empresaDonante.Id_empresaDonante = id;
            empresaDonante.Delete(id);
        }
    }
}
