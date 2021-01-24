/*
--querySelectorAll(CSS_Selectors): 
 returns a list of all elements (NodeList) in the document that matches a specific CSS_selector which are used to select 
 HTML elements based on their id, classes, types, attributes, values of attributes, etc.
--addEventListener(): 
 sets up a function that will be called whenever the specified event is delivered to the target. 
 it works by adding a function or an object that implements EventListener to the list of event listeners for the specified 
 event type on the EventTarget on which it's called.
--classList:
 The classList property returns the class name(s) of an element, as a DOMTokenList object.
 This property is useful to add, remove and toggle CSS classes on an element.
 The classList property is read-only, however, you can modify it by using the add() and remove() methods.
 */
const panels = document.querySelectorAll('.panel');

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses();
        panel.classList.add('active');
    });
});

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
}