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
    public class MaterialClasController : ApiController
    {
        // GET: api/MaterialClas
        [HttpGet]
        public List<MaterialClas> ListarTodo()
        {
            MaterialClas oMaterialClas = new MaterialClas();

            DataTable dt = oMaterialClas.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<MaterialClas>>(listaJson);

            return Lista;

        }


        [HttpGet]
        public MaterialClas ListarPorId(int id)
        {
            MaterialClas oMaterialClas = new MaterialClas();
            oMaterialClas.IdMaterialClasificado = id;

            DataTable dt = oMaterialClas.SelectId();

            var ListaJsom = JsonConvert.SerializeObject(dt);

            var obj = JsonConvert.DeserializeObject<List<MaterialClas>>(ListaJsom).ToList().FirstOrDefault();

            return obj;

        }



        [HttpPost]
        public void Insertar([FromBody] MaterialClas value)
        {
            MaterialClas oMaterialClas = new MaterialClas();
            oMaterialClas.VolumenUtil = value.VolumenUtil;
            oMaterialClas.VolumenInutil = value.VolumenInutil;
            oMaterialClas.IdMaterialProcesado = value.IdMaterialProcesado;
            oMaterialClas.FechaC = value.FechaC;


            oMaterialClas.Insert();
        }



        [HttpPut]
        public void Modificar(int id, [FromBody] MaterialClas value)
        {

            MaterialClas oMaterialClas = new MaterialClas();
            oMaterialClas.IdMaterialClasificado = id;
            oMaterialClas.VolumenUtil = value.VolumenUtil;
            oMaterialClas.VolumenInutil = value.VolumenInutil;
            oMaterialClas.IdMaterialProcesado = value.IdMaterialProcesado;
            oMaterialClas.FechaC = value.FechaC;

            oMaterialClas.Update();


        }


        [HttpDelete]
        public void Borrar(int id)
        {

            MaterialClas oMaterialClas = new MaterialClas();
            oMaterialClas.IdMaterialClasificado = id;

            oMaterialClas.Delete();

        }
    }
}
