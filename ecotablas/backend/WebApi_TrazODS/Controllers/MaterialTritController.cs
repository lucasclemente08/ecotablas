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
    public class MaterialTritController : ApiController
    {
        // GET: api/MaterialTrit
        [HttpGet]
        public List<MaterialTrit> ListarTodo()
        {
            MaterialTrit oMaterialTrit = new MaterialTrit();

            DataTable dt = oMaterialTrit.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<MaterialTrit>>(listaJson);

            return Lista;

        }


        [HttpGet]
        public MaterialTrit ListarPorId(int id)
        {
            MaterialTrit oMaterialTrit = new MaterialTrit();
            oMaterialTrit.IdMaterialTriturado = id;

            DataTable dt = oMaterialTrit.SelectId();

            var ListaJsom = JsonConvert.SerializeObject(dt);

            var obj = JsonConvert.DeserializeObject<List<MaterialTrit>>(ListaJsom).ToList().FirstOrDefault();

            return obj;

        }



        [HttpPost]
        public void Insertar([FromBody] MaterialTrit value)
        {
            MaterialTrit oMaterialTrit = new MaterialTrit();
            oMaterialTrit.VolumenT = value.VolumenT;
            oMaterialTrit.Fecha = value.Fecha;
            oMaterialTrit.IdMaterialClasificado = value.IdMaterialClasificado;

            oMaterialTrit.Insert();
        }



        [HttpPut]
        public void Modificar(int id, [FromBody] MaterialTrit value)
        {

            MaterialTrit oMaterialTrit = new MaterialTrit();
            oMaterialTrit.IdMaterialTriturado = id;
            oMaterialTrit.VolumenT = value.VolumenT;
            oMaterialTrit.Fecha = value.Fecha;
            oMaterialTrit.IdMaterialClasificado = value.IdMaterialClasificado;

            oMaterialTrit.Update();


        }


        [HttpDelete]
        public void Borrar(int id)
        {

            MaterialTrit oMaterialTrit = new MaterialTrit();
            oMaterialTrit.IdMaterialTriturado = id;

            oMaterialTrit.Delete();

        }
    }
}
