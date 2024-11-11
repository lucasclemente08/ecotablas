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
            var cors = new EnableCorsAttribute("*", "*", "GET,POST,PUT,DELETE");
            config.EnableCors(cors);
            ////una vez terminado el desarrolo pasar a esto
            //var cors = new EnableCorsAttribute("https://gestiondeecotablas.netlify.app", "*", "GET,POST,PUT,DELETE");
            //config.EnableCors(cors);
            // (por seguridad)
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
