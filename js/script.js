/* ============================================================
   UP DIGITAL 2026 - SCRIPT GLOBAL INTEGRADO (VERSÃO FINAL)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONFIGURAÇÃO DE ROTAS POR PERFIL ---
    const rotas = {
        'ADMINISTRADOR': {
            'btnInicio': 'perfiladm.html',
            'btnConta': 'perfiladm.html',
            'btnArquivos': 'avaliacaodehoras.html',
            'btnRegras': 'cadastrocursoeregras.html',
            'btnDashboard': 'relatoriocoordenadoreadm.html'
        },
        'COORDENADOR': {
            'btnInicio': 'perfilcoordenador.html',
            'btnConta': 'perfilcoordenador.html',
            'btnArquivos': 'avaliacaodehoras.html',
            'btnRegras': 'cadastrocursoeregras.html',
            'btnDashboard': 'relatoriocoordenadoreadm.html'
        },
        'ALUNO': {
            'btnInicio': 'perfilaluno.html',
            'btnConta': 'perfilaluno.html',
            'btnArquivos': 'uploadaluno.html',
            'btnRegras': 'visualizacaoderegrasalunos.html',
            'btnDashboard': 'relatorioaluno.html'
        }
    };

    // --- 2. LÓGICA DE LOGIN ---
    const btnEntrar = document.getElementById('btnEntrar');
    if (btnEntrar) {
        btnEntrar.onclick = (e) => {
            e.preventDefault();
            const perfil = document.getElementById('tipoPerfil').value;

            if (!perfil || perfil === "PERFIL") {
                alert("Selecione um perfil!");
                return;
            }

            localStorage.setItem('tipoUsuario', perfil);
            console.log("Login realizado como:", perfil);
            
            // Redireciona para a home do perfil
            window.location.href = rotas[perfil].btnInicio;
        };
    }

    // 3. Aplicação Automática da Sidebar em TODAS as páginas
    const configurarNavegação = () => {
        const usuarioAtivo = localStorage.getItem('tipoUsuario');
        console.log("Configurando menu para:", usuarioAtivo);

        if (usuarioAtivo && rotas[usuarioAtivo]) {
            const mapa = rotas[usuarioAtivo];

            Object.keys(mapa).forEach(id => {
                const botao = document.getElementById(id);
                if (botao) {
                    botao.onclick = () => {
                        window.location.href = mapa[id];
                    };
                } else {
                    console.warn(`Aviso: Botão com ID '${id}' não encontrado nesta página.`);
                }
            });
        }
    };

    configurarNavegação();

    // 4. Logout
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.onclick = () => {
            localStorage.removeItem('tipoUsuario');
            window.location.href = "index.html";
        };
    }

    // 5. Sidebar Toggle
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    if (menuBtn && sidebar) {
        menuBtn.onclick = () => sidebar.classList.toggle('open');
    }
});

    // --- 6. SISTEMA DE BUSCA ---
    const realizarBusca = (inputId) => {
        const input = document.getElementById(inputId);
        if (input && input.value.trim() !== "") {
            alert(`Buscando por: ${input.value}`);
        }
    };

    // Lupa de busca genérica
    const lupa = document.getElementById('lupaBusca') || document.getElementById('searchIcon');
    if (lupa) {
        lupa.onclick = () => {
            const idInput = document.getElementById('inputBuscaCurso') ? 'inputBuscaCurso' : 'searchInput';
            realizarBusca(idInput);
        };
    }

    // --- 7. ATALHOS DE CADASTRO (EXCLUSIVO ADM/COORD) ---
    const gerenciarBotoesCadastro = () => {
        document.getElementById('btnCadastrarCoordenador')?.addEventListener('click', () => {
            window.location.href = "cadastrocoordenador.html";
        });
        document.getElementById('btnCadastrarCursoRegras')?.addEventListener('click', () => {
            window.location.href = "cadastrocursoeregras.html";
        });
        document.getElementById('btnCadastrarAluno')?.addEventListener('click', () => {
            window.location.href = "cadastroaluno.html";
        });
    };
    gerenciarBotoesCadastro();

const configurarNavegação = () => {
    const usuarioAtivo = localStorage.getItem('tipoUsuario');
    if (usuarioAtivo && rotas[usuarioAtivo]) {
        const mapa = rotas[usuarioAtivo];
        Object.keys(mapa).forEach(id => {
            const botao = document.getElementById(id);
            if (botao) {
                botao.onclick = () => {
                    window.location.href = mapa[id];
                };
            }
            // Removi o console.warn para limpar seu console de erros irrelevantes
        });
    }
    /* --- 8. LÓGICA DE AVALIAÇÃO E CERTIFICADOS (IMAGENS 1 E 2) --- */
const processarCertificado = (id, acao) => {
    // acao pode ser 'aprovar' ou 'rejeitar'
    console.log("Certificado " + id + " status alterado para: " + acao);
    alert("Certificado processado com sucesso!");
    // Aqui você pode adicionar a lógica para esconder a linha ou mudar a cor
};

const abrirModalCertificado = (dados) => {
    const areaSelect = document.getElementById('areaSelect');
    const cargaHoraria = document.getElementById('cargaInput');
    
    if (areaSelect && cargaHoraria) {
        // Preenche os campos baseado no desenho da Imagem 2
        console.log("Editando certificado de: " + dados);
    }
};

/* --- 9. GERAÇÃO DE PDF (IMAGEM 1) --- */
const baixarRelatorioPDF = () => {
    // Verifica se a biblioteca jsPDF está carregada no HTML
    if (window.jspdf) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.text("RELATORIO DE HORAS COMPLEMENTARES", 10, 10);
        doc.text("Status: Finalizado", 10, 20);
        doc.text("Data de Geracao: " + new Date().toLocaleDateString(), 10, 30);
        
        doc.save("relatorio-horas.pdf");
    } else {
        alert("Funcao de PDF: Documento gerado com sucesso (Simulacao).");
    }
};

// Vincula o botão de PDF se ele existir na página
const btnPDF = document.getElementById('btnGerarPDF') || document.querySelector('.btn-pdf');
if (btnPDF) {
    btnPDF.onclick = () => baixarRelatorioPDF();
}

/* --- 10. GESTÃO DE CURSOS E REGRAS (IMAGEM 3) --- */
const btnNovoCurso = document.getElementById('btnNovoCurso');
if (btnNovoCurso) {
    btnNovoCurso.onclick = () => {
        // Lógica para abrir o formulário de cadastro que você desenhou na Imagem 3
        const formCadastro = document.getElementById('sessaoCadastroCurso');
        if (formCadastro) {
            formCadastro.style.display = 'block';
        }
    };
}

const salvarRegraCurso = () => {
    const nomeCurso = document.getElementById('inputNomeCurso')?.value;
    const cargaCurso = document.getElementById('inputCargaCurso')?.value;
    
    if (nomeCurso && cargaCurso) {
        console.log("Novo curso salvo: " + nomeCurso);
        alert("Regra de curso cadastrada!");
    } else {
        alert("Preencha todos os campos da regra.");
    }
};
/* --- 11. LÓGICA ESPECÍFICA: AVALIAÇÃO DE HORAS --- */
document.addEventListener('click', (e) => {
    // Captura cliques nos ícones de status (check, warn, error)
    const target = e.target;
    
    if (target.classList.contains('check') || target.classList.contains('error') || target.classList.contains('warn')) {
        const itemArquivo = target.closest('.item-arquivo');
        const nomeArquivo = itemArquivo.querySelector('span').innerText;
        
        if (target.classList.contains('check')) {
            alert('Arquivo ' + nomeArquivo + ' aprovado com sucesso.');
            // Lógica para mover visualmente (opcional para protótipo)
            console.log('Status: Aprovado');
        } else if (target.classList.contains('error')) {
            const motivo = prompt('Digite o motivo da reprovação:');
            if (motivo) {
                alert('Arquivo reprovado. Motivo: ' + motivo);
            }
        } else if (target.classList.contains('warn')) {
            alert('Arquivo marcado como pendente.');
        }
    }
});

// Melhora a função de PDF para a tela de Avaliação
const btnGerarPDF = document.querySelector('.btn-footer.blue');
if (btnGerarPDF && document.title.includes("Avaliação")) {
    btnGerarPDF.onclick = (e) => {
        e.preventDefault();
        // Se quiser usar a biblioteca jsPDF instalada:
        if (window.jspdf) {
            baixarRelatorioPDF(); 
        } else {
            // Caso contrário, usa a função de impressão do navegador formatada
            window.print();
        }
    };
}
function abrirModal(tipo, cursoNome) {
    const modal = document.getElementById("modalAcoes");
    const title = document.getElementById("modalTitle");
    const body = document.getElementById("modalBody");

    modal.style.display = "block";

    if (tipo === 'regras') {
        title.innerText = `Regras para: ${cursoNome}`;
        body.innerHTML = `
            <div class="form-group">
                <label>Tipo de Regra:</label>
                <select id="tipoRegra">
                    <option value="complementar">Carga Horária Complementar</option>
                    <option value="workshop">Workshop</option>
                    <option value="palestra">Palestras</option>
                    <option value="monitoria">Monitorias</option>
                    <option value="estagio">Estágio</option>
                </select>
            </div>
            <div class="form-group">
                <label>Carga Horária (horas):</label>
                <input type="number" id="horaRegra" placeholder="Ex: 20">
            </div>
            <button class="btn-salvar" onclick="salvarRegra()">Adicionar Regra</button>
        `;
    } else if (tipo === 'editar') {
        title.innerText = `Editar Curso: ${cursoNome}`;
        body.innerHTML = `<p>Formulário de edição para o curso ${cursoNome}...</p>`;
    } else if (tipo === 'excluir') {
        title.innerText = `Excluir Curso?`;
        body.innerHTML = `
            <p>Tem certeza que deseja excluir o curso <strong>${cursoNome}</strong>?</p>
            <button class="btn-salvar" style="background-color: #dc3545;">Confirmar Exclusão</button>
        `;
    }
}

function fecharModal() {
    document.getElementById("modalAcoes").style.display = "none";
}

// Fecha o modal se o usuário clicar fora dele
window.onclick = function(event) {
    let modal = document.getElementById("modalAcoes");
    if (event.target == modal) fecharModal();
}



};

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileNameDisplay');

// Abre seletor de arquivo ao clicar na div
dropZone.addEventListener('click', () => fileInput.click());

// Mostra o nome do arquivo selecionado
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        fileNameDisplay.innerText = fileInput.files[0].name;
        fileNameDisplay.style.color = "#2e7d32";
    }
});

// Exemplo de função para atualizar o dashboard
function atualizarDashboard(dados) {
    document.getElementById('totalHoras').innerText = dados.total + 'h';
    document.getElementById('percentualConclusao').innerText = dados.percentual + '%';
    
    // Atualiza a largura da barra de progresso
    const barra = document.querySelector('.progress-fill');
    if(barra) barra.style.width = dados.percentual + '%';
}

// Simulação de chamada após selecionar um aluno
// atualizarDashboard({ total: 180, percentual: 90 });

function iniciarAnalise(aluno, arquivo) {
    const modal = document.getElementById('modalAnalise');
    
    if (modal) {
        document.getElementById('nomeAlunoModal').innerText = aluno;
        document.getElementById('nomeArquivoModal').innerText = arquivo;
        modal.style.display = 'flex';
    }
}

function fecharModal() {
    const modal = document.getElementById('modalAnalise');
    if (modal) modal.style.display = 'none';
}

function finalizarAvaliacao(resultado) {
    const aluno = document.getElementById('nomeAlunoModal').innerText;
    const justificativa = document.getElementById('justificativa').value;

    if (resultado === 'reprovado' && justificativa.trim() === "") {
        alert("Por favor, informe o motivo da reprovação.");
        return;
    }

    alert(`O arquivo de ${aluno} foi ${resultado.toUpperCase()} com sucesso.`);
    fecharModal();
    // Aqui você adicionaria a lógica para remover a linha da tabela ou atualizar o banco
};

function gerarRelatorioPDF() {
    // Seleciona o conteúdo que você quer converter (ex: a tabela de validação)
    const elemento = document.querySelector('.container-avaliacao'); 
    
    if (!elemento) {
        alert("Erro: Conteúdo da tabela não encontrado.");
        return;
    }

    const opcoes = {
        margin:       10,
        filename:     'Relatorio_Validacao_Horas.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' } // Horizontal para tabelas
    };

    // Inicia o processo de geração
    html2pdf().set(opcoes).from(elemento).save();
};