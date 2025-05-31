const NOTE_SERVICE = "http://localhost:8003/api"
let todasAnotacoes = [];
let quantidadeExibida = 3;
let idEditando = null;


function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

function mostrarLoading() {
    const container = document.getElementById("lista-anotacoes");
    container.innerHTML = `
      <div class="loading-container">
        <div class="spinner"></div>
        <p>Carregando anotações...</p>
      </div>
    `;
}



async function getAnotacoes() {
    mostrarLoading();

    try {
        const response = await fetch(`${NOTE_SERVICE}/notes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });

        const data = await response.json();

        if (!response.ok) {
            todasAnotacoes = [];
            console.error(data.data);
        } else {
            todasAnotacoes = data.data
        }

        quantidadeExibida = 3;
        renderizarAnotacoes();

    } catch (err) {
        todasAnotacoes = [];
        console.error(err);
    }
}

function renderizarAnotacoes() {
    const container = document.getElementById("lista-anotacoes");

    if (!todasAnotacoes.length) {
        container.innerHTML = "<p>Nenhuma anotacao registrada.</p>";
        return;
    }

    const anotacoesVisiveis = todasAnotacoes.slice(0, quantidadeExibida);

    const html = anotacoesVisiveis.map(anotacao => `
      <div class="data-card">
        <h3>Nome: ${anotacao.title}</h3>
        <p>Tipo de anotacao: ${anotacao.note}</p>
        <small>Data de criação: ${anotacao.created_at}</small>
        <div class="botoes-data">
            <button onclick='editarAnotacao(${JSON.stringify(anotacao)})'>Editar</button>
            <button onclick='excluirAnotacao(${JSON.stringify(anotacao)})'>Excluir</button>
        </div>
      </div>
    `).join("");

    const temMais = quantidadeExibida < todasAnotacoes.length;
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
    renderizarAnotacoes();
}

function mostrarMenos() {
    quantidadeExibida = 3;
    renderizarAnotacoes();
}



document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form-anotacao").addEventListener("submit", async (e) => {
        e.preventDefault();
        await storeNote();
    });

    getAnotacoes();
});

async function storeNote() {
    const form = document.getElementById("form-anotacao");
    const formData = new FormData(form);

    const data = {
        title: formData.get("titulo"),
        note: formData.get("anotacao"),
    };

    const url = idEditando
        ? `${NOTE_SERVICE}/notes/${idEditando}`
        : `${NOTE_SERVICE}/notes`;

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
        document.querySelector('form button[type="submit"]').textContent = "Adicionar Nota";
        await getAnotacoes();

    } catch (err) {
        console.error(err);
    }
}


function editarAnotacao(anotacao) {
    document.querySelector('input[name="titulo"]').value = anotacao.title;
    document.querySelector('textarea[name="anotacao"]').value = anotacao.note;

    idEditando = anotacao.id;

    document.querySelector("nav").scrollIntoView({ behavior: "smooth" });

    document.querySelector('form button[type="submit"]').textContent = "Atualizar Anotacao";
}

async function excluirAnotacao(anotacao) {
    const confirmacao = confirm(`Tem certeza que deseja excluir a anotacao "${anotacao.title}"?`);

    if (!confirmacao) return;

    try {
        const response = await fetch(`${NOTE_SERVICE}/notes/${anotacao.id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erro ao excluir:", errorData.message || errorData);
            alert("Erro ao excluir a anotacao.");
            return;
        }

        alert(`Anotação "${anotacao.title}" excluída com sucesso.`);
        await getAnotacoes();

    } catch (err) {
        console.error("Erro ao excluir:", err);
        alert("Erro ao excluir a anotacao.");
    }
}
