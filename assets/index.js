// document.getElementById("tabela").appendChild(criarTabela([
//     ["id", "nome",     "idade"],
//     [1,    "matheus",  16],
//     [2,    "cristian", 16],
//     [3,    "pedro",    10],
//     [4,    "henrique", 10]
//   ]));
var linha = 10;
var coluna = 10;
var marcados = [];
linha = get('linha') != undefined | get('linha') == ''? get('linha') : 10;
coluna = get('coluna') != undefined | get('coluna') == '' ? get('coluna') : 10;
marcados = get('marcados') != undefined | get('marcados') == '' ? get('marcados').split(',') : [];

document.getElementById("tabela").appendChild(criarTabela(gerarTabela(linha,coluna), marcados));


function get(name){
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
     return decodeURIComponent(name[1]);
}

function downloadURI(uri, name) {
  var link = document.createElement("a");

  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  clearDynamicLink(link); 
}

function PrintDiv(id) {
  var element = document.getElementById(id);
  html2canvas(element).then(function (canvas) {
      var myImage = canvas.toDataURL();
      downloadURI(myImage, "TabelaRifa.png");
  });
}


function criarTabela(conteudo, numerosEscolhidos) {
    var tabela = document.createElement("table");
    var tbody = document.createElement("tbody");
    var numLinha = conteudo.length;
    var numColuna = conteudo[numLinha-1].length;
    var numFinal = conteudo[numLinha-1][numColuna-1].toString();
    for (var i=0;i<conteudo.length;i++) {
      var tr = document.createElement("tr");
      for(var o=0;o<conteudo[i].length;o++){
        var t = document.createElement("td");
        for (var j=0;j<numerosEscolhidos.length; j++) {
          var num = padLeft(numerosEscolhidos[j], numFinal.length);
          if(conteudo[i][o] == num){
            t.classList.add("marcado")
          }
          ((o+1) % 2 == 0) ? t.classList.add("par") : t.classList.add("impar");
          }
        var texto=document.createTextNode(conteudo[i][o]);
        t.appendChild(texto);
        tr.appendChild(t);
      }
      tbody.appendChild(tr);
    }
    tabela.appendChild(tbody);
    return tabela;
}

function gerarTabela(linhas, colunas) {
  var numero = 1;
  var lista = [];
  
  for(var i=0; i < linhas; i++){
    var linha = [];
    for(var o=0;o<colunas;o++){
      linha.push(padLeft(numero, (linhas*colunas).toString().length));
      numero++;
    }
    lista.push(linha)
  }

  return lista;
}

function padLeft(nr, n, str){
  return Array(n-String(nr).length+1).join(str||'0')+nr;
}