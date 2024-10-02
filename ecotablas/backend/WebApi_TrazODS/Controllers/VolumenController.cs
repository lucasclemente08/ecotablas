using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using Newtonsoft.Json;
using WebApi_TrazODS.Models;

namespace WebApi_TrazODS.Controllers
{
    public class VolumenController : ApiController
    {
        // GET: api/Volumen
        [HttpGet]
        public Volumen ObtenerVolumen(DateTime? fechaInicio = null, DateTime? fechaFin = null)
        {
            Volumen oVolumen = new Volumen();

            DataTable dtClasificado = oVolumen.SelectVolumenesClasificado(fechaInicio, fechaFin);
            DataTable dtProcesado = oVolumen.SelectVolumenesProcesado(fechaInicio, fechaFin);
            DataTable dtTriturado = oVolumen.SelectVolumenesTriturado(fechaInicio, fechaFin);
            DataTable dtIngresoMaterial = oVolumen.SelectVolumenesIngresoMaterial(fechaInicio, fechaFin);

            var volumenClasificado = JsonConvert.DeserializeObject<List<Volumen>>(JsonConvert.SerializeObject(dtClasificado)).FirstOrDefault();
            var volumenProcesado = JsonConvert.DeserializeObject<List<Volumen>>(JsonConvert.SerializeObject(dtProcesado)).FirstOrDefault();
            var volumenTriturado = JsonConvert.DeserializeObject<List<Volumen>>(JsonConvert.SerializeObject(dtTriturado)).FirstOrDefault();
            var volumenIngresoMaterial = JsonConvert.DeserializeObject<List<Volumen>>(JsonConvert.SerializeObject(dtIngresoMaterial)).FirstOrDefault();

            Volumen resultado = new Volumen
            {
                VolumenUtil = volumenClasificado?.VolumenUtil ?? 0,
                VolumenInutil = volumenClasificado?.VolumenInutil ?? 0,
                VolumenProcesado = volumenProcesado?.VolumenProcesado ?? 0,
                VolumenTriturado = volumenTriturado?.VolumenTriturado ?? 0,
                VolumenIngresoMaterial = volumenIngresoMaterial?.VolumenIngresoMaterial ?? 0
            };

            return resultado;
        }
    }
}