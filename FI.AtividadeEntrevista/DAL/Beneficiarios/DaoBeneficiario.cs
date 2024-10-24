using FI.AtividadeEntrevista.DML;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.DAL
{
    internal class DaoBeneficiario : AcessoDados
    {
        /// <summary>
        /// Inclui um novo cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        internal long Incluir(DML.Beneficiario beneficiario)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("Nome", beneficiario.Nome));
            parametros.Add(new System.Data.SqlClient.SqlParameter("IDCLIENTE", beneficiario.ClientID));
            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", beneficiario.CPF));

            DataSet ds = base.Consultar("FI_SP_IncBeneficiario", parametros);
            long ret = 0;
            if (ds.Tables[0].Rows.Count > 0)
                long.TryParse(ds.Tables[0].Rows[0][0].ToString(), out ret);
            return ret;
        }

        /// <summary>
        /// Verificar Existencia do Beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de cliente</param>
        internal bool VerificarExistencia(long Id, string CPF)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("IDCLIENTE", Id));
            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", CPF));

            DataSet ds = base.Consultar("FI_SP_VerificaBeneficiario", parametros);

            return ds.Tables[0].Rows.Count > 0;
        }

        private List<DML.Beneficiario> Converter(DataSet ds)
        {
            List<DML.Beneficiario> lista = new List<DML.Beneficiario>();
            if (ds != null && ds.Tables != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    DML.Beneficiario cli = new DML.Beneficiario();
                    cli.Id = row.Field<long>("ID");
                    cli.Nome = row.Field<string>("NOME");
                    cli.ClientID = row.Field<long>("IDCLIENTE");
                    cli.CPF = row.Field<string>("CPF");
                    lista.Add(cli);
                }
            }

            return lista;
        }

        /// <summary>
        /// Lista todos os BeneficiarioS
        /// </summary>
        internal List<DML.Beneficiario> Listar(long ClientID)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("@CLIENTEID", ClientID));

            DataSet ds = base.Consultar("FI_SP_ConsBeneficiario", parametros);

            List<DML.Beneficiario> cli = Converter(ds);

            return cli;
        }

        /// <summary>
        /// Lista todos os BeneficiarioS
        /// </summary>
        internal bool Deletar(long ID)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("@ID", ID));

            DataSet ds = base.Consultar("FI_SP_DelBeneficiario", parametros);

            if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                int resultado = Convert.ToInt32(ds.Tables[0].Rows[0]["Result"]);
                return resultado == 1;
            }

            return false;
        }

        /// <summary>
        /// Atualizar Beneficiario
        /// </summary>
        internal bool Alterar(DML.Beneficiario beneficiario)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("Nome", beneficiario.Nome));
            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", beneficiario.CPF));
            parametros.Add(new System.Data.SqlClient.SqlParameter("ID", beneficiario.Id));
            //parametros.Add(new System.Data.SqlClient.SqlParameter("IDCLIENTE", beneficiario.ClientID));

            try
            {
                base.Executar("FI_SP_AltBenef", parametros);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// Atualizar Beneficiario
        /// </summary>
        internal Beneficiario Consulta(long Id)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("ID", Id));

            DataSet ds = base.Consultar("FI_SP_ConsBeneficiarioPorID", parametros);

            if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                var row = ds.Tables[0].Rows[0];
                Beneficiario beneficiario = new Beneficiario
                {
                    Id = Convert.ToInt64(row["ID"]),
                    Nome = row["NOME"].ToString(),
                    CPF = row["CPF"].ToString(),
                    ClientID = Convert.ToInt64(row["IDCLIENTE"])
                };
                return beneficiario;
            }
            return null;
        }
    }
}
