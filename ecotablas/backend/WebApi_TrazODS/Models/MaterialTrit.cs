using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data;
using System.Data.SqlClient;


namespace WebApi_TrazODS.Models
{
    public class MaterialTrit
    {
        #region Atributos
        string conectionString = @"Data Source=Ecotablas-Db.mssql.somee.com;Initial Catalog=Ecotablas-Db;User ID=lucasclemente08_SQLLogin_1;Password=apqjzszydf";


        #endregion


        #region Propiedades

        public int IdMaterialTriturado { get; set; }
        public int VolumenT { get; set; }
        public string Fecha { get; set; }
        public int IdMaterialClasificado { get; set; }
        public int? VolumenTInutil { get; set; }

        #endregion

        #region Metodos

        public DataTable SelectAll()
        {


            string sqlSentencia = "SP_GetAllMaterialTriturado";


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


            string sqlSentencia = "SP_GetIdMaterialTriturado";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            sqlCnn.Open();

            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;
            sqlCom.Parameters.Add("@IdMaterialTriturado", SqlDbType.Int).Value = IdMaterialTriturado;

            DataSet ds = new DataSet();

            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = sqlCom;
            da.Fill(ds);

            sqlCnn.Close();

            return ds.Tables[0];


        }


        public void Insert()
        {

            string sqlSentencia = "SP_InsertMaterialTriturado";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@VolumenT", SqlDbType.Int).Value = VolumenT;
            sqlCom.Parameters.Add("@Fecha", SqlDbType.NVarChar).Value = Fecha;
            sqlCom.Parameters.Add("@IdMaterialClasificado", SqlDbType.Int).Value = IdMaterialClasificado;
            sqlCom.Parameters.Add("@VolumenTInutil", SqlDbType.Int).Value = VolumenTInutil;

            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }


        public void Update()
        {


            string sqlSentencia = "SP_UpdateMaterialTriturado";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdMaterialTriturado", SqlDbType.Int).Value = IdMaterialTriturado;
            sqlCom.Parameters.Add("@VolumenT", SqlDbType.Int).Value = VolumenT;
            sqlCom.Parameters.Add("@Fecha", SqlDbType.NVarChar).Value = Fecha;
            sqlCom.Parameters.Add("@IdMaterialClasificado", SqlDbType.Int).Value = IdMaterialClasificado;
            sqlCom.Parameters.Add("@VolumenTInutil", SqlDbType.Int).Value = VolumenTInutil;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }


        public void Delete()
        {

            string sqlSentencia = "SP_DeleteMaterialTriturado";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdMaterialTriturado", SqlDbType.Int).Value = IdMaterialTriturado;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }

        #endregion


    }
}