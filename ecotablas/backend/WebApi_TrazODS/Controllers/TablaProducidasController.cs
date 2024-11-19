using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi_TrazODS.Models;
using Newtonsoft.Json;

namespace WebApi_TrazODS.Controllers
{
    public class TablaProducidasController : ApiController
    {
        private readonly TablasProducidas _tablasProducidas;

        // Constructor
        public TablaProducidasController()
        {
            _tablasProducidas = new TablasProducidas(); // Inicializar la clase que maneja la lógica de negocio
        }

        // GET: api/TablasProducidas
        [HttpGet]
        public List<TablasProducidas> ListarTodo()
        {
            DataTable dt = _tablasProducidas.SelectAll();

            // Serializar DataTable a JSON y luego deserializar a lista de objetos
            var listaJson = JsonConvert.SerializeObject(dt);
            var lista = JsonConvert.DeserializeObject<List<TablasProducidas>>(listaJson);

            return lista;
        }

        // GET: api/TablasProducidas/5
        [HttpGet]
        public TablasProducidas ListarPorId(int id)
        {
            _tablasProducidas.ID_Tabla = id;

            DataTable dt = _tablasProducidas.SelectById(id);

            // Serializar DataTable a JSON y luego deserializar a objeto
            var listaJson = JsonConvert.SerializeObject(dt);
            var obj = JsonConvert.DeserializeObject<List<TablasProducidas>>(listaJson).FirstOrDefault();

            return obj;
        }

        // POST: api/TablasProducidas
        [HttpPost]
        public void Insertar([FromBody] TablasProducidas nuevaTabla)
        {
            _tablasProducidas.IdTolva = nuevaTabla.IdTolva;
            _tablasProducidas.FechaProduccion = nuevaTabla.FechaProduccion;
            _tablasProducidas.Dimensiones = nuevaTabla.Dimensiones;
            _tablasProducidas.Peso = nuevaTabla.Peso;
            _tablasProducidas.CodigoIdentificacion = nuevaTabla.CodigoIdentificacion;
            _tablasProducidas.Estado = nuevaTabla.Estado;

            _tablasProducidas.Insert();
        }

        // PUT: api/TablasProducidas/5
        [HttpPut]
        public void Modificar(int id, [FromBody] TablasProducidas tablaActualizada)
        {
            _tablasProducidas.ID_Tabla = id;
            _tablasProducidas.IdTolva = tablaActualizada.IdTolva;
            _tablasProducidas.FechaProduccion = tablaActualizada.FechaProduccion;
            _tablasProducidas.Dimensiones = tablaActualizada.Dimensiones;
            _tablasProducidas.Peso = tablaActualizada.Peso;
            _tablasProducidas.CodigoIdentificacion = tablaActualizada.CodigoIdentificacion;
            _tablasProducidas.Estado = tablaActualizada.Estado;

            _tablasProducidas.Update();
        }

        // DELETE: api/TablasProducidas/5
        [HttpDelete]
        public void Borrar(int id)
        {
            _tablasProducidas.ID_Tabla = id;

            _tablasProducidas.Delete();
        }
    }
}
