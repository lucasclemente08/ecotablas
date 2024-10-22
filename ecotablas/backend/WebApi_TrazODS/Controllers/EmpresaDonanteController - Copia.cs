using System;
using System.Collections.Generic;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi_TrazODS.Models;

namespace WebApi_TrazODS.Controllers
{
    public class EmpresasDonantesController : ApiController
    {
        private readonly EmpresaDonante _empresasDonantes;

        public EmpresasDonantesController()
        {
            _empresasDonantes = new EmpresaDonante(); // Inicializar la clase del modelo
        }

        // GET: api/empresasdonantes
        [HttpGet]
        public IHttpActionResult ListarTodo()
        {
            DataTable dt = _empresasDonantes.SelectAll();

            if (dt.Rows.Count == 0)
            {
                return NotFound(); // Si no hay empresas donantes, devuelve 404
            }

            var listaEmpresasDonantes = new List<EmpresaDonante>();
            foreach (DataRow row in dt.Rows)
            {
                listaEmpresasDonantes.Add(new EmpresaDonante
                {
                    Id_empresaDonante = Convert.ToInt32(row["Id_empresaDonante"]),
                    CUIT = row["CUIT"].ToString(), // Cambié a CUIT
                    Nombre = row["Nombre"].ToString(),
                    Direccion = row["Direccion"].ToString(),
                    Telefono = row["Telefono"].ToString(),
                    Email = row["Email"].ToString(),
                    TipoPlastico = row["TipoPlastico"].ToString(), // Añadido según la clase
                    Rubro = row["Rubro"].ToString(), // Añadido según la clase
                    DonacionesDisponibles = row["DonacionesDisponibles"].ToString(), // Añadido según la clase
                    Web = row["Web"].ToString() // Añadido según la clase
                });
            }

            return Ok(listaEmpresasDonantes); // Devuelve la lista de empresas donantes
        }

        // GET: api/empresasdonantes/{id}
        [HttpGet]
        [Route("api/empresasdonantes/{id:int}")]
        public IHttpActionResult ObtenerEmpresaDonante(int id)
        {
            DataTable dt = _empresasDonantes.SelectById(id);

            if (dt.Rows.Count == 0)
            {
                return NotFound(); // Si no se encuentra la empresa, devuelve 404
            }

            DataRow row = dt.Rows[0];
            var empresaDonante = new EmpresaDonante
            {
                Id_empresaDonante = Convert.ToInt32(row["Id_empresaDonante"]),
                CUIT = row["CUIT"].ToString(), // Cambié a CUIT
                Nombre = row["Nombre"].ToString(),
                Direccion = row["Direccion"].ToString(),
                Telefono = row["Telefono"].ToString(),
                Email = row["Email"].ToString(),
                TipoPlastico = row["TipoPlastico"].ToString(), // Añadido según la clase
                Rubro = row["Rubro"].ToString(), // Añadido según la clase
                DonacionesDisponibles = row["DonacionesDisponibles"].ToString(), // Añadido según la clase
                Web = row["Web"].ToString() // Añadido según la clase
            };

            return Ok(empresaDonante); // Devuelve la empresa donante encontrada
        }

        // POST: api/empresasdonantes
        [HttpPost]
        public IHttpActionResult CrearEmpresaDonante([FromBody] EmpresaDonante nuevaEmpresa)
        {
            if (nuevaEmpresa == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState); // Manejo de errores de modelo
            }

            // Lógica para agregar la nueva empresa donante a la base de datos
            _empresasDonantes.Insert(nuevaEmpresa);

            return CreatedAtRoute("DefaultApi", new { id = nuevaEmpresa.Id_empresaDonante }, nuevaEmpresa); // Devuelve 201 Created
        }

        // PUT: api/empresasdonantes/{id}
        [HttpPut]
        [Route("api/empresasdonantes/{id:int}")]
        public IHttpActionResult ActualizarEmpresaDonante(int id, [FromBody] EmpresaDonante empresaActualizada)
        {
            if (empresaActualizada == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState); // Manejo de errores de modelo
            }

            // Aquí se asume que debes tener un método Exists() en tu modelo para verificar si la empresa existe
            if (!_empresasDonantes.Exists(id))
            {
                return NotFound(); // Si no se encuentra la empresa, devuelve 404
            }

            empresaActualizada.Id_empresaDonante = id;
            _empresasDonantes.Update(empresaActualizada);

            return StatusCode(HttpStatusCode.NoContent); // Devuelve 204 No Content
        }

        // DELETE: api/empresasdonantes/{id}
        [HttpDelete]
        [Route("api/empresasdonantes/{id:int}")]
        public IHttpActionResult EliminarEmpresaDonante(int id)
        {
            // Aquí se asume que debes tener un método Exists() en tu modelo para verificar si la empresa existe
            if (!_empresasDonantes.Exists(id))
            {
                return NotFound(); // Si no se encuentra la empresa, devuelve 404
            }

            _empresasDonantes.Delete(id);
            return StatusCode(HttpStatusCode.NoContent); // Devuelve 204 No Content
        }
    }
}
