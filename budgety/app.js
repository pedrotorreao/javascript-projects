/* -------------------------------------------------------------------------------------*/
// BUDGET CONTROLLER
/* -------------------------------------------------------------------------------------*/
var budgetController = (function() {
  // Immediatelly Invoked Function Expression: it allows us to have data privacy because it 
  // creates a new scope which is not visible from the outside scope.
  
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    if(totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  }

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      // Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      
      // Create new item based on 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // Push new item into our data structure
      data.allItems[type].push(newItem);

      // Return the new item
      return newItem;
    },

    deleteItem: function(type, id) {
      var ids, index;

      ids = data.allItems[type].map(function(current) {
        return current.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: function() {
      // Calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      // Calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // Calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
      
    },

    calculatePercentages: function() {
      data.allItems.exp.forEach(function(cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function() {
      var allPerc = data.allItems.exp.map(function(cur) {
        return cur.getPercentage();
      });

      return allPerc;
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: function() {
      console.log(data);
    }
  };
  
})(); // Immediatelly Invoked Function Expression

/* -------------------------------------------------------------------------------------*/
// UI CONTROLLER
/* -------------------------------------------------------------------------------------*/
var UIController = (function() {
  // Immediatelly Invoked Function Expression: it allows us to have data privacy because it 
  // creates a new scope which is not visible from the outside scope.

  var DOMstrings = { // Object intended to keep all the strings
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage'
  };

  var formatNumber = function(num, type) {
    var numSplit, int, dec, type;

    //Math '.abs' method: It gets the absolute part of num
    num = Math.abs(num); 
    //Number '.toFixed' method: It converts the number to a string so it can use its methods
    num = num.toFixed(2);

    //Number '.split' method: It creates an array with the separated strings
    numSplit = num.split('.');

    int = numSplit[0]; //It gets the integer part
    if(int.length > 3) {
      //In case the integer part is greater than a thousand, add a comma
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }

    dec = numSplit[1]; //It gets the decimal part

    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec; //Returns formatted number
  };

  return {
    getInput: function() {
      return { //To be able to return all values, assign them to an object instead of a variable
        type: document.querySelector(DOMstrings.inputType).value, //Whether it is an Income or an Expense
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;

      // Create HTML string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;

        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;

        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      
      // Replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteListItem: function(selectorID) {
      var el = document.getElementById(selectorID);

      el.parentNode.removeChild(el);
    },

    clearFields: function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldsArr[0].focus();
    },

    displayBudget: function(obj) {
      var type;

      obj.budget > 0 ? type = 'inc' : type = 'exp';

      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
      
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },

    displayPercentages: function(percentages) {
      var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      var nodeListForEach = function(list, callback) {
        for(var i = 0; i < list.length; i++) {
          callback(list[i], i);
        }
      };

      nodeListForEach(fields, function(current, index) {
        if(percentages[index] > 0) {
          current.textContent = percentages[index] + '%';
        } else {
          current.textContent = '---';
        }
      });

    },

    getDOMstrings: function() { // In order to be able to access the strings from the other methods
      return DOMstrings;
    }
  };
})();
/* -------------------------------------------------------------------------------------*/
// GLOBAL APP CONTROLLER
/* -------------------------------------------------------------------------------------*/
var controller = (function(budgetCtrl, UICtrl) {
  // Immediatelly Invoked Function Expression: it allows us to have data privacy because it 
  // creates a new scope which is not visible from the outside scope.

  // This module has access to the other two independent methods
  var setupEventListeners = function() { // Intended to keep all the event listeners
    var DOM = UICtrl.getDOMstrings();

    // Event listener for the button to enter the expenses/incomes -- click option
    // If the assigned button is clicked, call the ctrlAddItem function
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    // Event listener for the button to enter the expenses/incomes -- ENTER option (keycode = 13)
    // If the ENTER key is pressed, call the ctrlAddItem function
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
  };

  var updatePercentages = function() {
    // 1. CALCULATE PERCENTAGES
    budgetCtrl.calculatePercentages();

    // 2. READ PERCENTAGES FROM THE BUDGET CONTROLLER
    var percentages = budgetCtrl.getPercentages();

    // 3. UPDATE THE UI WITH THE NEW PERCENTAGES
    UICtrl.displayPercentages(percentages);
  };

  var updateBudget = function() {
    // 1. CALCULATE THE BUDGET
    budgetCtrl.calculateBudget();

    // 2. RETURN THE BUDGET
    var budget = budgetCtrl.getBudget();

    // 3. DISPLAY THE BUDGET ON THE UI
    UICtrl.displayBudget(budget);
  }


  var ctrlAddItem = function() {
    var input, newItem;

    // 1. GET THE FIELD INPUT DATA FROM THE UI CONTROLLER
    input = UICtrl.getInput();

    if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. ADD THE ITEM TO THE BUDGET CONTROLLER 
      newItem =  budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. ADD THE ITEM TO THE UI
      UICtrl.addListItem(newItem, input.type);

      // 4. CLEAR THE FIELDS
      UICtrl.clearFields();

      // 5. CALCULATE AND UPDATE THE BUDGET
      updateBudget();

      // 6. CALCULATE AND UPDATE PERCENTAGES
      updatePercentages();
  }

  };

  var ctrlDeleteItem = function(event) {
    var itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if(itemID) {
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);
      // 1. DELETE THE ITEM FROM THE STRUCTURE
      budgetCtrl.deleteItem(type, ID);

      // 2. DELETE THE ITEM FROM THE UI
      UICtrl.deleteListItem(itemID);

      // 3. UPDATE AND SHOW THE NEW BUDGET
      updateBudget();

      // 4. CALCULATE AND UPDATE PERCENTAGES
      updatePercentages();
    }
  };

  return { // Initialization function
    init: function() {
      console.log('Application has started.');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };

})(budgetController, UIController); // Passing the other two controllers as arguments

controller.init(); // Calling the inialization function