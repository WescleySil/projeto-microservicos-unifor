document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "594d135b3cb340b79d233250250405";
    const cidade = "Fortaleza";
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cidade}&lang=pt`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const temp = data.current.temp_c;
        const condicao = data.current.condition.text;
        const icon = "https:" + data.current.condition.icon;
        const umidade = data.current.humidity;
        const vento = data.current.wind_kph;
        const precipitacao = data.current.precip_mm;
  
        document.getElementById("clima-temp").textContent = `${temp}°C`;
        document.getElementById("clima-condicao").textContent = condicao;
        document.getElementById("clima-icon").src = icon;
        document.getElementById("clima-icon").alt = condicao;
        document.getElementById("clima-umidade").textContent = `Umidade: ${umidade}%`;
        document.getElementById("clima-precipitacao").textContent = `Precipitação: ${precipitacao} mm`;
        document.getElementById("clima-vento").textContent = `Vento: ${vento} km/h`;
      })
      .catch((error) => {
        console.error("Erro ao buscar clima:", error);
        document.getElementById("clima-condicao").textContent = "Erro ao carregar";
      });
  
      
  });