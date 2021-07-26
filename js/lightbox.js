class Lightbox {

    static init () {
        const links = document.querySelectorAll('img[src$=".jpg"],video[src$=".mp4"]')
            .forEach(link => link.addEventListener('click', e =>
            {
                e.preventDefault()
                new Lightbox(e.currentTarget.getAttribute('src'))

            }))
    }

    constructor (url) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = ''

    }

    buildDOM (url) {


    }
}