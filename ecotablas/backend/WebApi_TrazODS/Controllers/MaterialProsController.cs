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
    public class MaterialProsController : ApiController
    {
        // GET: api/MaterialPros
        [HttpGet]
        public List<MaterialPros> ListarTodo()
        {
            MaterialPros oMaterialPros = new MaterialPros();

            DataTable dt = oMaterialPros.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<MaterialPros>>(listaJson);

            return Lista;

        }


        [HttpGet]
        public MaterialPros ListarPorId(int id)
        {
            MaterialPros oMaterialPros = new MaterialPros();
            oMaterialPros.IdMaterialProcesado = id;

            DataTable dt = oMaterialPros.SelectId();

            var ListaJsom = JsonConvert.SerializeObject(dt);

            var obj = JsonConvert.DeserializeObject<List<MaterialPros>>(ListaJsom).ToList().FirstOrDefault();

            return obj;

        }



        [HttpPost]
        public void Insertar([FromBody] MaterialPros value)
        {
            MaterialPros oMaterialPros = new MaterialPros();
            oMaterialPros.VolumenP = value.VolumenP;
            oMaterialPros.FechaIngresoP = value.FechaIngresoP;
            oMaterialPros.IdIngresoMaterial = value.IdIngresoMaterial;

            oMaterialPros.Insert();
        }



        [HttpPut]
        public void Modificar(int id, [FromBody] MaterialPros value)
        {

            MaterialPros oMaterialPros = new MaterialPros();
            oMaterialPros.IdMaterialProcesado = id;
            oMaterialPros.VolumenP = value.VolumenP;
            oMaterialPros.FechaIngresoP = value.FechaIngresoP;
            oMaterialPros.IdIngresoMaterial = value.IdIngresoMaterial;

            oMaterialPros.Update();


        }


        [HttpDelete]
        public void Borrar(int id)
        {

            MaterialPros oMaterialPros = new MaterialPros();
            oMaterialPros.IdMaterialProcesado = id;

            oMaterialPros.Delete();

        }
    }
}
