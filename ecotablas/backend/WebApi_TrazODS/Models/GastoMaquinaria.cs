using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace WebApi_TrazODS.Models
{
    public class GastoMaquinaria
    {
        #region Atributos
        string connectionString = @"Data Source=Ecotablas-Db.mssql.somee.com;Initial Catalog=Ecotablas-Db;User ID=lucasclemente08_SQLLogin_1;Password=apqjzszydf";
        #endregion

        public int IdGastoMaquinaria { get; set; }
        public string TipoGasto { get; set; }
        public string TipoComprobante { get; set; }
        public int Id_Maquinaria { get; set; }
        public string Comprobante { get; set; }
        public string Proveedor { get; set; }
        public decimal Monto { get; set; }
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; }

        public DataTable SelectAll()
        {
            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                SqlCommand sqlCom = new SqlCommand("sp_GetAllGastoMaquinaria", sqlCnn)
                {
                    CommandType = CommandType.StoredProcedure
                };

                SqlDataAdapter da = new SqlDataAdapter(sqlCom);
                DataTable dt = new DataTable();
                da.Fill(dt);
                return dt;
            }
        }

        public void Insert()
        {
            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                SqlCommand sqlCom = new SqlCommand("sp_InsertGastoMaquinaria", sqlCnn)
                {
                    CommandType = CommandType.StoredProcedure
                };

                sqlCom.Parameters.AddWithValue("@TipoGasto", TipoGasto);
                sqlCom.Parameters.AddWithValue("@TipoComprobante", TipoComprobante);
                sqlCom.Parameters.AddWithValue("@Id_Maquinaria", Id_Maquinaria);
                sqlCom.Parameters.AddWithValue("@Comprobante", Comprobante);
                sqlCom.Parameters.AddWithValue("@Proveedor", Proveedor);
                sqlCom.Parameters.AddWithValue("@Monto", Monto);
                sqlCom.Parameters.AddWithValue("@Fecha", Fecha);
                sqlCom.Parameters.AddWithValue("@Descripcion", Descripcion);

                sqlCnn.Open();
                sqlCom.ExecuteNonQuery();
            }
        }

        public void Update()
        {
            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                SqlCommand sqlCom = new SqlCommand("sp_UpdateGastoMaquinaria", sqlCnn)
                {
                    CommandType = CommandType.StoredProcedure
                };

                sqlCom.Parameters.AddWithValue("@IdGastoMaquinaria", IdGastoMaquinaria);
                sqlCom.Parameters.AddWithValue("@TipoGasto", TipoGasto);
                sqlCom.Parameters.AddWithValue("@TipoComprobante", TipoComprobante);
                sqlCom.Parameters.AddWithValue("@Id_Maquinaria", Id_Maquinaria);
                sqlCom.Parameters.AddWithValue("@Comprobante", Comprobante);
                sqlCom.Parameters.AddWithValue("@Proveedor", Proveedor);
                sqlCom.Parameters.AddWithValue("@Monto", Monto);
                sqlCom.Parameters.AddWithValue("@Fecha", Fecha);
                sqlCom.Parameters.AddWithValue("@Descripcion", Descripcion);

                sqlCnn.Open();
                sqlCom.ExecuteNonQuery();
            }
        }

        public void Delete()
        {
            using (SqlConnection sqlCnn = new SqlConnection(connectionString))
            {
                SqlCommand sqlCom = new SqlCommand("sp_DeleteGastoMaquinaria", sqlCnn)
                {
                    CommandType = CommandType.StoredProcedure
                };

                sqlCom.Parameters.AddWithValue("@IdGastoMaquinaria", IdGastoMaquinaria);

                sqlCnn.Open();
                sqlCom.ExecuteNonQuery();
            }
        }
    }
}
