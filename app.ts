//Lesson 3
class HelloWorld {
    constructor(message) {
        console.log(message);

    }
}

const hello = new HelloWorld("Olayeni- Welcome to TS");
console.log(hello);

//Lesson 4
function LoggerAndReturn<T>(thing: T): T {
    return thing;
}

const message: string = LoggerAndReturn<string>("HELLO WOLDR")
console.log(message);

const messageB: number = LoggerAndReturn(2);
console.log(messageB);

//Lesson 5
function getArray<T>(items: T[]): T[] {
    return new Array<T>().concat(items);
}

let myNumArr = getArray<number>([100, 200, 300]);
let myStrArr = getArray<string>(["Hello", "Olayeni", "Anifowose"])

//TypeScript can also infer the type of the arguments being passed into the array
let myNumArrInf = getArray([1, 2, 3, 4, 5]);
let myStrArrInf = getArray(["I'm", "learning", "TS"])

console.log(myNumArr);
console.log(myStrArr);

console.log(myNumArrInf);
console.log(myStrArrInf);


//Lesson 6
//multiple type variables
function getInfo<T, U>(id: T, name: U): void {
    console.log(typeof id + ',' + typeof name)
}

getInfo<number, string>(34, "Yensss")

//generic with non generic type
function displayType<T>(id: T, name: string): void {
    console.log(typeof id + ',' + typeof name);
}

displayType<number>(32, "STRING!")


//Lesson 7 
//Generic Constraints
class Customer {
    firstname: string;
    lastname: string;

    constructor(fname: string, lname: string) {
        this.firstname = fname;
        this.lastname = lname;
    }

}

function customerLogger<T extends Customer>(customer: T): void {
    console.log(`${customer.firstname} ${customer.lastname}`);
}

let customer = new Customer("Mobolaji", "Anifowose");
customerLogger(customer);


/*Lesson 8 
Interfaces describing object properties
A class is a blueprint which we can create objects that share the same configuration and methods
Interface is a group of related properties and methods that describe an object, but neither
provides implementation nor initialisation for them.
*/
interface Pair<T, U> {
    first: T;
    second: U
}

const person: Pair<string, boolean> = {
    first: "Olayeni Anifowose",
    second: false
}

let p: Pair<string, number> = {
    first: "Jumia",
    second: 400
}

console.log(person, p);

interface Command<T, R> {
    id: T;
    run(): R
}

let c: Command<string, number> = {
    id: "31034052345",
    run: () => {
        return +c.id
    }
}

console.log(c.id)
console.log(c.run());


//Lesson 9
interface ElementChecker {
    <T>(items: T[], toBeChecked: T, atIndex: number): boolean
}

function checkElementAt<T>(
    items: T[],
    toBeChecked: T,
    atIndex: number
): boolean {
    return items[atIndex] === toBeChecked
}

let checker: ElementChecker = checkElementAt;
let items = [1, 2, 3, 4, 5, 6];

let b: boolean = checker<number>(items, 5, 4)
console.log(b);

let b2: boolean = checker<number>(items, 6, 3)
console.log(b2);

/*The interface above has three parameters, the first is an array of type T e.g. an array of numbers
strings, etc. The second parameter is the element of the array the user wants to check while the
third parameter is the index of the element to be checked. This interface returns a boolean.
The function checkElementAt accepts the three parameters which returns a boolean to check if the 
array[thirdParameter] === second parameter
*/

//Interfaces describing indexables
interface States<R> {
    [state: string]: R;
}

let s: States<boolean> = {
    graduate: true,
    "6 foot?": false
}

console.log(s);
console.log(s["graduate"]);


//Lesson 10-Generic Classes and interfaces
class GenericNumber<T>{
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => {
    return x + y;
}

interface Collection<T> {
    add(t: T): void;
    remove(t: T): void;
    arrayItems(): T[];
}

class List<T> implements Collection<T>{
    private data: T[] = [];

    add(t: T): void {
        this.data.push(t);
    }

    remove(t: T): void {
        let index = this.data.indexOf(t);
        if (index > -1) {
            this.data.splice(index, 1); //array.splice(index, howmany, item1, ....., itemX)
        }
    }

    arrayItems(): T[] {
        return this.data;
    }
}

let numbers: Collection<number> = new List();
numbers.add(11);
numbers.add(12);
numbers.add(13);
numbers.remove(13);
let numbersArray = numbers.arrayItems();
console.log(numbersArray);


//Lesson 11 - Introduction to decorators
/*A decorator is a special kind of declaration that can be attached to a class, declaration, method,
accessor, property or parameter. It uses the form @expression which evaluates a function that will
be called at runtime with information about the decorated declaration.
In the code below, the function log was declared with all its logic and properties then it was
called in the class Calculator.

The target is an object with the function square
Target { square: [Function (anonymous)] }

The key is the name of the function 
KEY square

The descriptor is an object with the following properties
Descriptor {
  value: [Function (anonymous)],
  writable: true,
  enumerable: true,
  configurable: true
}
*/

function log(title: string) {

    return function (target, key, descriptor) {
        console.log("Target", target);
        console.log("KEY", key);
        console.log("Descriptor", descriptor);

        //descriptor is the method
        const original = descriptor.value;
        console.log("Original", original) //This is an anonymous function 
        descriptor.value = function (...args: any[]) {
            //Call the original method, this is pointing to the calculator and its arguments
            const result = original.apply(this.args);
            //Log the call, and the result. .apply method binds the argument and the function together
            console.log(`Title: ${title} with args ${JSON.stringify(args)} returned ${JSON.stringify(result)} `);

            //return result
            return result;

        }
        return descriptor;
    }

}

class Calculator {
    //Using decorator functions: @log
    @log('Calculator Function Decorator')
    square(n: number) {
        return n * n;
    }

}

const calc = new Calculator();
calc.square(2);
calc.square(4);


//Lesson 14: Property Decorators
/*The descriptor parameter isn't needed here because a simple class was created with just one property, 
no function. The getter returns the value of the property, the setter overrides the default value of the
property to a new one.  

*/
function property(target: any, key: string) {
    console.log("Target", target);
    console.log("Key", key);
    
    let value = target[key];

    //Replacement getter
    const getter = function () {
        console.log(`Getter for ${key} returned ${value}`);
        return value;
    }

    //Replacement Setter
    const setter = function (newVal) {
        console.log(`Set ${key} to ${newVal}`)
        value = newVal;
    }

    //Replace the property
    const isDeleted = delete this[key];
    if (isDeleted) {
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        })
    }
}

@model
class Person {
    @property
    public firstName: string;

    @property
    public salary: number;

    calculateSalary(@parameterDecorator taxes:number):number{
        return this.salary * taxes;
    }
}

const individual = new Person();
individual.firstName = "Yensss"; //This calls the setter function
//Calling the getter function 
console.log(individual.firstName);


//Lesson 15-Parameter Decorators
function parameterDecorator(target:any, key:string, index:number){
    console.log(`Key is ${key} and index is ${index}`);
}

//Lesson 16 - Class Decorators
function model(constructor: Function){
    console.log(constructor);
    
}