using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data;
using System.Data.SqlClient;
namespace WebApi_TrazODS.Models
{
    public class RutaxEmpleados
    {

        #region Atributos
        string conectionString = @"Data Source=Ecotablas-Db.mssql.somee.com;Initial Catalog=Ecotablas-Db;User ID=lucasclemente08_SQLLogin_1;Password=apqjzszydf";

        #endregion


        #region Propiedades

        public int IdRutaxEmpleado { get; set; }
        public int IdRuta { get; set; }
        public int IdEmpleado { get; set; }

        #endregion

        #region Metodos

        public DataTable SelectAll()
        {


            string sqlSentencia = "SP_GetAllRutaxEmpleado";


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


            string sqlSentencia = "SP_GetIdRutaxEmpleado";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            sqlCnn.Open();

            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;
            sqlCom.Parameters.Add("@IdRutaxEmpleado", SqlDbType.Int).Value = IdRutaxEmpleado;

            DataSet ds = new DataSet();

            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = sqlCom;
            da.Fill(ds);

            sqlCnn.Close();

            return ds.Tables[0];


        }


        public void Insert()
        {

            string sqlSentencia = "SP_InsertRutaxEmpleado";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdRuta", SqlDbType.Int).Value = IdRuta;
            sqlCom.Parameters.Add("@IdEmpleado", SqlDbType.Int).Value = IdEmpleado;

            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }


        public void Update()
        {


            string sqlSentencia = "SP_UpdateRutaxEmpleado";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdRutaxEmpleados", SqlDbType.Int).Value = IdRutaxEmpleado;
            sqlCom.Parameters.Add("@IdRuta", SqlDbType.Int).Value = IdRuta;
            sqlCom.Parameters.Add("@IdEmpleado", SqlDbType.Int).Value = IdEmpleado;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }


        public void Delete()
        {

            string sqlSentencia = "SP_DeleteRutaxEmpleado";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdRutaxEmpleado", SqlDbType.Int).Value = IdRutaxEmpleado;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }

        #endregion


    }
}
