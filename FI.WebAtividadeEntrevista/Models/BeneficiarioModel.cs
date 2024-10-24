using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Text;

namespace FI.WebAtividadeEntrevista.Models
{
    public class BeneficiarioModel
    {
        // <summary>
        /// Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// Nome
        /// </summary>
        [Required]
        public string Nome { get; set; }

        /// <summary>
        /// Telefone
        /// </summary>
        [Required]
        public string CPF { get; set; }

        // <summary>
        /// ClientID
        /// </summary>
        [Required]
        public long ClientID { get; set; }
    }
}