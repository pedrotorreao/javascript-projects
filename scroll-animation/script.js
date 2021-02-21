const boxes = document.querySelectorAll('.box');

/* -- addEventListener():
    sets up a function that will be called whenever the specified event is delivered to the target. 
    Common targets are Element, Document, and Window, but the target may be any object that supports 
    events (such as XMLHttpRequest). addEventListener() works by adding a function or an object 
    that implements EventListener to the list of event listeners for the specified event type on 
    the EventTarget on which it's called.
    Syntax:
        target.addEventListener(type, listener [, options]);
    */
window.addEventListener('scroll', checkBoxes);

checkBoxes();

function checkBoxes() {
    const triggerBottom = (window.innerHeight / 5) * 4;

    boxes.forEach(box => {
        /* -- getBoundingClientRect():
        returns a DOMRect object providing information about the size of an element 
        (in this case, the boxes) and its position relative to the viewport.
        */
        const boxTop = box.getBoundingClientRect().top;

        if(boxTop < triggerBottom) {
            box.classList.add('show');
        }
        else {
            box.classList.remove('show');
        }
    });
}