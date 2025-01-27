using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data;
using System.Data.SqlClient;
namespace WebApi_TrazODS.Models
{
    public class Rutas
    {

        #region Atributos
        string conectionString = @"Data Source=Ecotablas-Db.mssql.somee.com;Initial Catalog=Ecotablas-Db;User ID=lucasclemente08_SQLLogin_1;Password=apqjzszydf";

        #endregion


        #region Propiedades

        public int IdRuta { get; set; }
        public string NombreRuta { get; set; }
        public DateTime Fecha { get; set; }

        #endregion

        #region Metodos

        public DataTable SelectAll()
        {


            string sqlSentencia = "SP_GetAllRutas";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


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

        public DataTable SelectId()
        {


            string sqlSentencia = "SP_GetIdRuta";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            sqlCnn.Open();

            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;
            sqlCom.Parameters.Add("@IdRuta", SqlDbType.Int).Value = IdRuta;

            DataSet ds = new DataSet();

            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = sqlCom;
            da.Fill(ds);

            sqlCnn.Close();

            return ds.Tables[0];


        }


        public void Insert()
        {

            string sqlSentencia = "SP_InsertRuta";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@NombreRuta", SqlDbType.VarChar).Value = NombreRuta;
            sqlCom.Parameters.Add("@Fecha", SqlDbType.DateTime).Value = Fecha;

            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }


        public void Update()
        {


            string sqlSentencia = "SP_UpdateRutas";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdRuta", SqlDbType.Int).Value = IdRuta;
            sqlCom.Parameters.Add("@NombreRuta", SqlDbType.VarChar).Value = NombreRuta;
            sqlCom.Parameters.Add("@Fecha", SqlDbType.DateTime).Value = Fecha;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }


        public void Delete()
        {

            string sqlSentencia = "SP_DeleteRutas";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdRuta", SqlDbType.Int).Value = IdRuta;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }

        #endregion


    }
}
