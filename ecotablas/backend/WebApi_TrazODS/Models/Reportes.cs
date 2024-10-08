using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace WebApi_TrazODS.Models
{
    public class Reportes
    {
        #region Atributos
        private readonly string connectionString;

        public Reportes(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        #endregion

        #region Propiedades
        public int Id_reporte { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string Area { get; set; }
        public DateTime FechaIncidente { get; set; }
        public DateTime FechaReporte { get; set; } = DateTime.Now;
        public string Estado { get; set; } = "Pendiente";
        #endregion

        #region Metodos
        public DataTable SelectAll()
        {
            string sqlSentencia = "SP_ObtenerReportes";
            DataTable dataTable = new DataTable();

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(sqlCom))
                        {
                            da.Fill(dataTable);
                        }
                    }
                }
                catch (Exception ex)
                {
         
                    Console.WriteLine(ex.Message); 
                }
            }

            return dataTable; 
        }
        #endregion
    }
}
