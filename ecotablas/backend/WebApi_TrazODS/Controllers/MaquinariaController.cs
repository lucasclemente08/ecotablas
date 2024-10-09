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
    public class MaquinariaController : ApiController
    { 
        // GET: api/Maquinaria
        [HttpGet]
        public List<Maquinaria> ListarTodo()
        {
            Maquinaria oMaquinaria = new Maquinaria();
            DataTable dt = oMaquinaria.SelectAll();
            var listaJson = JsonConvert.SerializeObject(dt);
            var Lista = JsonConvert.DeserializeObject<List<Maquinaria>>(listaJson);
            return Lista;
        }

        // GET: api/Maquinaria/5
        [HttpGet]
        public Maquinaria ListarPorId(int id)
        {
            Maquinaria oMaquinaria = new Maquinaria();
            oMaquinaria.Id = id;

            DataTable dt = oMaquinaria.SelectId();

            var ListaJsom = JsonConvert.SerializeObject(dt);

            var obj = JsonConvert.DeserializeObject<List<Maquinaria>>(ListaJsom).ToList().FirstOrDefault();

            return obj;

        }

        // POST: api/Maquinaria
        [HttpPost]
        public void Insertar([FromBody] Maquinaria value)
        {
            Maquinaria oMaquinaria = new Maquinaria();
            oMaquinaria.Nombre = value.Nombre;
            oMaquinaria.Tipo = value.Tipo;
            oMaquinaria.Modelo = value.Modelo;
            oMaquinaria.IdEstado = value.IdEstado;
            oMaquinaria.fecha_adquisicion = value.fecha_adquisicion;

            oMaquinaria.Insert();

        }

        // PUT: api/Maquinaria/5
        [HttpPut]
        public void Modificar(int id, [FromBody] Maquinaria value)
        {
            Maquinaria oMaquinaria = new Maquinaria();
            oMaquinaria.Id = id;
            oMaquinaria.Nombre = value.Nombre;
            oMaquinaria.Tipo = value.Tipo;
            oMaquinaria.Modelo = value.Modelo;
            oMaquinaria.IdEstado = value.IdEstado;
            oMaquinaria.fecha_adquisicion = value.fecha_adquisicion;

            oMaquinaria.Update();
        }

        // DELETE: api/Maquinaria/5
        [HttpDelete]
        public void Borrar(int id)
        {
            Maquinaria maquinaria = new Maquinaria();
            maquinaria.Delete(id);
        }
        
        [HttpPut]
        public void CambiarEstado(int id, [FromBody] string nuevoEstado)
        {
            Maquinaria maquinaria = new Maquinaria();
            maquinaria.CambiarEstado(id, nuevoEstado);
        }
    }
}
