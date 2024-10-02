using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data;
using System.Data.SqlClient;

namespace WebApi_TrazODS.Models
{
    public class Empleados
    {

        #region Atributos

        string conectionString = @"Data Source=Ecotablas-Db.mssql.somee.com;Initial Catalog=Ecotablas-Db;User ID=lucasclemente08_SQLLogin_1;Password=apqjzszydf";

        #endregion


        #region Propiedades

        public int IdEmpleado { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string DNI { get; set; }
        public string Calle { get; set; }
        public string Numero { get; set; }
        public string Piso { get; set; }
        public string Dpto { get; set; }
        public string CodPostal { get; set; }
        public int IdLocalidad { get; set; }
        public string FechaIngreso { get; set; }
        public string Telefono { get; set; }
        public string Mail { get; set; }
        public int IdArea { get; set; }


        #endregion

        #region Metodos

        public DataTable SelectAll()
        {


            string sqlSentencia = "SP_GetAllEmpleado";


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


            string sqlSentencia = "SP_GetIdEmpleado";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;


            sqlCnn.Open();

            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;
            sqlCom.Parameters.Add("@IdEmpleado", SqlDbType.Int).Value = IdEmpleado;

            DataSet ds = new DataSet();

            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = sqlCom;
            da.Fill(ds);

            sqlCnn.Close();

            return ds.Tables[0];


        }


       public void Insert()
{
    string sqlSentencia = "SP_InsertEmpleado";

    using (SqlConnection sqlCnn = new SqlConnection(conectionString))
    {
        using (SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn))
        {
            sqlCom.CommandType = CommandType.StoredProcedure;

            // Agregar parámetros
            sqlCom.Parameters.Add("@Nombre", SqlDbType.NVarChar).Value = Nombre;
            sqlCom.Parameters.Add("@Apellido", SqlDbType.NVarChar).Value = Apellido;
            sqlCom.Parameters.Add("@DNI", SqlDbType.NVarChar).Value = DNI;
            sqlCom.Parameters.Add("@Calle", SqlDbType.NVarChar).Value = Calle;
            sqlCom.Parameters.Add("@Numero", SqlDbType.NVarChar).Value = Numero;
            sqlCom.Parameters.Add("@Piso", SqlDbType.NVarChar).Value = Piso;
            sqlCom.Parameters.Add("@Dpto", SqlDbType.NVarChar).Value = Dpto;
            sqlCom.Parameters.Add("@CodPostal", SqlDbType.NVarChar).Value = CodPostal;
            sqlCom.Parameters.Add("@IdLocalidad", SqlDbType.Int).Value = IdLocalidad;
            sqlCom.Parameters.Add("@FechaIngreso", SqlDbType.NVarChar).Value = FechaIngreso;
            sqlCom.Parameters.Add("@Telefono", SqlDbType.NVarChar).Value = Telefono;
            sqlCom.Parameters.Add("@Mail", SqlDbType.NVarChar).Value = Mail;
            sqlCom.Parameters.Add("@IdArea", SqlDbType.Int).Value = IdArea;

            try
            {
                sqlCnn.Open();
                sqlCom.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                // Manejar excepciones
                Console.WriteLine("Error al insertar el empleado: " + ex.Message);
            }
        }
    }
}



        public void Update()
        {


            string sqlSentencia = "SP_UpdateEmpleado";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdEmpleado", SqlDbType.Int).Value = IdEmpleado;
            sqlCom.Parameters.Add("@Nombre", SqlDbType.NVarChar).Value = Nombre;
            sqlCom.Parameters.Add("@Apellido", SqlDbType.NVarChar).Value = Apellido;
            sqlCom.Parameters.Add("@DNI", SqlDbType.NVarChar).Value = DNI;
            sqlCom.Parameters.Add("@Calle", SqlDbType.NVarChar).Value = Calle;
            sqlCom.Parameters.Add("@Numero", SqlDbType.NVarChar).Value = Numero;
            sqlCom.Parameters.Add("@Piso", SqlDbType.NVarChar).Value = Piso;
            sqlCom.Parameters.Add("@Dpto", SqlDbType.NVarChar).Value = Dpto;
            sqlCom.Parameters.Add("@CodPostal", SqlDbType.NVarChar).Value = CodPostal;
            sqlCom.Parameters.Add("@IdLocalidad", SqlDbType.Int).Value = IdLocalidad;
            sqlCom.Parameters.Add("@FechaIngreso", SqlDbType.NVarChar).Value = FechaIngreso;
            sqlCom.Parameters.Add("@Telefono", SqlDbType.NVarChar).Value = Telefono;
            sqlCom.Parameters.Add("@Mail", SqlDbType.NVarChar).Value = Mail;
            sqlCom.Parameters.Add("@IdArea", SqlDbType.Int).Value = IdArea;

            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }


        public void Delete()
        {

            string sqlSentencia = "SP_DeleteEmpleado";


            SqlConnection sqlCnn = new SqlConnection();
            sqlCnn.ConnectionString = conectionString;




            SqlCommand sqlCom = new SqlCommand(sqlSentencia, sqlCnn);
            sqlCom.CommandType = CommandType.StoredProcedure;

            sqlCom.Parameters.Add("@IdEmpleado", SqlDbType.Int).Value = IdEmpleado;


            sqlCnn.Open();


            var res = sqlCom.ExecuteNonQuery();


            sqlCnn.Close();


        }

        #endregion




    }
}