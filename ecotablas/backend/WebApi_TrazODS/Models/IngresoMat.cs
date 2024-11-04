using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data;
using System.Data.SqlClient;


namespace WebApi_TrazODS.Models
{
    public class IngresoMat
    {
        #region Atributos

        string conectionString = @"Data Source=Ecotablas-Db.mssql.somee.com;Initial Catalog=Ecotablas-Db;User ID=lucasclemente08_SQLLogin_1;Password=apqjzszydf";

        #endregion



        #region Propiedades

        public int IdIngresoMaterial { get; set; }
        public int VolumenM { get; set; }
        public string FechaIngresoM { get; set; }
        public int IdTipoPlastico { get; set; }
        public int? VolumenMInutil { get; set; }

        public int Estado { get; set; }


        #endregion

        #region Metodos

        public DataTable SelectAll()
        {


            string sqlSentencia = "SP_GetAllIngresoMat";


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


            string sqlSentencia = "SP_GetIdAIngresoMat";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            sqlCnn.Open();

            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;
            sqlCom.Parameters.Add("@IdIngresoMaterial", SqlDbType.Int).Value = IdIngresoMaterial;

            DataSet ds = new DataSet();

            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = sqlCom;
            da.Fill(ds);

            sqlCnn.Close();

            return ds.Tables[0];


        }


        public void Insert()
        {

            string sqlSentencia = "SP_InsertIngresoMat";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@VolumenM", SqlDbType.Int).Value = VolumenM;
            sqlCom.Parameters.Add("@FechaIngresoM", SqlDbType.NVarChar).Value = FechaIngresoM;
            sqlCom.Parameters.Add("@IdTipoPlastico", SqlDbType.Int).Value = IdTipoPlastico;
            sqlCom.Parameters.Add("@VolumenMInutil", SqlDbType.Int).Value = VolumenMInutil;
            sqlCom.Parameters.Add("@Estado", SqlDbType.Int).Value = Estado;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }


        public void Update()
        {


            string sqlSentencia = "SP_UpdateIngresoMat";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdIngresoMaterial", SqlDbType.Int).Value = IdIngresoMaterial;
            sqlCom.Parameters.Add("@VolumenM", SqlDbType.Int).Value = VolumenM;
            sqlCom.Parameters.Add("@FechaIngresoM", SqlDbType.NVarChar).Value = FechaIngresoM;
            sqlCom.Parameters.Add("@IdTipoPlastico", SqlDbType.Int).Value = IdTipoPlastico;
            sqlCom.Parameters.Add("@VolumenMInutil", SqlDbType.Int).Value = VolumenMInutil;
            sqlCom.Parameters.Add("@Estado", SqlDbType.Int).Value = Estado;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }


        public void Delete()
        {

            string sqlSentencia = "SP_DeleteIngresoMat";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdIngresoMaterial", SqlDbType.Int).Value = IdIngresoMaterial;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }

        #endregion


    }
}