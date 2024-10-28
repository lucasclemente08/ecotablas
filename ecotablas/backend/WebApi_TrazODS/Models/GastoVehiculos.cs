using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace WebApi_TrazODS.Models
{
    public class GastoVehiculos
    {
        #region Atributos
        private readonly string connectionString;

        public GastoVehiculos()
        {
            connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        }
        #endregion

        #region Propiedades
        public int IdGasto { get; set; }
        public string TipoGasto { get; set; }
        public string TipoComprobante { get; set; }
        public int IdVehiculo { get; set; }
        public string Comprobante { get; set; }
        public string Proveedor { get; set; }
        public decimal Monto { get; set; }
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; }
        #endregion

        #region Métodos
        public DataTable SelectAll()
        {
            string sqlSentencia = "SP_ObtenerGastosVehiculos"; // Nombre del procedimiento almacenado
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

            return dataTable; // Retornar el DataTable con los gastos
        }

        public DataTable SelectById(int id)
        {
            string sqlSentencia = "GetGastoVehiculoById"; // Nombre del procedimiento almacenado
            DataTable dataTable = new DataTable();

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;
                        sqlCom.Parameters.AddWithValue("@IdGasto", id); // Añadir parámetro

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

        public void Insert(GastoVehiculos nuevoGasto)
        {
            string sqlSentencia = "InsertGastoVehiculo"; // Nombre del procedimiento almacenado

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;

                        // Añadir parámetros
                        sqlCom.Parameters.AddWithValue("@TipoGasto", nuevoGasto.TipoGasto);
                        sqlCom.Parameters.AddWithValue("@TipoComprobante", nuevoGasto.TipoComprobante);
                        sqlCom.Parameters.AddWithValue("@IdVehiculo", nuevoGasto.IdVehiculo);
                        sqlCom.Parameters.AddWithValue("@Comprobante", nuevoGasto.Comprobante);
                        sqlCom.Parameters.AddWithValue("@Proveedor", nuevoGasto.Proveedor);
                        sqlCom.Parameters.AddWithValue("@Monto", nuevoGasto.Monto);
                        sqlCom.Parameters.AddWithValue("@Fecha", nuevoGasto.Fecha);
                        sqlCom.Parameters.AddWithValue("@Descripcion", nuevoGasto.Descripcion);

                        sqlCom.ExecuteNonQuery(); // Ejecutar el comando
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }


        public void Update(GastoVehiculos gastoActualizado)
        {
            string sqlSentencia = "UpdateGastoVehiculo"; // Nombre del procedimiento almacenado

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;

                        // Añadir parámetros
                        sqlCom.Parameters.AddWithValue("@IdGasto", gastoActualizado.IdGasto);
                        sqlCom.Parameters.AddWithValue("@TipoGasto", gastoActualizado.TipoGasto);
                        sqlCom.Parameters.AddWithValue("@TipoComprobante", gastoActualizado.TipoComprobante);
                        sqlCom.Parameters.AddWithValue("@IdVehiculo", gastoActualizado.IdVehiculo);
                        sqlCom.Parameters.AddWithValue("@Comprobante", gastoActualizado.Comprobante);
                        sqlCom.Parameters.AddWithValue("@Proveedor", gastoActualizado.Proveedor);
                        sqlCom.Parameters.AddWithValue("@Monto", gastoActualizado.Monto);
                        sqlCom.Parameters.AddWithValue("@Fecha", gastoActualizado.Fecha);
                        sqlCom.Parameters.AddWithValue("@Descripcion", gastoActualizado.Descripcion);

                        sqlCom.ExecuteNonQuery(); // Ejecutar el comando
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        public void Delete(int id)
        {
            string sqlSentencia = "DeleteGastoVehiculo"; // Nombre del procedimiento almacenado

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;
                        sqlCom.Parameters.AddWithValue("@IdGasto", id); // Añadir parámetro
                        sqlCom.ExecuteNonQuery(); // Ejecutar el comando
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        public bool Exists(int id)
        {
            string sqlSentencia = "SP_ExisteGastoVehiculo"; // Nombre del procedimiento almacenado
            int count = 0;

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;
                        sqlCom.Parameters.AddWithValue("@IdGasto", id);

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
