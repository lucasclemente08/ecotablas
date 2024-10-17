using System;
using System.Data;
using System.Data.SqlClient;

namespace WebApi_TrazODS.Models
{
    public class Volumen
    {
        string connectionString = @"Data Source=Ecotablas-Db.mssql.somee.com;Initial Catalog=Ecotablas-Db;User ID=lucasclemente08_SQLLogin_1;Password=apqjzszydf";

        public int? VolumenUtil { get; set; }
        public int? VolumenInutil { get; set; }
        public int? VolumenProcesado { get; set; }
        public int? VolumenPInutil { get; set; }
        public int? VolumenTriturado { get; set; }
        public int? VolumenTInutil { get; set; }
        public int? VolumenIngresoMaterial { get; set; }
        public int? VolumenMInutil { get; set; }

        // Volúmenes de Material Clasificado sin filtro de fecha
        public DataTable SelectVolumenesClasificado(DateTime? fechaInicio = null, DateTime? fechaFin = null)
        {
            string sqlQuery = "SELECT SUM(VolumenUtil) AS VolumenUtil, SUM(VolumenInutil) AS VolumenInutil FROM MaterialClasificado";

            if (fechaInicio.HasValue && fechaFin.HasValue)
            {
                sqlQuery += " WHERE FechaC BETWEEN @FechaInicio AND @FechaFin";
            }

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                using (SqlCommand sqlCom = new SqlCommand(sqlQuery, sqlCnn))
                {
                    if (fechaInicio.HasValue && fechaFin.HasValue)
                    {
                        sqlCom.Parameters.AddWithValue("@FechaInicio", fechaInicio.Value);
                        sqlCom.Parameters.AddWithValue("@FechaFin", fechaFin.Value);
                    }

                    using (SqlDataAdapter da = new SqlDataAdapter(sqlCom))
                    {
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        return dt;
                    }
                }
            }
        }

        // Volúmenes de Material Procesado con filtro por fecha
        public DataTable SelectVolumenesProcesado(DateTime? fechaInicio = null, DateTime? fechaFin = null)
        {
            string sqlQuery = "SELECT SUM(VolumenP) AS VolumenProcesado, SUM(VolumenPInutil) AS VolumenPInutil FROM MaterialProcesado";

            if (fechaInicio.HasValue && fechaFin.HasValue)
            {
                sqlQuery += " WHERE FechaIngresoP BETWEEN @FechaInicio AND @FechaFin";
            }

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                using (SqlCommand sqlCom = new SqlCommand(sqlQuery, sqlCnn))
                {
                    if (fechaInicio.HasValue && fechaFin.HasValue)
                    {
                        sqlCom.Parameters.AddWithValue("@FechaInicio", fechaInicio.Value);
                        sqlCom.Parameters.AddWithValue("@FechaFin", fechaFin.Value);
                    }

                    using (SqlDataAdapter da = new SqlDataAdapter(sqlCom))
                    {
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        return dt;
                    }
                }
            }
        }

        // Volúmenes de Material Triturado con filtro por fecha
        public DataTable SelectVolumenesTriturado(DateTime? fechaInicio = null, DateTime? fechaFin = null)
        {
            string sqlQuery = "SELECT SUM(VolumenT) AS VolumenTriturado, SUM(VolumenTInutil) AS VolumenTInutil FROM MaterialTriturado";

            if (fechaInicio.HasValue && fechaFin.HasValue)
            {
                sqlQuery += " WHERE Fecha BETWEEN @FechaInicio AND @FechaFin";
            }

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                using (SqlCommand sqlCom = new SqlCommand(sqlQuery, sqlCnn))
                {
                    if (fechaInicio.HasValue && fechaFin.HasValue)
                    {
                        sqlCom.Parameters.AddWithValue("@FechaInicio", fechaInicio.Value);
                        sqlCom.Parameters.AddWithValue("@FechaFin", fechaFin.Value);
                    }

                    using (SqlDataAdapter da = new SqlDataAdapter(sqlCom))
                    {
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        return dt;
                    }
                }
            }
        }

        // Volúmenes de Ingreso Material con filtro por fecha
        public DataTable SelectVolumenesIngresoMaterial(DateTime? fechaInicio = null, DateTime? fechaFin = null)
        {
            string sqlQuery = "SELECT SUM(VolumenM) AS VolumenIngresoMaterial, SUM(VolumenMInutil) AS VolumenMInutil FROM IngresoMaterial";

            if (fechaInicio.HasValue && fechaFin.HasValue)
            {
                sqlQuery += " WHERE FechaIngresoM BETWEEN @FechaInicio AND @FechaFin";
            }

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                using (SqlCommand sqlCom = new SqlCommand(sqlQuery, sqlCnn))
                {
                    if (fechaInicio.HasValue && fechaFin.HasValue)
                    {
                        sqlCom.Parameters.AddWithValue("@FechaInicio", fechaInicio.Value);
                        sqlCom.Parameters.AddWithValue("@FechaFin", fechaFin.Value);
                    }

                    using (SqlDataAdapter da = new SqlDataAdapter(sqlCom))
                    {
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        return dt;
                    }
                }
            }
        }
    }
}