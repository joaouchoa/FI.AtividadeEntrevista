var clienteId;

$(document).ready(function () {
    $('#botaoBeneficiarios').show();

    $('#botaoVoltar').on('click', function () {
        $('#botaoBeneficiarios').hide();
        document.getElementById('CPF').readOnly = false;
    });

    setupClienteForm();

    $('#concluirBeneficiarioBtn').on('click', function () {
        submitBeneficiarioForm();
    });
})

function setupClienteForm() {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(toCPFFormat(obj.CPF));
        clienteId = obj.Id;

        document.getElementById('CPF').readOnly = true;
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        const cpfValue = $(this).find("#CPF").val();

        if (!isValidCPF(cpfValue)) {
            ModalDialog("Ocorreu um erro", "Por favor, insira um CPF válido.");
            return;
        }

        const cpf = cpfValue.replace(/\./g, '').replace(/\-/g, '');

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": cpf
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastro")[0].reset();
                    window.location.href = urlRetorno;
                }
        });
    })
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

document.addEventListener('DOMContentLoaded', function () {
    const cpfInput = document.getElementById('CPF');

    cpfInput.addEventListener('input', function () {
        this.value = toCPFFormat(this.value);
    });
});

function abrirModalBeneficiarios() {
    var titulo = "Beneficiários";
    ModalDialog2(titulo);
}

function ModalDialog2(titulo) {
    var random = Math.random().toString().replace('.', '');
    var textoModal = '<div id="' + random + '" class="modal fade">' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content">' +
        '            <div class="modal-header">' +
        '                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
        '                <h4 class="modal-title">' + titulo + '</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <form id="formCadastroBeneficiario" method="post">' +
        '                    <div class="form-group row align-items-end">' +
        '                        <div class="col-md-5">' +
        '                            <label for="CPFBeneficiario">CPF:</label>' +
        '                            <input required="required" type="text" class="form-control" id="CPFBeneficiario" name="CPFBeneficiario" placeholder="Ex.: 010.011.111-00" maxlength="14">' +
        '                        </div>' +
        '                        <div class="col-md-5">' +
        '                            <label for="Nome">Nome:</label>' +
        '                            <input required="required" type="text" class="form-control" id="Nome" name="Nome" placeholder="Ex.: João" maxlength="50">' +
        '                        </div>' +
        '                        <div class="col-md-2">' +
        '                            <label>&nbsp;</label>' +
        '                            <button type="button" id="concluirBeneficiarioBtn" class="btn btn-success btn-block">Concluir</button>' +
        '                        </div>' +
        '                    </div>' +
        '                </form>' +
        '                <hr />' +
        '                <table class="table table-bordered" id="tabelaBeneficiarios">' +
        '                    <thead>' +
        '                        <tr>' +
        '                            <th>CPF</th>' +
        '                            <th>Nome</th>' +
        '                            <th>Ações</th>' +
        '                        </tr>' +
        '                    </thead>' +
        '                    <tbody>' +
        '                        <!-- Dados dos beneficiários serão inseridos aqui -->' +
        '                    </tbody>' +
        '                </table>' +
        '            </div>' +
        '            <div class="modal-footer">' +
        '                <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>' +
        '            </div>' +
        '        </div><!-- /.modal-content -->' +
        '    </div><!-- /.modal-dialog -->' +
        '</div><!-- /.modal -->';

    $('body').append(textoModal);
    var $modal = $('#' + random);

    $modal.modal({
        backdrop: 'static',
        keyboard: false
    });

    $modal.on('shown.bs.modal', function () {
        setupBeneficiarioForm();
        carregarBeneficiarios();
    });

    $modal.on('hidden.bs.modal', function () {
        $modal.remove();
    });

    $modal.modal('show');
}

function carregarBeneficiarios() {
    var clienteIdLong = parseInt(clienteId, 10);

    if (isNaN(clienteIdLong)) {
        alert('ClienteID inválido.');
        return;
    }

    $.ajax({
        url: "/Cliente/BeneficiarioList/",
        method: "GET",
        data: { CLIENTID: clienteIdLong }, 
        success: function (data) {
            console.log('Resposta do servidor:', data);

            if (Array.isArray(data)) {
                var tabela = $('#tabelaBeneficiarios tbody');
                tabela.empty();

                data.forEach(function (beneficiario) {
                    var linha = '<tr>' +
                        '<td>' + toCPFFormat(beneficiario.CPF) + '</td>' +
                        '<td>' + beneficiario.Nome.split(' ')[0] + '</td>' +
                        '<td>' +
                        '<button class="btn btn-sm btn-primary" onclick="alterarBeneficiario(' + beneficiario.Id + ')">Alterar</button> ' +
                        '<button class="btn btn-sm btn-danger" onclick="excluirBeneficiario(' + beneficiario.Id + ')">Excluir</button>' +
                        '</td>' +
                        '</tr>';
                    tabela.append(linha);
                });
            } else {
                alert('Erro ao carregar a lista de beneficiários: formato de resposta inválido.');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Erro ao carregar a lista de beneficiários: ' + textStatus + ' - ' + errorThrown);
            console.log('Detalhes do erro:', jqXHR.responseText);
        }
    });
}

//function alterarBeneficiario(id) {
//    alert('Alterar beneficiário com ID: ' + id);
//}

function excluirBeneficiario(id) {
    if (!confirm('Tem certeza que deseja excluir este beneficiário?')) {
        return;
    }

    $.ajax({
        url: "/Cliente/DeletarBeneficiario/",
        method: "POST",
        data: { ID: id },
        success: function (response) {
            if (response === true) {
                ModalDialog("Sucesso!", "Beneficiário excluído com sucesso!");
                carregarBeneficiarios(); 
            } else {
                ModalDialog("Falha", "Erro ao excluir o beneficiário.");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ModalDialog("Falha", "Erro ao excluir o beneficiário.");
        }
    });
}

function setupBeneficiarioForm() {
    $('#concluirBeneficiarioBtn').off('click').on('click', function () {
        $('#formCadastroBeneficiario').submit();
    });

    $('#formCadastroBeneficiario').off('submit').on('submit', function (e) {
        e.preventDefault(); 

        const cpfValue = $(this).find("#CPFBeneficiario").val();

        if (!isValidCPF(cpfValue)) {
            ModalDialog("Ocorreu um erro", "Por favor, insira um CPF válido.");
            return;
        }

        const cpf = cpfValue.replace(/\./g, '').replace(/\-/g, '');

        $.ajax({
            url: "/Cliente/IncluirBeneficiario/",
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CPF": cpf,
                "CLIENTID": clienteId,
            },
            error: function (r) {
                if (r.status === 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status === 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success: function (r) {
                ModalDialog("Sucesso!", r);
                $("#formCadastroBeneficiario")[0].reset();
                carregarBeneficiarios();
            }
        });
    });

    const cpfInput = document.getElementById('CPFBeneficiario');
    if (cpfInput) {
        cpfInput.addEventListener('input', function () {
            this.value = toCPFFormat(this.value);
        });
    }
}

function ModalDialog3(titulo, beneficiario) {
    var random = Math.random().toString().replace('.', '');
    var textoModal = '<div id="' + random + '" class="modal fade">' +
        '    <div class="modal-dialog">' +
        '        <div class="modal-content">' +
        '            <div class="modal-header">' +
        '                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
        '                <h4 class="modal-title">' + titulo + '</h4>' +
        '            </div>' +
        '            <div class="modal-body">' +
        '                <form id="formEditarBeneficiarioModal" method="post">' +
        '                    <div class="form-group row align-items-end">' +
        '                        <div class="col-md-5">' +
        '                            <label for="CPFBeneficiarioEditar">CPF:</label>' +
        '                            <input type="text" class="form-control" id="CPFBeneficiarioEditar" name="CPFBeneficiarioEditar" value="' + beneficiario.CPF + '" maxlength="14">' +
        '                        </div>' +
        '                        <div class="col-md-5">' +
        '                            <label for="NomeEditar">Nome:</label>' +
        '                            <input type="text" class="form-control" id="NomeEditar" name="NomeEditar" value="' + beneficiario.Nome + '" maxlength="50">' +
        '                        </div>' +
        '                        <div class="col-md-2">' +
        '                            <label>&nbsp;</label>' +
        '                            <button type="button" id="salvarAlteracoesBtn" class="btn btn-success btn-block">Salvar</button>' +
        '                        </div>' +
        '                    </div>' +
        '                </form>' +
        '            </div>' +
        '            <div class="modal-footer">' +
        '                <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>' +
        '            </div>' +
        '        </div><!-- /.modal-content -->' +
        '    </div><!-- /.modal-dialog -->' +
        '</div><!-- /.modal -->';

    $('body').append(textoModal);
    var $modal = $('#' + random);

    $modal.modal({
        backdrop: 'static',
        keyboard: false
    });

    const cpfInput = document.getElementById('CPFBeneficiarioEditar');
    if (cpfInput) {
        cpfInput.addEventListener('input', function () {
            this.value = toCPFFormat(this.value);
        });
    }

    $('#salvarAlteracoesBtn').off('click').on('click', function () {
        salvarAlteracoesBeneficiario(beneficiario.Id);
    });

    $modal.on('hidden.bs.modal', function () {
        $modal.remove();
    });

    $modal.modal('show');
}

function alterarBeneficiario(id) {
    var linha = $('#tabelaBeneficiarios').find('tr').filter(function () {
        return $(this).find('button').attr('onclick') === 'alterarBeneficiario(' + id + ')';
    });

    if (linha.length === 0) {
        alert('Beneficiário não encontrado.');
        return;
    }

    var cpf = linha.find('td').eq(0).text().trim();
    var nome = linha.find('td').eq(1).text().trim();

    var beneficiario = {
        Id: id,
        CPF: cpf,
        Nome: nome
    };

    ModalDialog3('Editar Beneficiário', beneficiario);
}

function salvarAlteracoesBeneficiario(id) {
    var cpf = $('#CPFBeneficiarioEditar').val();

    if (!isValidCPF(cpf)) {
        ModalDialog("Ocorreu um erro", "Por favor, insira um CPF válido.");
        return;
    }

    var cpfLimpo = cpf.replace(/\./g, '').replace(/\-/g, '');
    var nome = $('#NomeEditar').val();

    $.ajax({
        url: "/Cliente/AlterarBeneficiario/",
        method: "POST",
        data: {
            Id: id,
            CPF: cpfLimpo,
            Nome: nome,
            ClienteId: clienteId
        },
        success: function (response) {
            if (response.Success) {
                ModalDialog("Sucesso", "Beneficiário atualizado com sucesso!");
                $('#modalEditarBeneficiario').modal('hide');
                carregarBeneficiarios();
            } else {
                ModalDialog("Erro", 'Erro ao atualizar o beneficiário: ' + response.Message);
            }
        },
        error: function () {
            ModalDialog("Erro", "Erro ao tentar salvar as alterações");
            alert('Erro ao tentar salvar as alterações.');
        }
    });
}