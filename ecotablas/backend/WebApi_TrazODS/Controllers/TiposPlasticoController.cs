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
    public class TiposPlasticoController : ApiController
    {
        // GET: api/TiposPlastico
        [HttpGet]
        public List<TiposPlastico> ListarTodo()
        {
            TiposPlastico oTiposPlastico = new TiposPlastico();

            DataTable dt = oTiposPlastico.SelectAll();

            var listaJson = JsonConvert.SerializeObject(dt);

            var Lista = JsonConvert.DeserializeObject<List<TiposPlastico>>(listaJson);

            return Lista;

        }


        [HttpGet]
        public TiposPlastico ListarPorId(int id)
        {
            TiposPlastico oTiposPlastico = new TiposPlastico();
            oTiposPlastico.IdTipoPlastico = id;

            DataTable dt = oTiposPlastico.SelectId();

            var ListaJsom = JsonConvert.SerializeObject(dt);

            var obj = JsonConvert.DeserializeObject<List<TiposPlastico>>(ListaJsom).ToList().FirstOrDefault();

            return obj;

        }



        [HttpPost]
        public void Insertar([FromBody] TiposPlastico value)
        {
            TiposPlastico oTiposPlastico = new TiposPlastico();
            oTiposPlastico.TipoPlastico = value.TipoPlastico;

            oTiposPlastico.Insert();
        }



        [HttpPut]
        public void Modificar(int id, [FromBody] TiposPlastico value)
        {

            TiposPlastico oTiposPlastico = new TiposPlastico();
            oTiposPlastico.IdTipoPlastico = id;
            oTiposPlastico.TipoPlastico = value.TipoPlastico;

            oTiposPlastico.Update();


        }


        [HttpDelete]
        public void Borrar(int id)
        {

            TiposPlastico oTiposPlastico = new TiposPlastico();
            oTiposPlastico.IdTipoPlastico = id;

            oTiposPlastico.Delete();

        }
    }
}
