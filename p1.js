require('dotenv').config();
const axios = require('axios').default;
const readlineSync = require('readline-sync');

const searchTemps = async (CityName) => {
    try {
        const response = await axios.get(process.env.WEATHER_API, {
            params: {
                q: CityName,
                appid: process.env.API_KEY,
                units: process.env.UNITS
            }
        });

        if (response.data && response.data.main && response.data.weather && response.data.weather.length > 0) {
            const temperatura = response.data.main.temp;
            const sensacaoTermica = response.data.main.feels_like;
            const descricaoClima = response.data.weather[0].description;
            const latitude = response.data.coord.lat;
            const longitude = response.data.coord.lon;

            return { temperatura, sensacaoTermica, descricaoClima, latitude, longitude };
        } else {
            throw new Error('Dados de clima nao encontrados na resposta da API.');
        }
    } catch (error) {
        throw new Error('Erro ao buscar informacoes de clima: ' + error.message);
    }
};

const main = async () => {
    while (true) {
        const opcao = readlineSync.question(
            'Digite uma das opcoes abaixo:\n\n1- Buscar informacoes de clima com base na latitude e longitude\n2- Sair\n');

        switch (opcao) {
            case '1':
                const cityName = process.env.CITY_NAME; 
                try {
                    const infoClima = await searchTemps(cityName);
                    console.log(`\nA temperatura atual é: ${infoClima.temperatura}°C`);
                    console.log(`\nSensação térmica: ${infoClima.sensacaoTermica}°C`);
                    console.log(`\nDescrição do clima: ${infoClima.descricaoClima}`);
                    console.log(`\nLatitude do local: ${infoClima.latitude}`);
                    console.log(`\nLongitude do local: ${infoClima.longitude}\n`);
                } catch (error) {
                    console.log(error.message);
                }
                break;

            case '2':
                console.log('Encerrando');
                return;


            // default:
            //     console.log('Digite uma opcao valida');
            //     break;
        }
    }
};

main();
