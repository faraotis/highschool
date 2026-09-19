let divMenu = document.querySelector('#menu')
let navMenu = document.querySelector('menu')
const inputSearch = document.getElementById('search')

function openMenu() {
    navMenu.classList.toggle('open')
}
document.addEventListener('click', (event) => {
    if (navMenu.classList.contains('open')) {
        if (!navMenu.contains(event.target) && !divMenu.contains(event.target)) {
            navMenu.classList.remove('open')
        }
    }
})

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

inputSearch.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()

        const noResults = document.getElementById('no_results');
        const firstVisibleItem = document.querySelector('.item:not([style*="display: none"])')

        if (noResults && noResults.style.display !== 'none') {
            noResults.scrollIntoView({ behavior: 'smooth', block: 'center' })
        } else if (firstVisibleItem) {
            firstVisibleItem.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }
})

function formatString(value) {
    return value
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

var lupaSearch = document.querySelector('#search-lupa')
var boxSearch = document.querySelector('#box-search')

boxSearch.addEventListener('click', function(event) {
    lupaSearch.style.color = 'transparent'
})

document.addEventListener('click', function(event) {
    if (!boxSearch.contains(event.target)) {
        lupaSearch.style.color = 'black'
    }
})

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
// Carregar aula


function closeContent() {
    document.getElementById("loadcontent").innerHTML = ''
    Main.style.display = 'grid'
}

function carregarAula(caminhoAula, event) {
    if (event) event.preventDefault()

    const container = document.getElementById('loadcontent')
    container.innerHTML = '<p style="padding: 20px; text-align: center;">Carregando...</p>'

    fetch(`${caminhoAula}.html`)
        .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo')
        }
        return response.text()
        })
        .then(html => {
        container.innerHTML = html
        
        container.scrollIntoView({ behavior: 'smooth' })
        })
        .catch(error => {
        container.innerHTML = '<p style="padding: 20px; text-align: center;">Erro 404: Conteúdo não encontrado.</p>'
        console.error(error)
        });
}

function fecharAula(event) {
    if (event) event.preventDefault();
    const container = document.getElementById('loadcontent')
    if (container) {
        container.innerHTML = ''
    }
}
