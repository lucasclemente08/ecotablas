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
    public class IngresoMatController : ApiController
    {
        // GET: api/IngresoMat
        [HttpGet]
        public List<IngresoMat> ListarTodo()
        {
            IngresoMat oIngresoMat = new IngresoMat();

            DataTable dt = oIngresoMat.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<IngresoMat>>(listaJson);

            return Lista;

        }


        [HttpGet]
        public IngresoMat ListarPorId(int id)
        {
            IngresoMat oIngresoMat = new IngresoMat();
            oIngresoMat.IdIngresoMaterial = id;

            DataTable dt = oIngresoMat.SelectId();

            var ListaJsom = JsonConvert.SerializeObject(dt);

            var obj = JsonConvert.DeserializeObject<List<IngresoMat>>(ListaJsom).ToList().FirstOrDefault();

            return obj;

        }



        [HttpPost]
        public void Insertar([FromBody] IngresoMat value)
        {
            IngresoMat oIngresoMat = new IngresoMat();
            oIngresoMat.VolumenM = value.VolumenM;
            oIngresoMat.FechaIngresoM = value.FechaIngresoM;
            oIngresoMat.IdTipoPlastico = value.IdTipoPlastico;
            oIngresoMat.VolumenMInutil = value.VolumenMInutil;
            oIngresoMat.Estado = value.Estado;



            oIngresoMat.Insert();
        }



        [HttpPut]
        public void Modificar(int id, [FromBody] IngresoMat value)
        {

            IngresoMat oIngresoMat = new IngresoMat();
            oIngresoMat.IdIngresoMaterial = id;
            oIngresoMat.VolumenM = value.VolumenM;
            oIngresoMat.FechaIngresoM = value.FechaIngresoM;
            oIngresoMat.IdTipoPlastico = value.IdTipoPlastico;
            oIngresoMat.VolumenMInutil = value.VolumenMInutil;
            oIngresoMat.Estado = value.Estado;

            oIngresoMat.Update();


        }


        [HttpDelete]
        public void Borrar(int id)
        {

            IngresoMat oIngresoMat = new IngresoMat();
            oIngresoMat.IdIngresoMaterial = id;

            oIngresoMat.Delete();

        }
    }
}
