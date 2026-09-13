let divMenu = document.querySelector('#menu')
let navMenu = document.querySelector('menu')
var cont = 1
const inputSearch = document.getElementById('search')

function openMenu() {
    cont++
    navMenu.style.transitionDuration = '0.3s'
    if(cont%2 == 0) {
        navMenu.style.transform = 'translate(calc(100vw - 315px), 68%)'
    } else {
        navMenu.style.transform = 'translate(calc(100vw - 315px), -68%)'
    }
}

//PESQUISAR


const fisicaTitle = document.querySelector('.fisica-title')
const quimicaTitle = document.querySelector('.quimica-title')
const matematicaTitle = document.querySelector('.matematica-title')
const biologiaTitle = document.querySelector('.biologia-title')
const Main = document.getElementsByTagName('main')[0]

inputSearch.addEventListener('input', (event) => {
    const value = formatString(event.target.value)
    const items = document.querySelectorAll('.items .item')
    const noResults = document.getElementById('no_results')
    const noResultsBack = document.getElementById('no_results_back')

    let hasResults = false

    items.forEach(item => {
        const itemTitle = item.querySelector('.item-title').textContent

        if(formatString(itemTitle).indexOf(value) !== -1) {
            item.style.display = 'flex'
            item.style.marginTop = '0px'

            hasResults = true
        } else {
            item.style.display = 'none'
        }
    })

    if (hasResults) {
        noResults.style.display = 'none'
        noResultsBack.style.display = 'none'
    } else {
        noResults.style.display = 'block'
        noResultsBack.style.display = 'block'
    }

    // Esconder os títulos
    inputSearch.addEventListener('input', (event) => {
        const value = event.target.value.trim()

        if (value !== '') {
            // Esconde os títulos
            fisicaTitle.style.display = 'none'
            quimicaTitle.style.display = 'none'
            matematicaTitle.style.display = 'none'
            biologiaTitle.style.display = 'none'
        } else {
            // Mostra os títulos de novo
            fisicaTitle.style.display = 'block'
            quimicaTitle.style.display = 'block'
            matematicaTitle.style.display = 'block'
            biologiaTitle.style.display = 'block'
        }

        const allItemsContainers = document.querySelectorAll('.items')
        allItemsContainers.forEach(container => {
            const visibleItems = container.querySelectorAll('.item:not([style*="display: none"])')

            if (visibleItems.length === 0) {
                container.style.display = 'none'
            } else {
                container.style.display = 'flex'
            }
        })
    })
})

function formatString(value) {
    return value
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}


// colors
var body = document.getElementsByTagName('body')[0]
var contColor = 0
var totalPaletas = 2 // Quantidade de paletas

function ColorChange() {
    contColor += 1
    if (contColor > totalPaletas) {
        contColor = 1
    }
    if(contColor == 5) {
        body.classList.add("paleta" + Number(contColor + 1))
        body.classList.remove("paleta" + contColor)
    } if(contColor != 5) {
        body.classList.add("paleta" + Number(contColor + 1))
        body.classList.remove("paleta" + contColor)
    }
}

function closeContent() {
    // Clear the content
    document.getElementById("loadcontent").innerHTML = '';
    Main.style.display = 'grid'
}

function carregarAula(caminhoAula, event) {
    // Evita que o link tente mudar de página de forma tradicional
    if (event) event.preventDefault();

    const container = document.getElementById('loadcontent');
    
    // Feedback visual enquanto o arquivo é carregado
    container.innerHTML = '<p style="padding: 20px; text-align: center;">Carregando...</p>';

    // Faz a requisição para buscar o HTML da aula (ex: p/fisica/analise-dimensional.html)
    fetch(`p/${caminhoAula}.html`)
        .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo');
        }
        return response.text();
        })
        .then(html => {
        // Injeta o conteúdo puro retornado do arquivo dentro do seu div
        container.innerHTML = html;
        
        // Rola a tela suavemente até a área do novo conteúdo
        container.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
        container.innerHTML = '<p style="padding: 20px; text-align: center;">Erro 404: Conteúdo não encontrado.</p>';
        console.error(error);
        });
}

function fecharAula(event) {
    if (event) event.preventDefault();
    const container = document.getElementById('loadcontent');
    if (container) {
        container.innerHTML = ''; // Limpa o conteúdo da aula e volta para os cards principais
    }
}