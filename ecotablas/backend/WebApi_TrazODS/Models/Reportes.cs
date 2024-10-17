using System;
using System.Data;
using System.Data.SqlClient;

namespace WebApi_TrazODS.Models
{
    public class TablasProducidas
    {
        #region Atributos
        private readonly string connectionString;

        // Constructor que obtiene la cadena de conexión desde una variable de entorno
        public TablasProducidas()
        {
            connectionString = Environment.GetEnvironmentVariable("DefaultConnection");
        }
        #endregion

        #region Propiedades
        public int ID_Tabla { get; set; }
        public int ID_Proceso { get; set; }
        public DateTime FechaProduccion { get; set; }
        public string Dimensiones { get; set; }
        public double Peso { get; set; }
        public string CodigoIdentificacion { get; set; }
        #endregion

        #region Métodos
        public DataTable SelectAll()
        {
            string sqlSentencia = "SP_ObtenerTablasProducidas"; // Nombre del procedimiento almacenado
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
                    // Manejo de excepciones
                    Console.WriteLine(ex.Message);
                }
            }

            return dataTable; // Retornar el DataTable con las tablas producidas
        }

        public DataTable SelectById(int id)
        {
            string sqlSentencia = "SP_ObtenerTablaProducidaPorId"; // Nombre del procedimiento almacenado
            DataTable dataTable = new DataTable();

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;
                        sqlCom.Parameters.AddWithValue("@Id_tabla", id); // Añadir parámetro

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

            return dataTable; // Retornar el DataTable con la tabla producida por ID
        }

        // Método para insertar una nueva tabla producida
        public void Insert(TablasProducidas nuevaTabla)
        {
            string sqlSentencia = "SP_InsertarTablaProducida"; // Nombre del procedimiento almacenado

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;

                        // Añadir parámetros
                        sqlCom.Parameters.AddWithValue("@ID_Proceso", nuevaTabla.ID_Proceso);
                        sqlCom.Parameters.AddWithValue("@FechaProduccion", nuevaTabla.FechaProduccion);
                        sqlCom.Parameters.AddWithValue("@Dimensiones", nuevaTabla.Dimensiones);
                        sqlCom.Parameters.AddWithValue("@Peso", nuevaTabla.Peso);
                        sqlCom.Parameters.AddWithValue("@CodigoIdentificacion", nuevaTabla.CodigoIdentificacion);

                        sqlCom.ExecuteNonQuery(); // Ejecutar el comando
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        // Método para actualizar una tabla producida
        public void Update(TablasProducidas tablaActualizada)
        {
            string sqlSentencia = "SP_ActualizarTablaProducida"; // Nombre del procedimiento almacenado

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;

                        // Añadir parámetros
                        sqlCom.Parameters.AddWithValue("@ID_Tabla", tablaActualizada.ID_Tabla);
                        sqlCom.Parameters.AddWithValue("@ID_Proceso", tablaActualizada.ID_Proceso);
                        sqlCom.Parameters.AddWithValue("@FechaProduccion", tablaActualizada.FechaProduccion);
                        sqlCom.Parameters.AddWithValue("@Dimensiones", tablaActualizada.Dimensiones);
                        sqlCom.Parameters.AddWithValue("@Peso", tablaActualizada.Peso);
                        sqlCom.Parameters.AddWithValue("@CodigoIdentificacion", tablaActualizada.CodigoIdentificacion);

                        sqlCom.ExecuteNonQuery(); // Ejecutar el comando
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        // Método para eliminar una tabla producida
        public void Delete(int id)
        {
            string sqlSentencia = "SP_EliminarTablaProducida"; // Nombre del procedimiento almacenado

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;
                        sqlCom.Parameters.AddWithValue("@ID_Tabla", id); // Añadir parámetro
                        sqlCom.ExecuteNonQuery(); // Ejecutar el comando
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        // Método para verificar si existe una tabla producida
        public bool Exists(int id)
        {
            string sqlSentencia = "SP_ExisteTablaProducida"; // Nombre del procedimiento almacenado
            int count = 0;

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;
                        sqlCom.Parameters.AddWithValue("@ID_Tabla", id);

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
