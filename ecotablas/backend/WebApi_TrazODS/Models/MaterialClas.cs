using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data;
using System.Data.SqlClient;

namespace WebApi_TrazODS.Models
{
    public class MaterialClas
    {

        #region Atributos

        string conectionString = @"Data Source=Ecotablas-Db.mssql.somee.com;Initial Catalog=Ecotablas-Db;User ID=lucasclemente08_SQLLogin_1;Password=apqjzszydf";


        #endregion


        #region Propiedades

        public int IdMaterialClasificado { get; set; }
        public int VolumenUtil { get; set; }
        public int VolumenInutil { get; set; }
        public string FechaC { get; set; }
        public int IdIngresoMaterial { get; set; }

        #endregion

        #region Metodos

        public DataTable SelectAll()
        {


            string sqlSentencia = "SP_GetAllMaterialClas";


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


            string sqlSentencia = "SP_GetIdMaterialClas";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            sqlCnn.Open();

            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;
            sqlCom.Parameters.Add("@IdMaterialClasificado", SqlDbType.Int).Value = IdMaterialClasificado;

            DataSet ds = new DataSet();

            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = sqlCom;
            da.Fill(ds);

            sqlCnn.Close();

            return ds.Tables[0];


        }


        public void Insert()
        {

            string sqlSentencia = "SP_InsertMaterialClas";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@VolumenUtil", SqlDbType.Int).Value = VolumenUtil;
            sqlCom.Parameters.Add("@VolumenInutil", SqlDbType.Int).Value = VolumenInutil;
            sqlCom.Parameters.Add("FechaC", SqlDbType.NVarChar).Value = FechaC;
            sqlCom.Parameters.Add("@IdIngresoMaterial", SqlDbType.Int).Value = IdIngresoMaterial;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }


        public void Update()
        {


            string sqlSentencia = "SP_UpdateMaterialClas";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdMaterialClasificado", SqlDbType.Int).Value = IdMaterialClasificado;
            sqlCom.Parameters.Add("@VolumenUtil", SqlDbType.Int).Value = VolumenUtil;
            sqlCom.Parameters.Add("@VolumenInutil", SqlDbType.Int).Value = VolumenInutil;
            sqlCom.Parameters.Add("FechaC", SqlDbType.NVarChar).Value = FechaC;
            sqlCom.Parameters.Add("@IdIngresoMaterial", SqlDbType.Int).Value = IdIngresoMaterial;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }


        public void Delete()
        {

            string sqlSentencia = "SP_DeleteMaterialClas";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdMaterialClasificado", SqlDbType.Int).Value = IdMaterialClasificado;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }

        #endregion


    }
}