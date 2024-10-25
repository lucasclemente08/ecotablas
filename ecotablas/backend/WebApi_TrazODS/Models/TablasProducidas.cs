using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace WebApi_TrazODS.Models
{
    public class TablasProducidas
    {
        #region Atributos
        string connectionString = @"Data Source=Ecotablas-Db.mssql.somee.com;Initial Catalog=Ecotablas-Db;User ID=lucasclemente08_SQLLogin_1;Password=apqjzszydf";
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
            string sqlSentencia = "SP_ObtenerTablasProducidas";
            DataTable dataTable = new DataTable();

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                sqlCnn.Open();
                using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                {
                    sqlCom.CommandType = CommandType.StoredProcedure;
                    SqlDataAdapter da = new SqlDataAdapter(sqlCom);
                    da.Fill(dataTable);
                }
                sqlCnn.Close();
            }

            return dataTable;
        }

        public DataTable SelectById(int id)
        {
            string sqlSentencia = "SP_ObtenerTablaProducidaPorId";
            DataTable dataTable = new DataTable();

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                sqlCnn.Open();
                using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                {
                    sqlCom.CommandType = CommandType.StoredProcedure;
                    sqlCom.Parameters.AddWithValue("@Id_tabla", id);

                    SqlDataAdapter da = new SqlDataAdapter(sqlCom);
                    da.Fill(dataTable);
                }
                sqlCnn.Close();
            }

            return dataTable;
        }

        public void Insert()
        {
            string sqlSentencia = "SP_InsertarTablaProducida";

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                sqlCnn.Open();
                using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                {
                    sqlCom.CommandType = CommandType.StoredProcedure;

                    sqlCom.Parameters.AddWithValue("@ID_Proceso", ID_Proceso);
                    sqlCom.Parameters.AddWithValue("@FechaProduccion", FechaProduccion);
                    sqlCom.Parameters.AddWithValue("@Dimensiones", Dimensiones);
                    sqlCom.Parameters.AddWithValue("@Peso", Peso);
                    sqlCom.Parameters.AddWithValue("@CodigoIdentificacion", CodigoIdentificacion);

                    sqlCom.ExecuteNonQuery();
                }
                sqlCnn.Close();
            }
        }

        public void Update()
        {
            string sqlSentencia = "SP_ActualizarTablaProducida";

            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                sqlCnn.Open();
                using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
                {
                    sqlCom.CommandType = CommandType.StoredProcedure;

                    sqlCom.Parameters.AddWithValue("@ID_Tabla", ID_Tabla);
                    sqlCom.Parameters.AddWithValue("@ID_Proceso", ID_Proceso);
                    sqlCom.Parameters.AddWithValue("@FechaProduccion", FechaProduccion);
                    sqlCom.Parameters.AddWithValue("@Dimensiones", Dimensiones);
                    sqlCom.Parameters.AddWithValue("@Peso", Peso);
                    sqlCom.Parameters.AddWithValue("@CodigoIdentificacion", CodigoIdentificacion);

                    sqlCom.ExecuteNonQuery();
                }
                sqlCnn.Close();
            }
        }

        public void Delete()
        {
            string sqlSentencia = "SP_EliminarTablaProducida";

            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = connectionString;

            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            // Añadir parámetro
            sqlCom.Parameters.Add("@ID_Tabla", SqlDbType.Int).Value = ID_Tabla;

            sqlCnn.Open();

            var res = sqlCom.ExecuteNonQuery();

            sqlCnn.Close();
        }


        #endregion
    }
}
