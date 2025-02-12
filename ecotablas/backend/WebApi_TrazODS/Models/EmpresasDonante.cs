using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace WebApi_TrazODS.Models
{
    public class EmpresaDonante
    {
        #region Atributos
        string connectionString = @"Data Source=Ecotablas-Db.mssql.somee.com;Initial Catalog=Ecotablas-Db;User ID=lucasclemente08_SQLLogin_1;Password=apqjzszydf";
        #endregion

        #region Propiedades
        public int Id_empresaDonante { get; set; } 
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
            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = connectionString;


            sqlCnn.Open();

            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            DataSet ds = new DataSet();

            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = sqlCom;
            da.Fill(ds);



            sqlCnn.Close();


            return ds.Tables[0];
        }


        // Método para insertar una nueva empresa donante
        public void Insert()
        {
            string sqlSentencia = "SP_InsertarEmpresaDonante"; // Procedimiento almacenado

            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = connectionString;


            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;
            sqlCom.Parameters.Add("@CUIT", SqlDbType.NVarChar).Value = CUIT;
            sqlCom.Parameters.Add("@Nombre", SqlDbType.NVarChar).Value = Nombre;
            sqlCom.Parameters.Add("@Direccion", SqlDbType.NVarChar).Value = Direccion;
            sqlCom.Parameters.Add("@Telefono", SqlDbType.NVarChar).Value = Telefono;
            sqlCom.Parameters.Add("@Email", SqlDbType.NVarChar).Value = Email;
            sqlCom.Parameters.Add("@TipoPlastico", SqlDbType.NVarChar).Value = TipoPlastico;
            sqlCom.Parameters.Add("@Rubro", SqlDbType.NVarChar).Value = Rubro;
            sqlCom.Parameters.Add("@DonacionesDisponibles", SqlDbType.NVarChar).Value = DonacionesDisponibles;
            sqlCom.Parameters.Add("@Web", SqlDbType.NVarChar).Value = Web;
            sqlCnn.Open();
            var res = sqlCom.ExecuteNonQuery();
            sqlCnn.Close();
        }

        // Método para actualizar una empresa donante
        public void Update()
        {
            string sqlSentencia = "SP_ActualizarEmpresaDonante"; // Procedimiento almacenado


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = connectionString;

            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.AddWithValue("@Id_empresaDonante", SqlDbType.Int).Value = Id_empresaDonante;
            sqlCom.Parameters.Add("@CUIT", SqlDbType.NVarChar).Value = CUIT;
            sqlCom.Parameters.Add("@Nombre", SqlDbType.NVarChar).Value = Nombre;
            sqlCom.Parameters.Add("@Direccion", SqlDbType.NVarChar).Value = Direccion;
            sqlCom.Parameters.Add("@Telefono", SqlDbType.NVarChar).Value = Telefono;
            sqlCom.Parameters.Add("@Email", SqlDbType.NVarChar).Value = Email;
            sqlCom.Parameters.Add("@TipoPlastico", SqlDbType.NVarChar).Value = TipoPlastico;
            sqlCom.Parameters.Add("@Rubro", SqlDbType.NVarChar).Value = Rubro;
            sqlCom.Parameters.Add("@DonacionesDisponibles", SqlDbType.NVarChar).Value = DonacionesDisponibles;
            sqlCom.Parameters.Add("@Web", SqlDbType.NVarChar).Value = Web;
            sqlCnn.Open();
            var res = sqlCom.ExecuteNonQuery();
            sqlCnn.Close();
        }

        // Método para eliminar una empresa donante
        public void Delete(int id)
        {

            string sqlSentencia = "SP_EliminarEmpresaDonante";
            SqlConnection sqlCnn = new SqlConnection(connectionString);
            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn)
            {
                CommandType = CommandType.StoredProcedure
            };
            sqlCom.Parameters.Add("@Id_empresaDonante", SqlDbType.Int).Value = Id_empresaDonante;
            sqlCnn.Open();
            var res = sqlCom.ExecuteNonQuery();
            sqlCnn.Close();


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
