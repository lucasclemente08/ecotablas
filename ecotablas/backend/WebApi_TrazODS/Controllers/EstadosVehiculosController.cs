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
    public class EstadosVehiculosController : ApiController
    {
        // GET: api/EstadosVehiculos
        [HttpGet]
        public List<EstadosVehiculos> ListarTodo()
        {
            EstadosVehiculos oEstadosVehiculos = new EstadosVehiculos();

            DataTable dt = oEstadosVehiculos.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<EstadosVehiculos>>(listaJson);

            return Lista;

        }

    }
}
