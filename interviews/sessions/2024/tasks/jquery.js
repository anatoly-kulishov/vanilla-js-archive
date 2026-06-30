
class Query {
    constructor(cssSelector) {
        this.nodes = document.querySelectorAll(cssSelector)
    }
    addClass(className) {
        this.nodes.forEach(node => node.classList.add(className))
        return this
    }
    toggleClass(className) {
        this.nodes.forEach(node => node.classList.toggle(className))
        return this
    }
    removeClass(className) {
        this.nodes.forEach(node => node.classList.remove(className))
        return this
    }
    css(style) {
        this.nodes.forEach(el => {
            for(let [key, value] of Object.entries(style)) {
                el.style[key] = value
            }
        })
        return this
    }
    html(innerHtml) {
        this.nodes.forEach(node => node.innerHTML = innerHtml)
        return this
    }
}

const $ = (selector) => new Query(selector)

const $node = $('.JS-node');

$node
    .addClass('node')
    .addClass('test')
    .toggleClass('item')
    .removeClass('test')
    .css({
        color: 'red',
        paddingTop: '10px'
    })
    .html('<mark>innerHTML</mark>');
