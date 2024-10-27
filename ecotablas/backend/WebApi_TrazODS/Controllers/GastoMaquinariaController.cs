using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using WebApi_TrazODS.Models;
using Newtonsoft.Json;

namespace WebApi_TrazODS.Controllers
{
    public class GastoMaquinariaController : ApiController
    {
        [HttpGet]
        public List<GastoMaquinaria> GetAll()
        {
            GastoMaquinaria gasto = new GastoMaquinaria();
            DataTable dt = gasto.SelectAll();

            var json = JsonConvert.SerializeObject(dt);
            return JsonConvert.DeserializeObject<List<GastoMaquinaria>>(json);
        }

        [HttpPost]
        public IHttpActionResult Create([FromBody] GastoMaquinaria gasto)
        {
            gasto.Insert();
            return Ok("Gasto de maquinaria añadido correctamente.");
        }

        [HttpPut]
        public IHttpActionResult Update(int id, [FromBody] GastoMaquinaria gasto)
        {
            gasto.IdGastoMaquinaria = id;
            gasto.Update();
            return Ok("Gasto de maquinaria actualizado correctamente.");
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            GastoMaquinaria gasto = new GastoMaquinaria { IdGastoMaquinaria = id };
            gasto.Delete();
            return Ok("Gasto de maquinaria eliminado correctamente.");
        }
    }
}
