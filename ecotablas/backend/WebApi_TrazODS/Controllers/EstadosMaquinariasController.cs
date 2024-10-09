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
    public class EstadosMaquinariasController : ApiController
    {
        // GET: api/EstadosMaquinaria
        [HttpGet]
        public List<EstadosMaquinarias> ListarTodo()
        {
            EstadosMaquinarias oEstadosMaquinarias = new EstadosMaquinarias();

            DataTable dt = oEstadosMaquinarias.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<EstadosMaquinarias>>(listaJson);

            return Lista;

        }

    }
}
