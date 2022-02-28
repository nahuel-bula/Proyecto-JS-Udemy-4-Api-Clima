//Selectores
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e){
    e.preventDefault();
    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    if(ciudad === '' || pais === ''){
        mostrarError('Todos los campos son obligatorios');
        return;
    }
    //Consultar API
    consultarApi(ciudad,pais);

}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');
    if(!alerta){
        const alerta = document.createElement('div');
        alerta.className = `bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto mt-6 text-center`;
        alerta.innerHTML = `
            <strong class="font-bold">Error</strong>
            <span class='block'>${mensaje}</span>
        `;
        container.appendChild(alerta);
        setTimeout(()=>{
            alerta.remove();
        },3000)
    }
}

function consultarApi(ciudad,pais){
    const appId = 'c574fe0e4a50011e1f8d101e59ccf4c8';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    spinner();
    fetch(url)
        .then(resultado => resultado.json())
        .then(datos =>{
            if(datos.cod === '404'){
                mostrarError('La ciudad no existe');
                limpiarHtml(resultado);
                return;
            }
            mostrarClima(datos);
        })
}

function mostrarClima(datos){
    limpiarHtml(resultado);
    const { main: { temp, temp_max, temp_min, humidity, feels_like }, name } = datos;
    const tempAct = kelvinACentigrados(temp);
    const tempMin = kelvinACentigrados(temp_min);
    const tempMax = kelvinACentigrados(temp_max);
    const term = kelvinACentigrados(feels_like);
    const actual = document.createElement('p');

    const nomCiudad = document.createElement('p');
    nomCiudad.innerHTML=`
       Clima en ${name}:
       
       
    `;
    nomCiudad.className = `text-2xl`;
    actual.innerHTML=`
        ${tempAct} &#8451;   
    `;
    actual.className = `font-bold text-6xl`;
    const maxmin = document.createElement('p');
    maxmin.innerHTML=`
        Maxima: ${tempMax} &#8451;   Minima: ${tempMin} &#8451;
    `;
    maxmin.className = `text-xl`;
    const termica = document.createElement('p');
    termica.innerHTML=`
        Sensación termica: ${term} &#8451;   
    `;
    termica.className = `text-1xl`;
    const humedad = document.createElement('p');
    humedad.innerHTML=`
        Humedad: % ${humidity}   
    `;
    humedad.className = `text-1xl`;
    const resultadoDiv = document.createElement('div');
    resultadoDiv.className = `text-center text-white`;
    resultadoDiv.appendChild(nomCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(maxmin);
    resultadoDiv.appendChild(termica);
    resultadoDiv.appendChild(humedad);
    resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = grados => parseInt((grados - 273.15).toFixed(1));

function limpiarHtml(dondeBorro){
    while (dondeBorro.firstChild){
        dondeBorro.removeChild(dondeBorro.firstChild)
    }
}

function spinner(){
    limpiarHtml(resultado);
    const divSpinner = document.createElement('div');
    divSpinner.className = `sk-fading-circle`;
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);
}