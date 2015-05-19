'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('mytodoApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  /*Useful Properties in the Object Prototype*/
  it('you can use valueOf to retrieve the primitive type associated with an object', function () {
    var fiveNumber = 5;
    var fiveString = "5";

    expect(fiveNumber.valueOf()).toBe(5);
    expect(fiveString.valueOf()).toBe("5");
    // '==' operator performs Type Coercion which turns a number contained in a string into an actual number
    expect(fiveNumber.valueOf() == fiveString.valueOf()).toBe(true);
    // '===' operator does not ignore the type of the value
    expect(fiveNumber.valueOf() === fiveString.valueOf()).toBe(false);

  });

  it('you can use valueOf to retrieve the type of a Prototype', function () {
    function Person (firstName ){
      this.firstName = firstName;
    }
    Person.prototype = {
      address: "House 123"
    };
    var person = new Person("Martin");
    expect(person.valueOf()).toEqual(Object({ firstName: 'Martin' }));
  });

  it('you can override properties of prototypes, even if these are inherited', function () {
    function Person (firstName ){
      this.firstName = firstName;
    }
    Person.prototype.valueOf = function() {
      return this.firstName;
    };
    var person = new Person("Martin");
    expect(person.valueOf()).toBe("Martin");
    person.firstName = "Corrie";
    //the value of ValueOf is retrieved every time, even if the object changes
    expect(person.valueOf()).toBe("Corrie");

  });

  it('you can use toString() method to convert variables into a string', function () {
    var fiveNumber = 5;
    var fiveString = "5";

    expect(fiveNumber.toString()).toBe("5");
    //there is no effect for strings
    expect(fiveString.toString()).toBe("5");

    var fiveDotTwo = 5.2; //toString() also works with numbers and decimals
    expect(fiveDotTwo.toString()).toBe("5.2");

    var array = [1,2,3]; //toString() converts Arrays into a comma-separated string
    expect(array.toString()).toBe("1,2,3");

  });

  it('you can use constructor keyword to find the nearest prototype ancestor ', function () {

    function Person (firstName ){
      this.firstName = firstName;
    }
    Person.prototype.lastName = function() {
      return "Chavez";
    };
    var person = new Person("Martin");

    expect(person.constructor.name).toEqual("Person");
    //the prototype of a Class is an object
    expect(typeof(person.constructor.prototype)).toEqual('object');
    //the prototype method 'lastName' of Person is a function which returns a string
    expect(typeof(person.constructor.prototype.lastName())).toEqual('string');
    expect(person.constructor.prototype.lastName()).toEqual('Chavez');//every instance of the class Person share the prototype property
    expect(person.__proto__.lastName()).toEqual('Chavez');//another way of finding a Class Prototype is with the keyword '__proto__'
  });

  it('you can use hasOwnProperty to identify the property location', function () {

    function Person (firstName ){
      this.firstName = firstName;
    }
    Person.prototype.lastName = function() {
      return "Chavez";
    };
    var person = new Person("Martin");

    expect(person.hasOwnProperty('lastName')).toEqual(false);
    expect(person.constructor.hasOwnProperty('lastName')).toEqual(false);
    expect(person.__proto__.hasOwnProperty('lastName')).toEqual(true);
  });

});