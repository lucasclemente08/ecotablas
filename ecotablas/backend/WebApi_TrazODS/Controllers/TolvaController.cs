using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using WebApi_TrazODS.Models;

namespace WebApi_TrazODS.Controllers
{
    public class TolvaController : ApiController
    {
        // GET: api/Tolva
        [HttpGet]
        public List<Tolva> ListarTodo()
        {
            Tolva oTolva = new Tolva();
            DataTable dt = oTolva.SelectAll();
            var listaJson = JsonConvert.SerializeObject(dt);
            var lista = JsonConvert.DeserializeObject<List<Tolva>>(listaJson);
            return lista; // Retornar la lista de tolvas
        }

        // GET: api/Tolva/{id}
        //[HttpGet]
        //public Tolva ListarPorId(int id)
        //{
        //    Tolva oTolva = new Tolva();
        //    oTolva.IdTolva = id; // Establecer el IdTolva

        //    DataTable dt = oTolva.SelectId(); // Llamar al método que selecciona por ID

        //    var listaJson = JsonConvert.SerializeObject(dt);
        //    var obj = JsonConvert.DeserializeObject<List<Tolva>>(listaJson).FirstOrDefault();

        //    return obj; // Retornar una tolva específica por ID
        //}

        // POST: api/Tolva
        [HttpPost]
        public void Insertar([FromBody] Tolva value)
        {
            Tolva oTolva = new Tolva
            {
                IdTriturado = value.IdTriturado,
                HorarioInicio = value.HorarioInicio,
                CantidadCargada = value.CantidadCargada,
                TipoPlastico = value.TipoPlastico,
                Proporcion = value.Proporcion,
                Especificaciones = value.Especificaciones
            };

            oTolva.Insert(); // Llamar al método Insertar de la clase Tolva
        }

        // PUT: api/Tolva/{id}
        [HttpPut]
        public void Modificar(int id, [FromBody] Tolva value)
        {
            Tolva oTolva = new Tolva
            {
                IdTolva = id,
                IdTriturado = value.IdTriturado,
                HorarioInicio = value.HorarioInicio,
                CantidadCargada = value.CantidadCargada,
                TipoPlastico = value.TipoPlastico,
                Proporcion = value.Proporcion,
                Especificaciones = value.Especificaciones
            };

            oTolva.Update(); // Llamar al método Modificar (Update)
        }

        // DELETE: api/Tolva/{id}
        [HttpDelete]
        public void Borrar(int id)
        {
            Tolva oTolva = new Tolva();
      
            oTolva.Delete(id); 
        }
    }
}
