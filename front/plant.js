const GARDEN_SERVICE = "http://localhost:8002/api"
let todasPlantas = [];
let quantidadeExibida = 3;
let idEditando = null;


function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

function mostrarLoading() {
    const container = document.getElementById("lista-plantas");
    container.innerHTML = `
      <div class="loading-container">
        <div class="spinner"></div>
        <p>Carregando plantas...</p>
      </div>
    `;
}



async function getPlantas() {
    mostrarLoading();

    try {
        const response = await fetch(`${GARDEN_SERVICE}/plants`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });

        const data = await response.json();

        if (!response.ok) {
            todasPlantas = [];
            console.error(data.data);
        } else {
            todasPlantas = data.data
        }

        quantidadeExibida = 3;
        renderizarPlantas();

    } catch (err) {
        console.error(err);
    }
}

function renderizarPlantas() {
    const container = document.getElementById("lista-plantas");

    if (!todasPlantas.length) {
        container.innerHTML = "<p>Nenhuma planta registrada.</p>";
        return;
    }

    const plantasVisiveis = todasPlantas.slice(0, quantidadeExibida);

    const html = plantasVisiveis.map(planta => `
      <div class="data-card">
        <h3>Nome: ${planta.name}</h3>
        <p>Tipo de planta: ${planta.plant_type}</p>
        <small>Data de plantio: ${formatDate(planta.planting_date)}</small>
        <div class="botoes-data">
            <button onclick='editarPlanta(${JSON.stringify(planta)})'>Editar</button>
            <button onclick='excluirPlanta(${JSON.stringify(planta)})'>Excluir</button>
        </div>
      </div>
    `).join("");

    const temMais = quantidadeExibida < todasPlantas.length;
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
    renderizarPlantas();
}

function mostrarMenos() {
    quantidadeExibida = 3;
    renderizarPlantas();
}



document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form-planta").addEventListener("submit", async (e) => {
        e.preventDefault();
        await storePlant();
    });

    getPlantas();
});

async function storePlant() {
    const form = document.getElementById("form-planta");
    const formData = new FormData(form);

    const data = {
        name: formData.get("nome"),
        plant_type: formData.get("tipo"),
        planting_date: formData.get("data_plantio"),
    };

    const url = idEditando
        ? `${GARDEN_SERVICE}/plants/${idEditando}`
        : `${GARDEN_SERVICE}/plants`;

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
        document.querySelector('form button[type="submit"]').textContent = "Cadastrar Planta";
        await getPlantas();

    } catch (err) {
        console.error(err);
    }
}


function editarPlanta(planta) {
    document.querySelector('input[name="nome"]').value = planta.name;
    document.querySelector('input[name="data_plantio"]').value = planta.planting_date;
    document.querySelector('input[name="tipo"]').value = planta.plant_type;

    idEditando = planta.id;

    document.querySelector("nav").scrollIntoView({ behavior: "smooth" });

    document.querySelector('form button[type="submit"]').textContent = "Atualizar Planta";
}

async function excluirPlanta(planta) {
    const confirmacao = confirm(`Tem certeza que deseja excluir a planta "${planta.name}"?`);

    if (!confirmacao) return;

    try {
        const response = await fetch(`${GARDEN_SERVICE}/plants/${planta.id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erro ao excluir:", errorData.message || errorData);
            alert("Erro ao excluir a planta.");
            return;
        }

        alert(`Planta "${planta.name}" excluída com sucesso.`);
        await getPlantas();

    } catch (err) {
        console.error("Erro ao excluir:", err);
        alert("Erro ao excluir a planta.");
    }
}
