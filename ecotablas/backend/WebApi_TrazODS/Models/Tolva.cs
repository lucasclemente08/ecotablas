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
            connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString; // Cambia según tu configuración
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
            string sqlSentencia = "sp_GetAllTolva";
            DataTable dataTable = new DataTable();

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
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

            return dataTable; // Retornar el DataTable con las tolvas
        }

        public DataTable SelectById()
        {
            string sqlSentencia = "sp_GetTolvaById"; // Nombre del procedimiento almacenado
            DataTable dataTable = new DataTable();

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                sqlCnn.Open();
                using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                {
                    sqlCom.CommandType = CommandType.StoredProcedure;
                    sqlCom.Parameters.Add("@idTolva", SqlDbType.Int).Value = IdTolva;

                    using (SqlDataAdapter da = new SqlDataAdapter(sqlCom))
                    {
                        da.Fill(dataTable); // Llenar el DataTable con el resultado
                    }
                }
            }

            return dataTable; // Retornar el DataTable con la tolva por ID
        }

        public void Insert()
        {
            string sqlSentencia = "InsertTolva";

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                sqlCnn.Open();
                using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                {
                    sqlCom.CommandType = CommandType.StoredProcedure;

                    // Añadir parámetros
                    sqlCom.Parameters.Add("@id_triturado", SqlDbType.Int).Value = IdTriturado;
                    sqlCom.Parameters.Add("@horario_inicio", SqlDbType.DateTime).Value = HorarioInicio;
                    sqlCom.Parameters.Add("@cantidad_cargada", SqlDbType.Decimal).Value = CantidadCargada;
                    sqlCom.Parameters.Add("@tipo_plastico", SqlDbType.NVarChar).Value = TipoPlastico;
                    sqlCom.Parameters.Add("@proporcion", SqlDbType.NVarChar).Value = Proporcion;
                    sqlCom.Parameters.Add("@especificaciones", SqlDbType.NVarChar).Value = Especificaciones;

                    sqlCom.ExecuteNonQuery(); // Ejecutar el comando
                }
            }
        }

        public void Update()
        {
            string sqlSentencia = "sp_UpdateTolva";

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                sqlCnn.Open();
                using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                {
                    sqlCom.CommandType = CommandType.StoredProcedure;

                    // Añadir parámetros
                    sqlCom.Parameters.Add("@idTolva", SqlDbType.Int).Value = IdTolva;
                    sqlCom.Parameters.Add("@id_triturado", SqlDbType.Int).Value = IdTriturado;
                    sqlCom.Parameters.Add("@horario_inicio", SqlDbType.DateTime).Value = HorarioInicio;
                    sqlCom.Parameters.Add("@cantidad_cargada", SqlDbType.Decimal).Value = CantidadCargada;
                    sqlCom.Parameters.Add("@tipo_plastico", SqlDbType.NVarChar).Value = TipoPlastico;
                    sqlCom.Parameters.Add("@proporcion", SqlDbType.NVarChar).Value = Proporcion;
                    sqlCom.Parameters.Add("@especificaciones", SqlDbType.NVarChar).Value = Especificaciones;

                    sqlCom.ExecuteNonQuery(); // Ejecutar el comando
                }
            }
        }

        public void Delete(int id)
        {
            string sqlSentencia = "sp_DeleteTolva";

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                sqlCnn.Open();
                using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                {
                    sqlCom.CommandType = CommandType.StoredProcedure;
                    sqlCom.Parameters.Add("@idTolva", SqlDbType.Int).Value = IdTolva;

                    sqlCom.ExecuteNonQuery(); // Ejecutar el comando
                }
            }
        }

        public bool Exists()
        {
            string sqlSentencia = "sp_ExistsTolva"; // Nombre del procedimiento almacenado
            int count = 0;

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                sqlCnn.Open();
                using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                {
                    sqlCom.CommandType = CommandType.StoredProcedure;
                    sqlCom.Parameters.Add("@idTolva", SqlDbType.Int).Value = IdTolva;

                    count = (int)sqlCom.ExecuteScalar(); // Obtener el conteo
                }
            }

            return count > 0; // Retornar true si existe
        }
        #endregion
    }
}
