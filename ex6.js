require('dotenv').config();
const axios = require('axios').default;
const readlineSync = require('readline-sync');
const searchTemp = async (latitude, longitude) => {
    let response = await axios.get(process.env.WEATHER_API, {
        params: {
            lat: latitude,
            lon: longitude,
            appid: process.env.API_KEY,
            units: process.env.UNITS
        }
    })    
    return response.data
}

const loop = async () => {
    var opcao;

    do {
        opcao = readlineSync.question('Digite uma das opcões\n 1- Digite latitude e longitude do local desejado\n 2- Sair\n');
        switch (opcao) {
            case '1':         
                let latitude = readlineSync.question('Digite a latitude: ');
                let longitude = readlineSync.question('Digite a longitude: ');
                let data = await searchTemp(latitude, longitude);                         
                console.log(`A temperatura do lugar indicado é: ${data.main.temp}\n`);                    
                break;

            case '2':
                console.log("Saindo");
                break;

            default:
                console.log("Digite uma opção entre 1 ou 2"); 
                break;
        }
    } while(opcao != 2)
}
loop();