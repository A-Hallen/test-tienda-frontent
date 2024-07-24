let lastScrollTop = 0;

function getScrollToTop(objReference, element) {
    // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
    element.addEventListener("scroll", function () { // or window.addEventListener("scroll"....
        let st = element.scrollTop;
        if (st > lastScrollTop) {
            objReference.invokeMethodAsync("ScrollTop", false, st);
            // downscroll code
        } else if (st < lastScrollTop) {
            objReference.invokeMethodAsync("ScrollTop", true, st);
            // upscroll code
        } // else was horizontal scroll
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);
}

function ScrollToLeft(element, amount) {
    element.scrollLeft -= amount
}

function ScrollToRight(element, amount) {
    element.scrollLeft += amount
}

function createRipple(button, componentInstance, RippleColor) {
    button.onclick = async function (e) {
        let x = e.clientX - e.target.offsetLeft
        let y = e.clientY - e.target.offsetTop
        let rect = e.target.getBoundingClientRect();
        let top = e.clientY - rect.top;
        let left = e.clientX - rect.left;
        console.log("x", x, "y", y, "clientX", e.clientX, "clientY", e.clientY, "offsetLeft", e.target.offsetLeft, "offsetTop", e.target.offsetTop)
        let ripples = document.createElement('span')
        ripples.style.left = `${left}px`
        ripples.classList.add('ripple-span')
        ripples.style.top = `${top}px`
        ripples.style.background = RippleColor
        this.appendChild(ripples)
        setTimeout(() => {
            ripples.remove()
        }, 600)
        await componentInstance.invokeMethodAsync("OnTouch");
    }
}



/**
 * Inicia una transición de vista y devuelve una promesa que se resolverá una vez que se complete la transición.
 * @returns {Promise<object>} Una promesa que se resolverá con un objeto que contiene los métodos `resolve` y `reject`.
 */
async function beginViewTransition()  {
    // Obtiene una referencia al objeto document
    const doc = document;

    // Obtiene una referencia a la clase Promise
    const PromiseClass = Promise;

    // Crea un objeto resolver para almacenar las funciones de resolución y rechazo
    const resolver = {};

    // Obtiene una referencia al método startViewTransition de doc si está disponible
    const startViewTransition = doc.startViewTransition?.bind(doc);

    // Crea una nueva promesa
    const promise = new PromiseClass((resolve, reject) => {
        resolver.resolve = resolve;
        resolver.reject = reject;
    });

    // Si startViewTransition existe, ejecuta la transición de vista y espera a que se complete
    if (startViewTransition) {
        await new PromiseClass((resolve) => {
            startViewTransition(async () => {
                resolve();
                await promise;
            });
        });
    }

    // Devuelve el objeto resolver
    return resolver;
}