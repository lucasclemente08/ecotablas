using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data;
using System.Data.SqlClient;

namespace WebApi_TrazODS.Models
{
    namespace WebApi_TrazODS.Models
    {
        public class Reparacion
        {
            #region Atributos

            string conectionString = @"Data Source=Ecotablas-Db.mssql.somee.com;Initial Catalog=Ecotablas-Db;User ID=lucasclemente08_SQLLogin_1;Password=apqjzszydf";

            #endregion

            #region Propiedades

            public int Id { get; set; }
            public int? IdMaquinaria { get; set; } // Nullable
            public int? IdVehiculo { get; set; } // Nullable
            public string Detalle { get; set; }
            public string FechaInicio { get; set; }
            public int IdEstadoReparacion { get; set; }
            public decimal Costo { get; set; }

            #endregion

            #region Métodos

            public DataTable SelectAll()
            {
                string sqlSentencia = "SP_GetAllReparaciones";
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
                string sqlSentencia = "SP_GetIdReparacion";


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
            public DataTable SelectIdMaquinaria()
            {
                string sqlSentencia = "SP_GetReparacionesPorMaquinaria";


                SqlConnection sqlCnn = new SqlConnection();
                sqlCnn.ConnectionString = conectionString;


                sqlCnn.Open();

                SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
                sqlCom.CommandType = CommandType.StoredProcedure;
                sqlCom.Parameters.Add("@IdMaquinaria", SqlDbType.Int).Value = IdMaquinaria;

                DataSet ds = new DataSet();

                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = sqlCom;
                da.Fill(ds);

                sqlCnn.Close();

                return ds.Tables[0];

            }

            public DataTable SelectIdVehiculo()
            {
                string sqlSentencia = "SP_GetReparacionesPorVehiculo";


                SqlConnection sqlCnn = new SqlConnection();
                sqlCnn.ConnectionString = conectionString;


                sqlCnn.Open();

                SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
                sqlCom.CommandType = CommandType.StoredProcedure;
                sqlCom.Parameters.Add("@IdVehiculo", SqlDbType.Int).Value = IdVehiculo;

                DataSet ds = new DataSet();

                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = sqlCom;
                da.Fill(ds);

                sqlCnn.Close();

                return ds.Tables[0];

            }

            public void Insert()
            {
                string sqlSentencia = "SP_InsertReparacion";

                SqlConnection sqlCnn = new SqlConnection();
                sqlCnn.ConnectionString = conectionString;


                SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
                sqlCom.CommandType = CommandType.StoredProcedure;

                sqlCom.Parameters.Add("@IdMaquinaria", SqlDbType.Int).Value = (object)IdMaquinaria ?? DBNull.Value;
                sqlCom.Parameters.Add("@IdVehiculo", SqlDbType.Int).Value = (object)IdVehiculo ?? DBNull.Value;
                sqlCom.Parameters.Add("@Detalle", SqlDbType.NVarChar).Value = Detalle;
                sqlCom.Parameters.Add("@FechaInicio", SqlDbType.NVarChar).Value = FechaInicio;
                sqlCom.Parameters.Add("@IdEstadoReparacion", SqlDbType.Int).Value = IdEstadoReparacion;
                sqlCom.Parameters.Add("@Costo", SqlDbType.Money).Value = Costo;

                sqlCnn.Open();
                sqlCom.ExecuteNonQuery();
                sqlCnn.Close();
            }

            public void Update()
            {
                string sqlSentencia = "SP_UpdateReparacion";
                SqlConnection sqlCnn = new SqlConnection();
                sqlCnn.ConnectionString = conectionString;




                SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
                sqlCom.CommandType = CommandType.StoredProcedure;


                sqlCom.Parameters.Add("@Id", SqlDbType.Int).Value = Id;
                sqlCom.Parameters.Add("@IdMaquinaria", SqlDbType.Int).Value = (object)IdMaquinaria ?? DBNull.Value;
                sqlCom.Parameters.Add("@IdVehiculo", SqlDbType.Int).Value = (object)IdVehiculo ?? DBNull.Value;
                sqlCom.Parameters.Add("@Detalle", SqlDbType.NVarChar).Value = Detalle;
                sqlCom.Parameters.Add("@FechaInicio", SqlDbType.NVarChar).Value = FechaInicio;
                sqlCom.Parameters.Add("@IdEstadoReparacion", SqlDbType.Int).Value = IdEstadoReparacion;
                sqlCom.Parameters.Add("@Costo", SqlDbType.Money).Value = Costo;

                sqlCnn.Open();
                sqlCom.ExecuteNonQuery();
                sqlCnn.Close();
            }

            public void Delete()
            {
                string sqlSentencia = "SP_DeleteReparacion";
                SqlConnection sqlCnn = new SqlConnection();
                sqlCnn.ConnectionString = conectionString;




                SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
                sqlCom.CommandType = CommandType.StoredProcedure;

                sqlCom.Parameters.Add("@Id", SqlDbType.Int).Value = Id;

                sqlCnn.Open();
                sqlCom.ExecuteNonQuery();
                sqlCnn.Close();
            }

            #endregion
        }
    }
}
