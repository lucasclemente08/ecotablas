﻿using System.Web;
using System.Web.Mvc;

namespace WebApi_TrazODS
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
