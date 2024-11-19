using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace WebApi_TrazODS.Models
{
    public class Tolva
    {
        #region Atributos
        string connectionString = @"Data Source=Ecotablas-Db.mssql.somee.com;Initial Catalog=Ecotablas-Db;User ID=lucasclemente08_SQLLogin_1;Password=apqjzszydf";
        #endregion

        #region Propiedades
        public int IdTolva { get; set; } // Identificador único para la tolva
        public int IdMaterialTriturado { get; set; } // Identificador del triturado asociado
        public DateTime HorarioInicio { get; set; } // Hora de inicio
        public decimal CantidadCargada { get; set; } // Cantidad de plástico cargado
        public string TipoPlastico { get; set; } // Tipo de plástico
        public string Proporcion { get; set; } // Proporción de mezcla o uso
        public string Especificaciones { get; set; } // Especificaciones adicionales
        public int Estado { get; set; }
        #endregion

        #region Métodos
        public DataTable SelectAll()
        {
            string sqlSentencia = "sp_GetAllTolva";
           
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
        public void Insert()
        {

            string sqlSentencia = "sp_InsertTolvasPrueba";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = connectionString;


            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdMaterialTriturado", SqlDbType.Int).Value = IdMaterialTriturado;
            sqlCom.Parameters.Add("@HorarioInicio", SqlDbType.DateTime).Value = HorarioInicio;
            sqlCom.Parameters.Add("@CantidadCargada", SqlDbType.Decimal).Value = CantidadCargada;
            sqlCom.Parameters.Add("@TipoPlastico", SqlDbType.NVarChar).Value = TipoPlastico;
            sqlCom.Parameters.Add("@Proporcion", SqlDbType.NVarChar).Value = Proporcion;
            sqlCom.Parameters.Add("@Especificaciones", SqlDbType.NVarChar).Value = Especificaciones;
            sqlCom.Parameters.Add("@Estado", SqlDbType.Int).Value = Estado;

            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();

            sqlCnn.Close();


        }
        public void Update()
        {

            string sqlSentencia = "sp_UpdateTolvaPruebas";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = connectionString;

            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;


            sqlCom.Parameters.Add("@IdTolva", SqlDbType.Int).Value = IdTolva;
            sqlCom.Parameters.Add("@IdMaterialTriturado", SqlDbType.Int).Value = IdMaterialTriturado;
            sqlCom.Parameters.Add("@HorarioInicio", SqlDbType.DateTime).Value = HorarioInicio;
            sqlCom.Parameters.Add("@CantidadCargada", SqlDbType.Decimal).Value = CantidadCargada;
            sqlCom.Parameters.Add("@TipoPlastico", SqlDbType.NVarChar).Value = TipoPlastico;
            sqlCom.Parameters.Add("@Proporcion", SqlDbType.NVarChar).Value = Proporcion;
            sqlCom.Parameters.Add("@Especificaciones", SqlDbType.NVarChar).Value = Especificaciones;
            sqlCom.Parameters.Add("@Estado", SqlDbType.Int).Value = Estado;

            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }
        public void Delete()
        {

            string sqlSentencia = "SP_DeleteTolvasPruebas";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = connectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdTolva", SqlDbType.Int).Value = IdTolva;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


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
                    count = (int)sqlCom.ExecuteScalar(); // Obtener el conteo
                }
            }

            return count > 0; // Retornar true si existe
        }
        #endregion
    }
}
