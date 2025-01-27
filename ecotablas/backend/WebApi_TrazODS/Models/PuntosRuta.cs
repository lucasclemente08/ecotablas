using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data;
using System.Data.SqlClient;
namespace WebApi_TrazODS.Models
{
    public class PuntosRuta
    {

        #region Atributos
        string conectionString = @"Data Source=Ecotablas-Db.mssql.somee.com;Initial Catalog=Ecotablas-Db;User ID=lucasclemente08_SQLLogin_1;Password=apqjzszydf";

        #endregion


        #region Propiedades

        public int IdPunto { get; set; }
        public int IdRuta { get; set; }
        public int Orden { get; set; }
        public decimal Latitud { get; set; }
        public decimal Longitud { get; set; }

        #endregion

        #region Metodos

        public DataTable SelectAll()
        {


            string sqlSentencia = "SP_GetAllPuntosRuta";


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


            string sqlSentencia = "SP_GetIdPuntosRuta";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            sqlCnn.Open();

            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;
            sqlCom.Parameters.Add("@IdPunto", SqlDbType.Int).Value = IdPunto;

            DataSet ds = new DataSet();

            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = sqlCom;
            da.Fill(ds);

            sqlCnn.Close();

            return ds.Tables[0];


        }


        public void Insert()
        {

            string sqlSentencia = "SP_InsertPuntoRuta";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdRuta", SqlDbType.Int).Value = IdRuta;
            sqlCom.Parameters.Add("@Orden", SqlDbType.Int).Value = Orden;
            sqlCom.Parameters.Add("@Latitud", SqlDbType.Decimal).Value = Latitud;
            sqlCom.Parameters.Add("@Longitud", SqlDbType.Decimal).Value = Longitud;
            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }


        public void Update()
        {


            string sqlSentencia = "SP_UpdatePuntoRuta";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdPunto", SqlDbType.Int).Value = IdPunto;
            sqlCom.Parameters.Add("@IdRuta", SqlDbType.Int).Value = IdRuta;
            sqlCom.Parameters.Add("@Orden", SqlDbType.Int).Value = Orden;
            sqlCom.Parameters.Add("@Latitud", SqlDbType.Decimal).Value = Latitud;
            sqlCom.Parameters.Add("@Longitud", SqlDbType.Decimal).Value = Longitud;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }


        public void Delete()
        {

            string sqlSentencia = "SP_DeletePuntosRuta";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdPunto", SqlDbType.Int).Value = IdPunto;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }

        #endregion


    }
}
