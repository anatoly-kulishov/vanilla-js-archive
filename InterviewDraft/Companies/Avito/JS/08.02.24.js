// Задача 1 [{a: 5, b:2}, {a: 5, b:2}, {a: 5, b:2}, 5]
let x = {a: 1, b: 2};

function fn1(x) {s
    x.a = 5;
}

function fn2() {
    x.a = 5;
}

function fn3(x) {
    x = 5;
}

function fn4() {
    x = 5;
}

fn1(x);
console.log(x); // ?

fn2(x);
console.log(x); // ?

fn3(x);
console.log(x); // ?

fn4(x);
console.log(x); // ?


// Задача 2
function fn() {
    console.log('hello'); // 1

    setTimeout(function() {
        console.log('setTimeout1'); // 6
    }, 0);

    new Promise(function(resolve) {
        resolve();
        console.log('resolve') // 2
    }).then(function() {
        console.log('then1'); // 4
    }).then(function() {
        console.log('then2'); // 5
    });

    console.log('bye'); // 3
}

fn();

// Задача 3
const $ = (selector) => new Query(selector)
const $node = $('.JS-node');

class Query {
    constructor(cssSelector) {
        this.nodes = document.querySelectorAll(cssSelector)
    }
    addClass(className) {
        this.nodes.forEach(el => el.classList.add(className))
        return this
    }
    toggleClass(className) {
        this.nodes.forEach(el => el.classList.toggle(className))
        return this
    }
    removeClass(className) {
        this.nodes.forEach(el => el.classList.remove(className))
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
        this.nodes.forEach(el => el.innerHtml = innerHtml)
        return this
    }
}

$node
    .addClass('node')
    .toggleClass('item')
    .removeClass('node')
    .css({
        color: 'red',
        paddingTop: '10px'
    })
    .html('<li>hello</li>');
