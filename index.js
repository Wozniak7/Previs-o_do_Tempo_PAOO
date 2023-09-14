require('dotenv').config()
const axios = require('axios')
// const matematica = require ('./matematica')
// console.log(matematica.soma(1, 2))
console.log(process.env)

const {appid, q, unit, cnt, language, url} = process.env

const end = `${url}?appid=${appid}&q=${q}&unit=${unit}&cnt=${cnt}&lang=${language}`

//async/await

async function teste (){
    const resultado = await axios.get(end)
    for (let previsao of resultado.data.list){
        console.log(`Descrição: ${previsao.weather[0].description}`)
    }
}
teste()


// function fatorial(n){
//     if (n<0) return Promisse.reject("n não pode ser negativo")
//     let i = 1;
//     for (let i = 1; i<= n; i++) res *= i
//     return Promisse.resolve(res)
// }
// const chamadaComAsyncEAwait = async () => {
//     try{
//     const resultado = await fatorial(10)
//     console.log(resultado)
//     }
//     catch(e){
//         console.log("Erro: " + e)
//     }
// }

// function chamadaComThenECatch(){
//     fatorial(-1)
//     .then(res => console.log(res))
//     .catch(erro => console.log("Erro: " + erro))
// }
// chamadaComThenECatch()
// chamadaComAsyncEAwait()

// async function hello(){
//     return "hello"
// }
// hello().then(res => console.log(res))


// axios.get(end).then((res) => {
//     // console.log(res['data'])
//     // console.log("-------------------------")
//     return res['data']
// })
// .then((res) => {
//     // console.log(res.list)
//     // console.log("-----------------------------")
//     return res.list
// })

// .then(res => {
//     for(let previsao of res){
//         console.log(new Date (+previsao.dt * 1000).toLocaleString())
//         console.log(`Temperatura mínima: ${previsao.main.temp_min}`)
//         console.log(`Temperatura máxima: ${previsao.main,temp_max}`)
//         console.log("*********************************")
// }
// console.log("----------------------")
// })

