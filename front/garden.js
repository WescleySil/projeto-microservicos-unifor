const GARDEN_SERVICE = "http://localhost:8002/api"
let todasHortas = [];
let quantidadeExibida = 3;

function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

async function getHortas() {
    try {
        const response = await fetch(`${GARDEN_SERVICE}/gardens`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });

        if (!response.ok) {
            const data = await response.json();
            console.error(data.data);
        }

        const data = await response.json();
        todasHortas = data.data;
        quantidadeExibida = 3;
        renderizarHortas();

    } catch (err) {
        console.error(err);
    }
}

function renderizarHortas() {
    const container = document.getElementById("lista-hortas");

    if (!todasHortas.length) {
        container.innerHTML = "<p>Nenhuma horta registrada.</p>";
        return;
    }

    const hortasVisiveis = todasHortas.slice(0, quantidadeExibida);

    const html = hortasVisiveis.map(horta => `
      <div class="horta-card">
        <h3>Nome: ${horta.name}</h3>
        <p>Descrição: ${horta.description}</p>
        <small>Data de plantio: ${formatDate(horta.planting_date)}</small>
        <button onclick='editarHorta(${JSON.stringify(horta)})'>Editar</button>
      </div>
    `).join("");

    const temMais = quantidadeExibida < todasHortas.length;
    const temMenos = quantidadeExibida > 3;

    let botoes = `<div class="botoes-hortas">`;
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
    renderizarHortas();
}

function mostrarMenos() {
    quantidadeExibida = 3;
    renderizarHortas();
}



document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form-horta").addEventListener("submit", async (e) => {
        e.preventDefault();
        await storeGarden();
    });

    getHortas();
});

async function storeGarden() {
    const form = document.getElementById("form-horta");
    const formData = new FormData(form);

    const data = {
        name: formData.get("nome"),
        description: formData.get("descricao"),
        planting_date: formData.get("data_plantio"),
    };

    try {
        const response = await fetch(`${GARDEN_SERVICE}/gardens`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const messages = Object.values(errorData.errors || {}).flat().join("\n");
            console.error(messages);
        }

        form.reset();
        await getHortas();

    } catch (err) {
        console.error(err);
    }
}

function editarHorta(horta) {
    document.querySelector('input[name="nome"]').value = horta.name;
    document.querySelector('input[name="data_plantio"]').value = horta.planting_date;
    document.querySelector('textarea[name="descricao"]').value = horta.description;

    idEditando = horta.id;

    document.querySelector("nav").scrollIntoView({ behavior: "smooth" });

    document.querySelector('form button[type="submit"]').textContent = "Atualizar Horta";
}