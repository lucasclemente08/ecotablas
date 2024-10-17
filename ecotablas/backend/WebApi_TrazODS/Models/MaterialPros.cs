using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data;
using System.Data.SqlClient;


namespace WebApi_TrazODS.Models
{
    public class MaterialPros
    {
        #region Atributos
        string conectionString = @"Data Source=Ecotablas-Db.mssql.somee.com;Initial Catalog=Ecotablas-Db;User ID=lucasclemente08_SQLLogin_1;Password=apqjzszydf";

        #endregion


        #region Propiedades

        public int IdMaterialProcesado { get; set; }
        public int VolumenP { get; set; }
        public string FechaIngresoP { get; set; }
        public int IdIngresoMaterial { get; set; }
        public int? VolumenPInutil { get; set; }

        #endregion

        #region Metodos

        public DataTable SelectAll()
        {


            string sqlSentencia = "SP_GetAllMaterialProcesado";


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


            string sqlSentencia = "SP_GetIdMaterialProcesado";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            sqlCnn.Open();

            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;
            sqlCom.Parameters.Add("@IdIngresoMaterial", SqlDbType.Int).Value = IdMaterialProcesado;

            DataSet ds = new DataSet();

            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = sqlCom;
            da.Fill(ds);

            sqlCnn.Close();

            return ds.Tables[0];


        }


        public void Insert()
        {

            string sqlSentencia = "SP_InsertMaterialProcesado";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@VolumenP", SqlDbType.Int).Value = VolumenP;
            sqlCom.Parameters.Add("@FechaIngresoP", SqlDbType.NVarChar).Value = FechaIngresoP;
            sqlCom.Parameters.Add("@IdIngresoMaterial", SqlDbType.Int).Value = IdIngresoMaterial;
            sqlCom.Parameters.Add("@VolumenPInutil", SqlDbType.Int).Value = VolumenPInutil;

            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }


        public void Update()
        {


            string sqlSentencia = "SP_UpdateMaterialProcesado";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdMaterialProcesado", SqlDbType.Int).Value = IdMaterialProcesado;
            sqlCom.Parameters.Add("@VolumenP", SqlDbType.Int).Value = VolumenP;
            sqlCom.Parameters.Add("@FechaIngresoP", SqlDbType.NVarChar).Value = FechaIngresoP;
            sqlCom.Parameters.Add("@IdIngresoMaterial", SqlDbType.Int).Value = IdIngresoMaterial;
            sqlCom.Parameters.Add("@VolumenPInutil", SqlDbType.Int).Value = VolumenPInutil;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }


        public void Delete()
        {

            string sqlSentencia = "SP_DeleteMaterialProcesado";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdMaterialProcesado", SqlDbType.Int).Value = IdMaterialProcesado;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }

        #endregion


    }
}