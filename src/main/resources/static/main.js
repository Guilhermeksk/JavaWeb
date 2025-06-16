const API = 'http://localhost:9000/api/v1/card';

function carregar() {
    const tabela = document.getElementById('tabelaCartoes');
    tabela.innerHTML = `
        <tr>
            <td colspan="7" class="px-6 py-12 text-center">
                <div class="flex justify-center items-center">
                    <svg class="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span class="ml-2 text-gray-500">Carregando cartões...</span>
                </div>
            </td>
        </tr>
    `;
    
    fetch(`${API}/list`)
    .then(res => res.json())
    .then(dados => {
        tabela.innerHTML = '';
        if (dados.length === 0) {
            tabela.innerHTML = `
                <tr>
                    <td colspan="7" class="px-6 py-12 text-center">
                        <div class="text-gray-500">
                            <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p class="text-lg font-medium text-gray-900 mb-1">Nenhum cartão cadastrado</p>
                            <p class="text-gray-500">Comece adicionando seu primeiro cartão acima.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }
        
        dados.forEach(c => {
            const statusBadge = c.status === 1 
                ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Ativo</span>'
                : '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Inativo</span>';
            
            const tipoFormatado = c.tipo.charAt(0).toUpperCase() + c.tipo.slice(1);
            
            tabela.innerHTML += `
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${c.id_card}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${c.nome_card}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">${c.numero}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${tipoFormatado}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">${c.cvv}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${statusBadge}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onclick="editarCartao(${c.id_card}, '${c.nome_card}', '${c.numero}', '${c.tipo}', ${c.cvv}, ${c.status})" 
                                class="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-md hover:bg-blue-100 transition-colors mr-2">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            Editar
                        </button>
                        <button onclick="deletar(${c.id_card})" 
                                class="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 text-sm font-medium rounded-md hover:bg-red-100 transition-colors">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });
    })
    .catch(err => {
        tabela.innerHTML = `
            <tr>
                <td colspan="7" class="px-6 py-12 text-center">
                    <div class="text-red-500">
                        <svg class="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <p class="text-lg font-medium text-gray-900 mb-1">Erro ao carregar cartões</p>
                        <p class="text-gray-500">${err.message}</p>
                    </div>
                </td>
            </tr>
        `;
    });
}

function editarCartao(id, nome, numero, tipo, cvv, status) {
    // Preenche os campos
    document.getElementById('id_card').value = id;
    document.getElementById('nome_card').value = nome;
    document.getElementById('numero').value = numero;
    document.getElementById('tipo').value = tipo;
    document.getElementById('cvv').value = cvv;
    document.getElementById('status').value = status;
    
    // Altera o estado dos botões para modo edição
    document.getElementById('btnSalvar').style.display = 'none';
    document.getElementById('btnAtualizar').style.display = 'inline-flex';
    document.getElementById('btnCancelar').style.display = 'inline-flex';
    document.getElementById('btnLimpar').style.display = 'none';
    
    // Altera o título da seção
    const titulo = document.querySelector('.form-section h2');
    titulo.innerHTML = `
        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
        <span class="text-blue-600">Editando Cartão #${id}</span>
    `;
    
    // Scroll suave para o formulário
    document.querySelector('.form-section').scrollIntoView({
        behavior: 'smooth'
    });
}

function cancelarEdicao() {
    limparCampos();
    voltarModoNovo();
}

function voltarModoNovo() {
    // Volta o estado dos botões para modo novo
    document.getElementById('btnSalvar').style.display = 'inline-flex';
    document.getElementById('btnAtualizar').style.display = 'none';
    document.getElementById('btnCancelar').style.display = 'none';
    document.getElementById('btnLimpar').style.display = 'inline-flex';
    
    // Volta o título original
    const titulo = document.querySelector('.form-section h2');
    titulo.innerHTML = `
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
        Adicionar / Atualizar Cartão
    `;
}

function carregarCampos(id, nome, numero, tipo, cvv, status) {
    editarCartao(id, nome, numero, tipo, cvv, status);
}

function limparCampos() {
    document.getElementById('id_card').value = '';
    document.getElementById('nome_card').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('cvv').value = '';
    document.getElementById('status').value = '1';
    voltarModoNovo();
}

function salvar() {
    const dados = capturarDados();
    if (!validarDados(dados)) return;
    
    fetch(`${API}/save`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(res => {
        mostrarNotificacao(`✅ ${res.message}`, 'success');
        limparCampos();
        carregar();
    })
    .catch(err => {
        mostrarNotificacao(`❌ Erro: ${err.message}`, 'error');
    });
}

function atualizar() {
    const dados = capturarDados();
    if (!dados.id_card) {
        mostrarNotificacao('⚠️ Erro interno: ID não encontrado', 'warning');
        return;
    }
    if (!validarDados(dados)) return;
    
    fetch(`${API}/update`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(res => {
        mostrarNotificacao(`✅ ${res.message}`, 'success');
        limparCampos();
        carregar();
    })
    .catch(err => {
        mostrarNotificacao(`❌ Erro: ${err.message}`, 'error');
    });
}

function deletar(id) {
    if (confirm('🗑️ Tem certeza que deseja excluir este cartão?')) {
        fetch(`${API}/delete/${id}`)
        .then(res => res.json())
        .then(res => {
            mostrarNotificacao(`✅ ${res.message}`, 'success');
            carregar();
        })
        .catch(err => {
            mostrarNotificacao(`❌ Erro: ${err.message}`, 'error');
        });
    }
}

function capturarDados() {
    return {
        id_card: parseInt(document.getElementById('id_card').value) || 0,
        nome_card: document.getElementById('nome_card').value.trim(),
        numero: document.getElementById('numero').value.trim(),
        tipo: document.getElementById('tipo').value,
        cvv: parseInt(document.getElementById('cvv').value) || 0,
        status: parseInt(document.getElementById('status').value) || 1
    };
}

function validarDados(dados) {
    if (!dados.nome_card) {
        mostrarNotificacao('⚠️ Nome do cartão é obrigatório', 'warning');
        return false;
    }
    if (!dados.numero) {
        mostrarNotificacao('⚠️ Número do cartão é obrigatório', 'warning');
        return false;
    }
    if (!dados.tipo) {
        mostrarNotificacao('⚠️ Tipo do cartão é obrigatório', 'warning');
        return false;
    }
    if (!dados.cvv || dados.cvv < 100 || dados.cvv > 9999) {
        mostrarNotificacao('⚠️ CVV deve ter 3 ou 4 dígitos', 'warning');
        return false;
    }
    return true;
}

function mostrarNotificacao(mensagem, tipo) {
    // Por simplicidade, usando alert. Em produção, seria melhor um toast/notification
    alert(mensagem);
}

// Carrega a lista ao abrir
carregar();
