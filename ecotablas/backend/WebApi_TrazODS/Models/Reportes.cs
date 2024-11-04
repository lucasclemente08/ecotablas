
using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
namespace WebApi_TrazODS.Models
{
    public class Reportes
    {
        #region Atributos
        private readonly string connectionString;

        // Constructor que obtiene la cadena de conexión desde una variable de entorno
        public Reportes()
        {
            connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

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

        #region Métodos
        public DataTable SelectAll()
        {
            string sqlSentencia = "SP_ObtenerReportes"; // Nombre del procedimiento almacenado
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
                            da.Fill(dataTable); // Llenar el DataTable con los resultados
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message); // Manejo de excepciones
                }
            }

            return dataTable; // Retornar el DataTable con los reportes
        }
        public DataTable SelectById(int id)
        {
            string sqlSentencia = "SP_ObtenerReportePorId"; // Nombre del procedimiento almacenado
            DataTable dataTable = new DataTable();

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;
                        sqlCom.Parameters.AddWithValue("@Id_reporte", id); // Añadir parámetro

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

        // Método para insertar un nuevo reporte
        public void Insert(Reportes nuevoReporte)
        {
            string sqlSentencia = "SP_InsertarReporte"; // Nombre del procedimiento almacenado

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;

                        // Añadir parámetros
                        sqlCom.Parameters.AddWithValue("@Titulo", nuevoReporte.Titulo);
                        sqlCom.Parameters.AddWithValue("@Descripcion", nuevoReporte.Descripcion);
                        sqlCom.Parameters.AddWithValue("@Area", nuevoReporte.Area);
                        sqlCom.Parameters.AddWithValue("@FechaIncidente", nuevoReporte.FechaIncidente);
                        sqlCom.Parameters.AddWithValue("@Estado", nuevoReporte.Estado);

                        sqlCom.ExecuteNonQuery(); // Ejecutar el comando
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        // Método para actualizar un reporte
        public void Update(Reportes reporteActualizado)
        {
            string sqlSentencia = "SP_ActualizarReporte"; // Nombre del procedimiento almacenado

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;

                        // Añadir parámetros
                        sqlCom.Parameters.AddWithValue("@Id_reporte", reporteActualizado.Id_reporte);
                        sqlCom.Parameters.AddWithValue("@Titulo", reporteActualizado.Titulo);
                        sqlCom.Parameters.AddWithValue("@Descripcion", reporteActualizado.Descripcion);
                        sqlCom.Parameters.AddWithValue("@Area", reporteActualizado.Area);
                        sqlCom.Parameters.AddWithValue("@FechaIncidente", reporteActualizado.FechaIncidente);
                        sqlCom.Parameters.AddWithValue("@Estado", reporteActualizado.Estado);

                        sqlCom.ExecuteNonQuery(); // Ejecutar el comando
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        // Método para eliminar un reporte
        public void Delete(int id)
        {
            string sqlSentencia = "SP_EliminarReporte"; // Nombre del procedimiento almacenado

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;
                        sqlCom.Parameters.AddWithValue("@Id_reporte", id); // Añadir parámetro
                        sqlCom.ExecuteNonQuery(); // Ejecutar el comando
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        // Método para verificar si existe un reporte
        public bool Exists(int id)
        {
            string sqlSentencia = "SP_ExisteReporte"; // Nombre del procedimiento almacenado
            int count = 0;

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;
                        sqlCom.Parameters.AddWithValue("@Id_reporte", id);

                        count = (int)sqlCom.ExecuteScalar(); // Obtener el conteo
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }

            return count > 0; // Retornar true si existe
        }

        #endregion
    }
}