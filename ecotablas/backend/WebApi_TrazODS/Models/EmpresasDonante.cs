using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace WebApi_TrazODS.Models
{
    public class EmpresaDonante
    {
        #region Atributos
        private readonly string connectionString;

        public EmpresaDonante()
        {
            connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        }
        #endregion

        #region Propiedades
        public int IdEmpresaDonante { get; set; } // Cambié el nombre a IdEmpresaDonante siguiendo el formato
        public string CUIT { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public string TipoPlastico { get; set; }
        public string Rubro { get; set; }
        public string DonacionesDisponibles { get; set; }
        public string Web { get; set; }
        #endregion

        #region Métodos

        // Método para obtener todas las empresas donantes
        public DataTable SelectAll()
        {
            string sqlSentencia = "SP_ObtenerEmpresasDonantes"; // Procedimiento almacenado
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

            return dataTable; // Retornar el DataTable con todas las empresas donantes
        }

        // Método para obtener una empresa donante por su ID
        public DataTable SelectById(int id)
        {
            string sqlSentencia = "SP_ObtenerEmpresaDonantePorId"; // Procedimiento almacenado
            DataTable dataTable = new DataTable();

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;
                        sqlCom.Parameters.AddWithValue("@Id", id);

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

            return dataTable; // Retornar el DataTable con la empresa donante por ID
        }

        // Método para insertar una nueva empresa donante
        public void Insert(EmpresaDonante nuevaEmpresa)
        {
            string sqlSentencia = "SP_InsertarEmpresaDonante"; // Procedimiento almacenado

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;

                        // Añadir parámetros
                        sqlCom.Parameters.AddWithValue("@CUIT", nuevaEmpresa.CUIT);
                        sqlCom.Parameters.AddWithValue("@Nombre", nuevaEmpresa.Nombre);
                        sqlCom.Parameters.AddWithValue("@Direccion", nuevaEmpresa.Direccion);
                        sqlCom.Parameters.AddWithValue("@Telefono", nuevaEmpresa.Telefono);
                        sqlCom.Parameters.AddWithValue("@Email", nuevaEmpresa.Email);
                        sqlCom.Parameters.AddWithValue("@TipoPlastico", nuevaEmpresa.TipoPlastico);
                        sqlCom.Parameters.AddWithValue("@Rubro", nuevaEmpresa.Rubro);
                        sqlCom.Parameters.AddWithValue("@DonacionesDisponibles", nuevaEmpresa.DonacionesDisponibles);
                        sqlCom.Parameters.AddWithValue("@Web", nuevaEmpresa.Web);

                        sqlCom.ExecuteNonQuery(); // Ejecutar el comando de inserción
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        // Método para actualizar una empresa donante
        public void Update(EmpresaDonante empresaActualizada)
        {
            string sqlSentencia = "SP_ActualizarEmpresaDonante"; // Procedimiento almacenado

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;

                        // Añadir parámetros
                        sqlCom.Parameters.AddWithValue("@Id", empresaActualizada.IdEmpresaDonante);
                        sqlCom.Parameters.AddWithValue("@CUIT", empresaActualizada.CUIT);
                        sqlCom.Parameters.AddWithValue("@Nombre", empresaActualizada.Nombre);
                        sqlCom.Parameters.AddWithValue("@Direccion", empresaActualizada.Direccion);
                        sqlCom.Parameters.AddWithValue("@Telefono", empresaActualizada.Telefono);
                        sqlCom.Parameters.AddWithValue("@Email", empresaActualizada.Email);
                        sqlCom.Parameters.AddWithValue("@TipoPlastico", empresaActualizada.TipoPlastico);
                        sqlCom.Parameters.AddWithValue("@Rubro", empresaActualizada.Rubro);
                        sqlCom.Parameters.AddWithValue("@DonacionesDisponibles", empresaActualizada.DonacionesDisponibles);
                        sqlCom.Parameters.AddWithValue("@Web", empresaActualizada.Web);

                        sqlCom.ExecuteNonQuery(); // Ejecutar el comando de actualización
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        // Método para eliminar una empresa donante
        public void Delete(int id)
        {
            string sqlSentencia = "SP_EliminarEmpresaDonante"; // Procedimiento almacenado

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;
                        sqlCom.Parameters.AddWithValue("@Id", id);

                        sqlCom.ExecuteNonQuery(); // Ejecutar el comando de eliminación
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        // Método para verificar si una empresa donante existe
        public bool Exists(int id)
        {
            string sqlSentencia = "SP_VerificarEmpresaDonante"; // Procedimiento almacenado

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                try
                {
                    sqlCnn.Open();
                    using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                    {
                        sqlCom.CommandType = CommandType.StoredProcedure;
                        sqlCom.Parameters.AddWithValue("@Id", id);

                        return Convert.ToBoolean(sqlCom.ExecuteScalar()); // Verificar si existe
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return false;
                }
            }
        }

        #endregion
    }
}
