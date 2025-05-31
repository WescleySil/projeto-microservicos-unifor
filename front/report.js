const NOTE_SERVICE = "http://localhost:8003/api"
let todasRelatorios = [];
let quantidadeExibida = 3;
let idEditando = null;


function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

function mostrarLoading() {
    const container = document.getElementById("lista-relatorios");
    container.innerHTML = `
      <div class="loading-container">
        <div class="spinner"></div>
        <p>Carregando anotações...</p>
      </div>
    `;
}



async function getRelatorios() {
    mostrarLoading();

    try {
        const response = await fetch(`${NOTE_SERVICE}/reports`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });

        const data = await response.json();

        if (!response.ok) {
            todasRelatorios = [];
            console.error(data.data);
        } else {
            todasRelatorios = data.data
        }

        quantidadeExibida = 3;
        renderizarRelatorios();

    } catch (err) {
        todasRelatorios = [];
        console.error(err);
    }
}

function renderizarRelatorios() {
    const container = document.getElementById("lista-relatorios");

    if (!todasRelatorios.length) {
        container.innerHTML = "<p>Nenhuma relatorio registrada.</p>";
        return;
    }

    const relatoriosVisiveis = todasRelatorios.slice(0, quantidadeExibida);

    const html = relatoriosVisiveis.map(relatorio => `
      <div class="data-card">
        <h3>Nome: ${relatorio.title}</h3>
        <p>Descrição do relatorio: ${relatorio.description}</p>
        <small>Categoria do relatorio: ${relatorio.report_type}</small>
        <div class="botoes-data">
            <button onclick='editarRelatorio(${JSON.stringify(relatorio)})'>Editar</button>
            <button onclick='excluirRelatorio(${JSON.stringify(relatorio)})'>Excluir</button>
        </div>
      </div>
    `).join("");

    const temMais = quantidadeExibida < todasRelatorios.length;
    const temMenos = quantidadeExibida > 3;

    let botoes = `<div class="botoes-data">`;
    if (temMais) {
        botoes += `<button onclick="mostrarMais()">Mostrar mais</button>`;
    }
    if (temMenos && !temMais) {
        botoes += `<button onclick="mostrarMenos()">Mostrar menos</button>`;
    }
    botoes += `</div>`;

    container.innerHTML = html + botoes;
}

function mostrarMais() {
    quantidadeExibida += 3;
    renderizarRelatorios();
}

function mostrarMenos() {
    quantidadeExibida = 3;
    renderizarRelatorios();
}



document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form-relatorio").addEventListener("submit", async (e) => {
        e.preventDefault();
        await storePlant();
    });

    getRelatorios();
});

async function storePlant() {
    const form = document.getElementById("form-relatorio");
    const formData = new FormData(form);

    const data = {
        title: formData.get("titulo"),
        description: formData.get("descricao"),
        report_type: formData.get("categoria"),
    };

    const url = idEditando
        ? `${NOTE_SERVICE}/reports/${idEditando}`
        : `${NOTE_SERVICE}/reports`;

    const method = idEditando ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            const messages = Object.values(result.errors || {}).flat().join("\n");
            console.error(messages);
            return;
        }

        form.reset();
        idEditando = null;
        document.querySelector('form button[type="submit"]').textContent = "Gerar Relatorio";
        await getRelatorios();

    } catch (err) {
        console.error(err);
    }
}


function editarRelatorio(relatorio) {
    document.querySelector('input[name="titulo"]').value = relatorio.title;
    document.querySelector('textarea[name="descricao"]').value = relatorio.description;
    document.querySelector('input[name="categoria"]').value = relatorio.report_type;

    idEditando = relatorio.id;

    document.querySelector("nav").scrollIntoView({ behavior: "smooth" });

    document.querySelector('form button[type="submit"]').textContent = "Atualizar Relatorio";
}

async function excluirRelatorio(relatorio) {
    const confirmacao = confirm(`Tem certeza que deseja excluir o relatorio "${relatorio.title}"?`);

    if (!confirmacao) return;

    try {
        const response = await fetch(`${NOTE_SERVICE}/reports/${relatorio.id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erro ao excluir:", errorData.message || errorData);
            alert("Erro ao excluir a relatorio.");
            return;
        }

        alert(`Relatorio "${relatorio.title}" excluída com sucesso.`);
        await getRelatorios();

    } catch (err) {
        console.error("Erro ao excluir:", err);
        alert("Erro ao excluir a relatorio.");
    }
}
