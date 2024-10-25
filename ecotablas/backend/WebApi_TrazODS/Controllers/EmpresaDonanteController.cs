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
            EmpresaDonante empresaDonante = new EmpresaDonante();
            DataTable dt = empresaDonante.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);
            var lista = JsonConvert.DeserializeObject<List<EmpresaDonante>>(listaJson);

            return lista;
        }


        // POST: api/EmpresaDonante
        [HttpPost]
        public void Insertar([FromBody] EmpresaDonante value)
        {
            EmpresaDonante empresaDonante = new EmpresaDonante
            {
                CUIT = value.CUIT,
                Nombre = value.Nombre,
                Direccion = value.Direccion,
                Telefono = value.Telefono,
                Email = value.Email,
                TipoPlastico = value.TipoPlastico,
                Rubro = value.Rubro,
                DonacionesDisponibles = value.DonacionesDisponibles,
                Web = value.Web
            };

            empresaDonante.Insert(empresaDonante);
        }

        // PUT: api/EmpresaDonante/{id}
        [HttpPut]
        public void Modificar(int id, [FromBody] EmpresaDonante value)
        {
            EmpresaDonante empresaDonante = new EmpresaDonante
            {
                IdEmpresaDonante = id,
                CUIT = value.CUIT,
                Nombre = value.Nombre,
                Direccion = value.Direccion,
                Telefono = value.Telefono,
                Email = value.Email,
                TipoPlastico = value.TipoPlastico,
                Rubro = value.Rubro,
                DonacionesDisponibles = value.DonacionesDisponibles,
                Web = value.Web
            };

            empresaDonante.Update(empresaDonante);
        }

        // DELETE: api/EmpresaDonante/{id}
        [HttpDelete]
        public void Borrar(int id)
        {
            EmpresaDonante empresaDonante = new EmpresaDonante();
            empresaDonante.Delete(id);
        }
    }
}
