

// buscar elemento do mundo html (    SE USA O jQuery("")     )    usando . para buscar por classe OU (usar $ para escrever menos)

$(document).ready(function(){
    initTamanhoFrase();
    initContador();
    initTempo();
})

function initTamanhoFrase(){
    // usa .text para buscar o texto que ta dentro da classe frase
    var frase = $(".frase").text();
    // função split transforma a string(frase) em uma array // o .length conta o tamanho da array
    var numPalavras = frase.split(/\S+/).length
    // função .text pode inserir um valor dentro de um identificador por id
    var tamanhoFrase = $("#tamanho-frase").text(numPalavras);
}



// buscar eventos feitos no DOM, como click, scroll, duplo click
// no caso, uso o .on("click") para identificar um click, passando uma função anonima com function(){}
var campo = $(".campo");

function initContador(){
    // posso usar o .on("input") para atualizar oq ta sendo digitado em tempo real
    campo.on("input", function(){
    // uso o .val para buscar oq foi escrito dentro da caixa e texto
    var conteudo = campo.val();
                                // SERVE PARA BUSCAR POR QUALQUER ESPAÇO VAZIO 
    var qtdPalavras = conteudo.split(/\S+/).length - 1
    var tamanho = $("#palavras").text(qtdPalavras)
    // .length busca a quantidade 
    var qtdCarac = conteudo.length
    var tamanho = $("#caracteres").text(qtdCarac)
})
}


function initTempo(){
    var tempoRestante = $("#tempo").text();
    // ativando o campo de texto // UTILIZANDO A FUNÇÃO ONE, faz a mesma coisa do on, so que so executa uma vez
    campo.one("focus", function(){
            // função pra chamar algo em determinada quantidade de tempo
        var contadorTempo = setInterval(function(){
                tempoRestante--;
                $("#tempo").text(tempoRestante);
                if(tempoRestante <= 0){
                    // uso essa função para modificar o atributo de uma tag
                    campo.attr("disabled", true);
                    // uso o clearInterval para interromper o funcionamento do setInterval
                    clearInterval(contadorTempo);
                    inserePlacar();
                }
            },1000)
    })
}

function inserePlacar(){     // .find serve pra procurar algo dentro de uma seção
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "André";
    var numberPalavras = $("#palavras").text();
    var btnRemover = "<a class='btnExcluir' href='#'><i>Apagar</i></a>"
    

    var linha = "<tr>"+
                        "<td>"+ usuario +"</td>"+
                        "<td>"+ numberPalavras+"</td>"+
                        "<td>"+ btnRemover+"</td>"
                "</tr>";
                // adicionar um html dentro de algo
    corpoTabela.append(linha);
}


$(".btnExcluir").click(function(event){
    event.preventDefault();
    //pegar o propio elemento clickado com this // subindo na arvore do html com parent
    $(this).parent().parent().remove();
});

// posso usar o .click para substituir o on("click")
$("#reiniciar").click(function(){
    // voltando a caixa de texto para ativada
    campo.attr("disabled", false)
    // colocando o valor 2 no id #tempo do DOM
    $("#tempo").text("5");
    $("#caracteres").text("X");
    $("#palavras").text("X");
    campo.val("")
    initTempo()
    
})



