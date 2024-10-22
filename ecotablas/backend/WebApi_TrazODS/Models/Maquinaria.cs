using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data;
using System.Data.SqlClient;
using Freya.Types.Http;

namespace WebApi_TrazODS.Models
{
    public class Maquinaria
    {
        #region Atributos
        string conectionString = @"Data Source=Ecotablas-Db.mssql.somee.com;Initial Catalog=Ecotablas-Db;User ID=lucasclemente08_SQLLogin_1;Password=apqjzszydf";
        #endregion

        #region Propiedades
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Tipo { get; set; }
        public string Modelo { get; set; }
        public int IdEstado { get; set; }
        public string fecha_adquisicion { get; set; }
        #endregion

        #region Métodos
        public DataTable SelectAll()
        {
            string sqlSentencia = "SP_GetAllMaquinaria";
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
            string sqlSentencia = "SP_GetIdMaquinaria";
            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            sqlCnn.Open();

            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;
            sqlCom.Parameters.Add("@Id", SqlDbType.Int).Value = Id;

            DataSet ds = new DataSet();

            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = sqlCom;
            da.Fill(ds);

            sqlCnn.Close();

            return ds.Tables[0];
        }

        public void Insert()
        {
            string sqlSentencia = "SP_InsertMaquinaria";
            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@Nombre", SqlDbType.NVarChar).Value = Nombre;
            sqlCom.Parameters.Add("@Tipo", SqlDbType.NVarChar).Value = Tipo;
            sqlCom.Parameters.Add("@Modelo", SqlDbType.NVarChar).Value = Modelo;
            sqlCom.Parameters.Add("@IdEstado", SqlDbType.Int).Value = IdEstado;
            sqlCom.Parameters.Add("@fecha_adquisicion", SqlDbType.NVarChar).Value = fecha_adquisicion;
            sqlCnn.Open();
            var res = sqlCom.ExecuteNonQuery();
            sqlCnn.Close();
        }

        public void Update()
        {
            string sqlSentencia = "SP_UpdateMaquinaria";

            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;
            
            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@Id", SqlDbType.Int).Value = Id;
            sqlCom.Parameters.Add("@Nombre", SqlDbType.NVarChar).Value = Nombre;
            sqlCom.Parameters.Add("@Tipo", SqlDbType.NVarChar).Value = Tipo;
            sqlCom.Parameters.Add("@Modelo", SqlDbType.NVarChar).Value = Modelo;
            sqlCom.Parameters.Add("@IdEstado", SqlDbType.Int).Value = IdEstado;
            sqlCom.Parameters.Add("@fecha_adquisicion", SqlDbType.NVarChar).Value = fecha_adquisicion;
            sqlCnn.Open();
            var res = sqlCom.ExecuteNonQuery();
            sqlCnn.Close();
        }

        public void Delete(int id)
        {
            string sqlSentencia = "SP_DeleteMaquinaria";
            SqlConnection sqlCnn = new SqlConnection(conectionString);
            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn)
            {
                CommandType = CommandType.StoredProcedure
            };
            sqlCom.Parameters.Add("@Id", SqlDbType.Int).Value = id;
            sqlCnn.Open();
            var res = sqlCom.ExecuteNonQuery();
            sqlCnn.Close();
        }
        public void CambiarEstado(int id, int nuevoEstado)
        {
            string sqlSentencia = "SP_CambiarEstadoMaquinaria";
            SqlConnection sqlCnn = new SqlConnection(conectionString);
            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn)
            {
                CommandType = CommandType.StoredProcedure
            };
            sqlCom.Parameters.Add("@Id", SqlDbType.Int).Value = id;
            sqlCom.Parameters.Add("@NuevoEstado", SqlDbType.Int).Value = nuevoEstado;
            sqlCnn.Open();
            var res = sqlCom.ExecuteNonQuery();
            sqlCnn.Close();
        }
        #endregion


    }
}
