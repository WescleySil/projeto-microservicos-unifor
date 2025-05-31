const AUTH_SERVICE = "http://localhost:8001/api";

async function cadastrarUsuario(nome, email, senha) {
    try {
        const response = await fetch(`${AUTH_SERVICE}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ name: nome, email, password: senha })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "Erro no cadastro");
        }

        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
    } catch (err) {
        alert("Erro: " + err.message);
    }
}

async function fazerLogin(email, senha) {
    try {
        const response = await fetch(`${AUTH_SERVICE}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({ login: email, password: senha })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "Credenciais inválidas");
        }

        const data = await response.json();
        await localStorage.setItem("token", data.data.token);
        alert("Login realizado com sucesso!");
        window.location.href = "index.html";
    } catch (err) {
        alert("Erro: " + err.message);
    }
}


function verificarAutenticacao() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
    }
}

function configurarMenuAutenticado() {
    const token = localStorage.getItem("token");

    if (token) {
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.textContent === 'Login') {
                link.textContent = 'Sair';
                link.href = '#';
                link.onclick = () => {
                    localStorage.removeItem("token");
                    alert("Você saiu!");
                    location.reload();
                };
            }
        });
    }
}

