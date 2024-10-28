using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using System.Data;
using WebApi_TrazODS.Models;
using Newtonsoft.Json;
using WebApi_TrazODS.Models.WebApi_TrazODS.Models;

namespace WebApi_TrazODS.Controllers
{
    public class VehiculosController : ApiController
    {
        // GET: api/Vehiculos
        [HttpGet]
        public List<Vehiculos> ListarTodo()
        {
            Vehiculos oVehiculos = new Vehiculos();

            DataTable dt = oVehiculos.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<Vehiculos>>(listaJson);

            return Lista;

        }

        // GET: api/Vehiculos/5
        [HttpGet]
        public Vehiculos ListarPorId(int id)
        {
            Vehiculos oVehiculos = new Vehiculos();
            oVehiculos.IdVehiculo = id;

            DataTable dt = oVehiculos.SelectId();

            var ListaJsom = JsonConvert.SerializeObject(dt);

            var obj = JsonConvert.DeserializeObject<List<Vehiculos>>(ListaJsom).ToList().FirstOrDefault();

            return obj;
        }

        // POST: api/Vehiculos
        [HttpPost]
        public void Insertar([FromBody] Vehiculos value)
        {
            Vehiculos oVehiculos = new Vehiculos();
            oVehiculos.Marca = value.Marca;
            oVehiculos.Modelo = value.Modelo;
            oVehiculos.Año = value.Año;
            oVehiculos.Color = value.Color;
            oVehiculos.Tipo = value.Tipo;

            oVehiculos.Insert();
        }

        // PUT: api/Vehiculos/5
        [HttpPut]
        public void Modificar(int id, [FromBody] Vehiculos value)
        {
            Vehiculos oVehiculos = new Vehiculos();
            oVehiculos.IdVehiculo = id;
            oVehiculos.Marca = value.Marca;
            oVehiculos.Modelo = value.Modelo;
            oVehiculos.Año = value.Año;
            oVehiculos.Color = value.Color;
            oVehiculos.Tipo = value.Tipo;

            oVehiculos.Update();
        }

        // DELETE: api/Vehiculos/5
        [HttpDelete]
        public void Delete(int id)
        {
            Vehiculos oVehiculos = new Vehiculos();
            oVehiculos.IdVehiculo = id;

            oVehiculos.Delete();
        }
    }
}
