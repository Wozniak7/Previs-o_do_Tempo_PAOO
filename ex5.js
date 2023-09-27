require('dotenv').config();
const axios = require('axios').default;
const readlineSync = require('readline-sync');

const searchTemps = async (latitude, longitude) => {
    try {
        const response = await axios.get(process.env.WEATHER_API, {
            params: {
                lat: latitude,
                lon: longitude,
                appid: process.env.API_KEY,
                units: process.env.UNITS
            }
        });
        // console.log(response.data)
        if (response.data && response.data.main && response.data.main.temp) {
            return response.data.main.temp;
        } else {
            throw new Error('Dados de temperatura não encontrados na resposta da API.');
        }
    } catch (error) {
        throw new Error('Erro ao buscar temperatura: ' + error.message);
    }
};


const main = async () => {
    console.log('Bem-vindo!\n');

    while (true) {
        const opcao = readlineSync.question('Digite uma das opcoes abaixo:\n\n1- Buscar a temperatura com base na latitude e longitude\n2- Sair\n');

        switch (opcao) {
            case '1':
                const latitude = readlineSync.question('Informe a latitude: ');
                const longitude = readlineSync.question('Informe a longitude: ');

                try {
                    const temperatura = await searchTemps(latitude, longitude);
                    console.log(`\nA temperatura do local indicado é: ${temperatura}°\n`);
                } catch (error) {
                    console.log(error.message);
                }
                break;

            case '2':
                console.log('Encerrando');
                return;

            default:
                console.log('Digite uma opção válida');
                break;
        }
    }
};

main();
