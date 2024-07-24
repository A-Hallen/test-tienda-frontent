function ScrollArticleTop() {
    let article = document.getElementsByTagName("article")[0];
    article.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}
// Manages the registered event listeners so they can be disposed later
let windowEventListeners = {};

function AddWindowWidthListener(objReference, elementRef) {
    let eventListener = () => UpdateWindowWidth(objReference, elementRef);
    window.addEventListener("resize", eventListener);
    eventListener();
    windowEventListeners[objReference] = eventListener;
}

function RemoveWindowWidthListener(objReference) {
    window.removeEventListener("resize", windowEventListeners[objReference]);
}

function UpdateWindowWidth(objReference, elementRef) {
    let width = elementRef.parentElement.clientWidth;
    //window.innerWidth
    objReference.invokeMethodAsync("UpdateWindowWidth", width);
}