const buttonConvert = document.querySelector(".button")
const valueOptions = document.querySelector("#select2")

async function convertValue() {
    const valorInput = document.querySelector(".inputValue").value
    const valueReal = document.querySelector("#b1") //Valor Real
    const valueConvert = document.querySelector(".us") //Valor Dolar
    const textMoeda = document.querySelector("#money-Us")

    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL").then(response => response.json())
    console.log(data)
    const dolarToday = parseFloat(data.USDBRL.bid)
    const euroToday = parseFloat(data.EURBRL.bid)
    const libraToday = parseFloat(data.GBPBRL.bid)
    const biticoinToday = parseFloat(data.BTCBRL.bid)


    const changeImag = document.querySelector(".estados-unidos")

    if (!valorInput || isNaN(parseFloat(valorInput))) {
        valueReal.innerHTML = "R$ 0,00"
        valueConvert.innerHTML = valueOptions.value === "dolar" ? "US$ 0,00" : "€ 0,00"
        return
    }

    // Atualizar o nome da moeda
    if (valueOptions.value == "dolar") {
        textMoeda.innerHTML = "Dólar Americano"
        changeImag.src = "./assets/estados-unidos (1) 1.png"
    } else if (valueOptions.value == "euro") {
        textMoeda.innerHTML = "Euro"
        changeImag.src = "./assets/euro.png"
    }

    if (valueOptions.value === "dolar") {
        const convertedValue = parseFloat(valorInput) / dolarToday
        valueConvert.innerHTML = "US$ " + convertedValue.toFixed(2)
    } else if (valueOptions.value === "euro") {
        const convertedValue = parseFloat(valorInput) / euroToday
        valueConvert.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(convertedValue)
    }

    if (valueOptions.value === "libra"){
        textMoeda.innerHTML = "Libra Esterlina"
        changeImag.src = "./assets/libra 1.png"
        const convertedValue = parseFloat(valorInput) / libraToday
        valueConvert.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(convertedValue)
    }

    if (valueOptions.value === "biticoin"){
        textMoeda.innerHTML = "Biticoin"
        changeImag.src = "./assets/bitcoin 1.png"
        const convertedValue = parseFloat(valorInput) / biticoinToday
        valueConvert.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "BTC"
        }).format(convertedValue)
    }

    valueReal.innerHTML = "R$ " + parseFloat(valorInput).toFixed(2)

    console.log("Conversão realizada")// Para verificar se está funcionando
}


buttonConvert.addEventListener("click", convertValue)
valueOptions.addEventListener("change", convertValue)

