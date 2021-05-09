// document.getElementById("tabela").appendChild(criarTabela([
//     ["id", "nome",     "idade"],
//     [1,    "matheus",  16],
//     [2,    "cristian", 16],
//     [3,    "pedro",    10],
//     [4,    "henrique", 10]
//   ]));

document.getElementById("tabela").appendChild(criarTabela(gerarTabela(10,10), [1, 5, 10, 100]));

html2canvas($("#widget"), {
  onrendered: function(canvas) {
      $("#btnSave").attr("href", canvas.toDataURL());
  }
});



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