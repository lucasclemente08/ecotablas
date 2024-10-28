using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data;
using System.Data.SqlClient;
namespace WebApi_TrazODS.Models
{
    public class Vehiculos
    {

        #region Atributos
        string conectionString = @"Data Source=Ecotablas-Db.mssql.somee.com;Initial Catalog=Ecotablas-Db;User ID=lucasclemente08_SQLLogin_1;Password=apqjzszydf";

        #endregion


        #region Propiedades

        public int IdVehiculo { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public int Año { get; set; }
        public string Color { get; set; }
        public string Tipo { get; set; }

        public DateTime FechaUltimaInspeccion { get; set; }
        public string Combustible { get; set; }

        // Nueva propiedad añadida
        public string NumeroPlaca { get; set; }

        #endregion

        #region Metodos


        public DataTable SelectAll()
        {
            string sqlSentencia = "SP_GetAllVehiculos";
            using (SqlConnection sqlCnn = new SqlConnection(conectionString))
            {
                sqlCnn.Open();
                SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
                sqlCom.CommandType = CommandType.StoredProcedure;

                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(sqlCom);
                da.Fill(ds);
                return ds.Tables[0];
            }
        }

        public DataTable SelectId()
        {
            string sqlSentencia = "SP_GetIdVehiculos";
            using (SqlConnection sqlCnn = new SqlConnection(conectionString))
            {
                sqlCnn.Open();
                SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
                sqlCom.CommandType = CommandType.StoredProcedure;
                sqlCom.Parameters.Add("@IdVehiculo", SqlDbType.Int).Value = IdVehiculo;

                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter(sqlCom);
                da.Fill(ds);
                return ds.Tables[0];
            }
        }
        public void Insert()
        {
            string sqlSentencia = "SP_InsertVehiculo"; 
            using (SqlConnection sqlCnn = new SqlConnection(conectionString))
            {
                SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
                sqlCom.CommandType = CommandType.StoredProcedure;

                // Ensure these fields (Marca, Modelo, etc.) have values before adding them
                sqlCom.Parameters.Add("@Marca", SqlDbType.VarChar).Value = Marca;
                sqlCom.Parameters.Add("@Modelo", SqlDbType.VarChar).Value = Modelo;
                sqlCom.Parameters.Add("@Año", SqlDbType.Int).Value = Año;
                sqlCom.Parameters.Add("@Color", SqlDbType.VarChar).Value = Color;
                sqlCom.Parameters.Add("@Tipo", SqlDbType.VarChar).Value = Tipo;
                sqlCom.Parameters.Add("@FechaUltimaInspeccion", SqlDbType.Date).Value = FechaUltimaInspeccion;
                sqlCom.Parameters.Add("@Combustible", SqlDbType.VarChar).Value = Combustible;

                // New parameter added
                sqlCom.Parameters.Add("@NumeroPlaca", SqlDbType.VarChar).Value = NumeroPlaca;

                // Open the connection and execute the command
                sqlCnn.Open();
                sqlCom.ExecuteNonQuery();
            }
        }


        public void Update()
        {
            string sqlSentencia = "SP_UpdateVehiculo";
            using (SqlConnection sqlCnn = new SqlConnection(conectionString))
            {
                SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
                sqlCom.CommandType = CommandType.StoredProcedure;

                sqlCom.Parameters.Add("@IdVehiculo", SqlDbType.Int).Value = IdVehiculo;
                sqlCom.Parameters.Add("@Marca", SqlDbType.VarChar).Value = Marca;
                sqlCom.Parameters.Add("@Modelo", SqlDbType.VarChar).Value = Modelo;
                sqlCom.Parameters.Add("@Año", SqlDbType.Int).Value = Año;
                sqlCom.Parameters.Add("@Color", SqlDbType.VarChar).Value = Color;
                sqlCom.Parameters.Add("@Tipo", SqlDbType.VarChar).Value = Tipo;

                sqlCom.Parameters.Add("@FechaUltimaInspeccion", SqlDbType.Date).Value = FechaUltimaInspeccion;
                sqlCom.Parameters.Add("@Combustible", SqlDbType.VarChar).Value = Combustible;

                // Nuevo parámetro añadido
                sqlCom.Parameters.Add("@NumeroPlaca", SqlDbType.VarChar).Value = NumeroPlaca;

                sqlCnn.Open();
                sqlCom.ExecuteNonQuery();
            }
        }






        public void Delete()
        {

            string sqlSentencia = "SP_DeleteVehiculo";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdVehiculo", SqlDbType.Int).Value = IdVehiculo;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }

        #endregion


    }
}
