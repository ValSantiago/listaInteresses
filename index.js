function atualizarListaInteresses () {
    const interessesSalvos = JSON.parse (localStorage.getItem ("meus-interesses")) || [];

    const lista = document.getElementById ("lista-interesses");
    lista.innerHTML = "";

    interessesSalvos.forEach (interesse => {
        const li = document.createElement ("li");
        li.textContent = interesse;
        lista.appendChild (li);
    })
}

document.getElementById ("adicionar").addEventListener ("click", () => {
    const input = document.getElementById ("interesse");
    const novoInteresse = input.value.trim ();

    if (novoInteresse) {
        const interessesSalvos = JSON.parse (localStorage.getItem ("meus-interesses")) || [];

        interessesSalvos.push (novoInteresse);

        localStorage.setItem ("meus-interesses", JSON.stringify (interessesSalvos));

        input.value = "";

        atualizarListaInteresses ();
    }
});

document.getElementById ("limpar-lista").addEventListener ("click", () => {
    localStorage.removeItem ("meus-interesses");

    atualizarListaInteresses ();
});

setInterval (atualizarListaInteresses, 1000);

function buscarNoticiaIBGE () {
    fetch ("https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release")
        .then (response => response.json ())
        .then (data => {
            const primeiraNoticia = data.items [0].titulo

            document.querySelector (".title-news-today").textContent = primeiraNoticia;
        })
        .catch (error => {
            console.error ("Erro ao carregar a notícia: ", error);
            document.querySelector (".title-news-today").textContent = "Erro ao carregar a notícia";
        })
};

buscarNoticiaIBGE ();