// BUDGET CONTROLLER
var budgetController = (function() {
  
})();

// UI CONTROLLER
var UIController = (function() {
  
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  }
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  
  var DOM = UICtrl.getDOMstrings();

  var ctrlAddItem = function() {
    // 1. GET THE FIELD INPUT DATA
    var input = UICtrl.getInput();
    console.log(input);

    // 2. ADD THE ITEM TO THE BUDGET CONTROLLER 
    // 3. ADD THE ITEM TO THE UI
    // 4. CALCULATE THE BUDGET
    // 5. DISPLAY THE BUDGET
    console.log('Uhuuuul');
  }

  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });

})(budgetController, UIController);