/*
A declaração async function define uma função assíncrona e o operador await é utilizado para esperar por 
uma Promise. Dessa maneira, nossa requisição funcionará corretamente.
*/
const cep = document.querySelector('#cep');
const logradouro = document.querySelector('#endereco');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');
const mensagemErro = document.querySelector('#erro');

mensagemErro.innerHTML = '';

async function buscaEndereco(cep){ //async significa que essa é uma função assíncrona//
    try {
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`) //fetch é um método assíncrono que tem como parâmetro a url de uma API, esta por sua vez é a responsável pelo trânsito de dados entre a aplicação e o servidor
        let consultaCEPObjetoJS = await consultaCEP.json(); //O corpo da resposta de uma requisição chega em formato de bytes. Desta forma o .json() transforma o corpo e retorna um json formatado. O formato JSON (JavaScript Object Notation) possui basicamente a mesma sintaxe que a de um objeto JS.
        
        if(consultaCEPObjetoJS.erro){ //Na consulta viacep, se o cep corresponder a quantidade de números e for inexistente, a propriedade erro recebe o valor true
            throw Error('CEP não existente');
        }

        logradouro.value = consultaCEPObjetoJS.logradouro;
        bairro.value = consultaCEPObjetoJS.bairro;
        cidade.value = consultaCEPObjetoJS.localidade;
        estado.value = consultaCEPObjetoJS.uf;

        return consultaCEPObjetoJS;
    } 
    catch (error) {
        console.log(error);
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente.</p>`;    
    }  
}

cep.addEventListener('focusout', () => {
    buscaEndereco(cep.value);
});
