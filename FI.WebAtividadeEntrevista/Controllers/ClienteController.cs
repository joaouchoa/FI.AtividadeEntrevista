using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FI.AtividadeEntrevista.DML;
using System.Runtime.InteropServices;
using FI.WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class ClienteController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Incluir()
        {
            return View();
        }

        [HttpPost]
        public ActionResult DeletarBeneficiario(long id) 
        {
            BoBeneficiario bo = new BoBeneficiario();

            var result = bo.Deletar(id);

            if(result)
                return Json(true);
            else
                return Json(false);
        }

        [HttpPost]
        public ActionResult IncluirBeneficiario(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            //var result = bo.VerificarExistencia(model.ClientID, model.CPF);
            if (bo.VerificarExistencia(model.ClientID, model.CPF))
                ModelState.AddModelError("CPF", "Já existe um cadastro de Beneficiário vinculado a esse Cliente.");

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                string errosFormatados = "";
                foreach (var erro in erros)
                {
                    errosFormatados += $"<p>{erro}<p>";
                }

                Response.StatusCode = 400;
                return Json(errosFormatados);
            }
            else
            {
                model.Id = bo.Incluir(new Beneficiario()
                {
                    Nome = model.Nome,
                    CPF = model.CPF,
                    ClientID = model.ClientID
                });

                return Json("Cadastro efetuado com sucesso");
            }
        }

        [HttpPost]
        public JsonResult Incluir(ClienteModel model)
        {
            BoCliente bo = new BoCliente();

            if (bo.VerificarExistencia(model.CPF))
                ModelState.AddModelError("CPF", "Já existe um cadastro com esse CPF.");

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                string errosFormatados = "";
                foreach (var erro in erros)
                {
                    errosFormatados += $"<p>{erro}<p>";
                }

                Response.StatusCode = 400;
                return Json(errosFormatados);
            }
            else
            {
                model.Id = bo.Incluir(new Cliente()
                {
                    CEP = model.CEP,
                    Cidade = model.Cidade,
                    Email = model.Email,
                    Estado = model.Estado,
                    Logradouro = model.Logradouro,
                    Nacionalidade = model.Nacionalidade,
                    Nome = model.Nome,
                    Sobrenome = model.Sobrenome,
                    Telefone = model.Telefone,
                    CPF = model.CPF
                });

                return Json("Cadastro efetuado com sucesso");
            }
        }

        [HttpPost]
        public JsonResult Alterar(ClienteModel model)
        {
            try
            {
                BoCliente bo = new BoCliente();

                var entity = bo.Consultar(model.Id);

                if (entity == null)
                {
                    return Json("Beneficiário não encontrado.");
                }

                if (!this.ModelState.IsValid)
                {
                    List<string> erros = (from item in ModelState.Values
                                          from error in item.Errors
                                          select error.ErrorMessage).ToList();

                    string errosFormatados = "";
                    foreach (var erro in erros)
                    {
                        errosFormatados += $"<p>{erro}<p>";
                    }

                    Response.StatusCode = 400;
                    return Json(errosFormatados);
                }
                else
                {
                    var atualizado = bo.Alterar(new Cliente()
                    {
                        Id = model.Id,
                        CEP = model.CEP,
                        Cidade = model.Cidade,
                        Email = model.Email,
                        Estado = model.Estado,
                        Logradouro = model.Logradouro,
                        Nacionalidade = model.Nacionalidade,
                        Nome = model.Nome,
                        Sobrenome = model.Sobrenome,
                        Telefone = model.Telefone,
                        CPF = model.CPF
                    });

                    if (atualizado)
                    {
                        return Json(new { Success = true, Message = "Cliente atualizado com sucesso." });
                    }
                    else
                    {
                        return Json(new { Success = false, Message = "Erro ao atualizar o Cliente." });
                    }
                }
            }
            catch (Exception ex) 
            {
                return Json(new { Success = false, Message = "Ocorreu um erro: " + ex.Message });
            }
            
        }

        [HttpPost]
        public ActionResult AlterarBeneficiario(Beneficiario beneficiario)
        {
            try
            {
                var beneficiarioExistente = new BoBeneficiario().Consulta(beneficiario.Id);
                if (beneficiarioExistente == null)
                {
                    return Json("Beneficiário não encontrado.");
                }

                var atualizado = new BoBeneficiario().Alterar(beneficiario);
                if (atualizado)
                {
                    return Json(new { Success = true, Message = "Beneficiário atualizado com sucesso." });
                }
                else
                {
                    return Json(new { Success = false, Message = "Erro ao atualizar o beneficiário." });
                }
            }
            catch (Exception ex)
            {

                return Json(new { Success = false, Message = "Ocorreu um erro: " + ex.Message });
            }
        }

        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoCliente bo = new BoCliente();
            Cliente cliente = bo.Consultar(id);
            Models.ClienteModel model = null;

            if (cliente != null)
            {
                model = new ClienteModel()
                {
                    Id = cliente.Id,
                    CEP = cliente.CEP,
                    Cidade = cliente.Cidade,
                    Email = cliente.Email,
                    Estado = cliente.Estado,
                    Logradouro = cliente.Logradouro,
                    Nacionalidade = cliente.Nacionalidade,
                    Nome = cliente.Nome,
                    Sobrenome = cliente.Sobrenome,
                    Telefone = cliente.Telefone,
                    CPF = cliente.CPF
                };


            }

            return View(model);
        }

        [HttpGet]
        public JsonResult BeneficiarioList(long CLIENTID)
        {
            try
            {
                List<Beneficiario> list = new BoBeneficiario().Listar(CLIENTID);

                // Permite que o JSON seja retornado em uma requisição GET
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult ClienteList(int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                int qtd = 0;
                string campo = string.Empty;
                string crescente = string.Empty;
                string[] array = jtSorting.Split(' ');

                if (array.Length > 0)
                    campo = array[0];

                if (array.Length > 1)
                    crescente = array[1];

                List<Cliente> clientes = new BoCliente().Pesquisa(jtStartIndex, jtPageSize, campo, crescente.Equals("ASC", StringComparison.InvariantCultureIgnoreCase), out qtd);

                //Return result to jTable
                return Json(new { Result = "OK", Records = clientes, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}