using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;


namespace WebApi_TrazODS
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Configuración y servicios de API web

            var cors = new EnableCorsAttribute("http://localhost:5173", "*", "GET,POST,PUT,DELETE");
            var corsProduction = new EnableCorsAttribute("https://gestiondeecotablas.netlify.app", "*", "GET,POST,PUT,DELETE");

            config.EnableCors(corsProduction);

            config.EnableCors(cors);

            // Rutas de API web
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
