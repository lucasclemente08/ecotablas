using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json;
using WebApi_TrazODS.Models;

namespace WebApi_TrazODS.Controllers
{
    public class TolvaController : ApiController
    {
        // GET: api/Tolva
        // GET: api/Tolva
        [HttpGet]
        public List<Tolva> ListarTodo()
        public List<Tolva> ListarTodo()
        {
            Tolva oTolva = new Tolva();
            DataTable dt = oTolva.SelectAll();
            var listaJson = JsonConvert.SerializeObject(dt);
            var lista = JsonConvert.DeserializeObject<List<Tolva>>(listaJson);
            return lista; // Retornar la lista de tolvas
            Tolva oTolva = new Tolva();
            DataTable dt = oTolva.SelectAll();
            var listaJson = JsonConvert.SerializeObject(dt);
            var lista = JsonConvert.DeserializeObject<List<Tolva>>(listaJson);
            return lista; // Retornar la lista de tolvas
        }


        public void Insertar([FromBody] Tolva value)
        {
            Tolva oTolva = new Tolva();
            oTolva.IdMaterialTriturado = value.IdMaterialTriturado;
            oTolva.HorarioInicio = value.HorarioInicio;
            oTolva.CantidadCargada = value.CantidadCargada;
            oTolva.TipoPlastico = value.TipoPlastico;
            oTolva.Proporcion = value.Proporcion;
            oTolva.Especificaciones = value.Especificaciones;

            oTolva.Insert();
        }


        [HttpPut]
        public void Modificar(int id, [FromBody] Tolva value)
        public void Modificar(int id, [FromBody] Tolva value)
        {

            Tolva oTolva = new Tolva();
            oTolva.IdMaterialTriturado = value.IdMaterialTriturado;
            oTolva.HorarioInicio = value.HorarioInicio;
            oTolva.CantidadCargada = value.CantidadCargada;
            oTolva.TipoPlastico = value.TipoPlastico;
            oTolva.Proporcion = value.Proporcion;
            oTolva.Especificaciones = value.Especificaciones;

            oTolva.Update();


        }

        [HttpDelete]
        public void Delete(int id)
        public void Delete(int id)
        {
            Tolva oTolva = new Tolva();

            oTolva.IdTolva = id;
            Tolva oTolva = new Tolva();

            oTolva.IdTolva = id;

            oTolva.Delete();

            oTolva.Delete();

        }




    }


}
