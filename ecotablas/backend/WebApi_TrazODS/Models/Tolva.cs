using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace WebApi_TrazODS.Models
{
    public class Tolva
    {
        #region Atributos
        private readonly string connectionString;

        public Tolva()
        {
            connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        }
        #endregion

        #region Propiedades
        public int IdTolva { get; set; } // Identificador único para la tolva
        public int IdTriturado { get; set; } // Identificador del triturado asociado
        public DateTime HorarioInicio { get; set; } // Hora de inicio
        public decimal CantidadCargada { get; set; } // Cantidad de plástico cargado
        public string TipoPlastico { get; set; } // Tipo de plástico
        public string Proporcion { get; set; } // Proporción de mezcla o uso
        public string Especificaciones { get; set; } // Especificaciones adicionales
        #endregion

        #region Métodos
        public DataTable SelectAll()
        {
            string sqlSentencia = "sp_GetAllTolva"; // Nombre del procedimiento almacenado
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

            return dataTable; // Retornar el DataTable con las tolvas
        }

        public void Insert(Tolva nuevaTolva)
        {
            string sqlSentencia = "sp_InsertTolva"; // Nombre del procedimiento almacenado

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;

                        // Añadir parámetros
                        sqlCom.Parameters.AddWithValue("@id_triturado", nuevaTolva.IdTriturado);
                        sqlCom.Parameters.AddWithValue("@horario_inicio", nuevaTolva.HorarioInicio);
                        sqlCom.Parameters.AddWithValue("@cantidad_cargada", nuevaTolva.CantidadCargada);
                        sqlCom.Parameters.AddWithValue("@tipo_plastico", nuevaTolva.TipoPlastico);
                        sqlCom.Parameters.AddWithValue("@proporcion", nuevaTolva.Proporcion);
                        sqlCom.Parameters.AddWithValue("@especificaciones", nuevaTolva.Especificaciones);

                        sqlCom.ExecuteNonQuery(); // Ejecutar el comando
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        public void Update(Tolva tolvaActualizada)
        {
            string sqlSentencia = "sp_UpdateTolva"; // Nombre del procedimiento almacenado

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;

                        // Añadir parámetros
                        sqlCom.Parameters.AddWithValue("@idTolva", tolvaActualizada.IdTolva);
                        sqlCom.Parameters.AddWithValue("@id_triturado", tolvaActualizada.IdTriturado);
                        sqlCom.Parameters.AddWithValue("@horario_inicio", tolvaActualizada.HorarioInicio);
                        sqlCom.Parameters.AddWithValue("@cantidad_cargada", tolvaActualizada.CantidadCargada);
                        sqlCom.Parameters.AddWithValue("@tipo_plastico", tolvaActualizada.TipoPlastico);
                        sqlCom.Parameters.AddWithValue("@proporcion", tolvaActualizada.Proporcion);
                        sqlCom.Parameters.AddWithValue("@especificaciones", tolvaActualizada.Especificaciones);

                        sqlCom.ExecuteNonQuery(); // Ejecutar el comando
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        public void Delete(int idTolva)
        {
            string sqlSentencia = "sp_DeleteTolva"; // Nombre del procedimiento almacenado

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;
                        sqlCom.Parameters.AddWithValue("@idTolva", idTolva); // Añadir parámetro
                        sqlCom.ExecuteNonQuery(); // Ejecutar el comando
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        public bool Exists(int idTolva)
        {
            string sqlSentencia = "sp_ExistsTolva"; // Nombre del procedimiento almacenado
            int count = 0;

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;
                        sqlCom.Parameters.AddWithValue("@idTolva", idTolva);

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
