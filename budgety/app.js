// BUDGET CONTROLLER
var budgetController = (function() {
  
})();

// UI CONTROLLER
var UIController = (function() {
  //Some code
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  
  var ctrlAddItem = function() {
    // 1. GET THE FIELD INPUT DATA
    // 2. ADD THE ITEM TO THE BUDGET CONTROLLER 
    // 3. ADD THE ITEM TO THE UI
    // 4. CALCULATE THE BUDGET
    // 5. DISPLAY THE BUDGET
    console.log('Uhuuuul');
  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });

})(budgetController, UIController);