const exchangeRateElement = document.querySelector('#exchangeRate .value');
const gdpElement = document.querySelector('#gdp .value');
const inflationElement = document.querySelector('#inflation .value');
const unemploymentElement = document.querySelector('#unemployment .value');

const exchangeRateAPI = 'https://api.exchangerate-api.com/v4/latest/BOB'; // Usa tu propia API si es necesario

const worldBankAPI = 'https://api.worldbank.org/v2/country/BO/indicator/NY.GDP.MKTP.CD?format=json'; // PIB de Bolivia
const inflationAPI = 'https://api.worldbank.org/v2/country/BO/indicator/FP.CPI.TOTL.ZG?format=json'; // Inflación
const unemploymentAPI = 'https://api.worldbank.org/v2/country/BO/indicator/SL.UEM.TOTL.ZS?format=json'; // Tasa de desempleo

async function fetchData() {
    try {
        const responseRate = await fetch(exchangeRateAPI);
        const rateData = await responseRate.json();
        const exchangeRate = rateData.rates['USD'];  
        exchangeRateElement.textContent = `1 BOB = ${exchangeRate.toFixed(2)} USD`;

        const responseGDP = await fetch(worldBankAPI);
        const gdpData = await responseGDP.json();
        const gdp = gdpData[1][0].value;
        gdpElement.textContent = gdp ? gdp.toLocaleString() : 'Datos no disponibles';

        const responseInflation = await fetch(inflationAPI);
        const inflationData = await responseInflation.json();
        const inflation = inflationData[1][0].value;
        inflationElement.textContent = inflation ? `${inflation.toFixed(2)}%` : 'Datos no disponibles';

        const responseUnemployment = await fetch(unemploymentAPI);
        const unemploymentData = await responseUnemployment.json();
        const unemployment = unemploymentData[1][0].value;
        unemploymentElement.textContent = unemployment ? `${unemployment.toFixed(2)}%` : 'Datos no disponibles';

    } catch (error) {
        console.error('Error al obtener los datos:', error);
        exchangeRateElement.textContent = 'Error al cargar';
        gdpElement.textContent = 'Error al cargar';
        inflationElement.textContent = 'Error al cargar';
        unemploymentElement.textContent = 'Error al cargar';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const indicatorContainers = document.querySelectorAll('.indicator-container');

    setTimeout(() => {

        indicatorContainers.forEach(container => {

            container.addEventListener('click', () => {

                container.classList.toggle('flipped');

            });

        });

    }, 100);

});

fetchData();

// Actualizar los datos cada 30 minutos
setInterval(fetchData, 1800000);
