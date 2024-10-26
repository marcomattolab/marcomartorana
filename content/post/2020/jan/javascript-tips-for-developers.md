---
title: JavaScript tips for developers
date: 2021-01-31
tags: ["javascript","blog", "programming"]
image : "/img/posts/spriderman-02.jpg"
Description  : "In this article a collection of JavaScript tips for frontend developers..."
featured: true
---

### JavaScript tips for developers

**Javascript**, is a must to have in the modern web development, empowers developers with its versatility. As developers, we placed here **_tips_** and _techniques_ to use daily for amplifying productivity during development of our code.

For this reason I’ve written **4** **_tips for developers_**. Each of these tips is explained thoroughly, covering the ‘**what**’ (the tip itself), ‘**why**’ (its importance), and ‘**how**’ (implementing it).

For a visual representation, check out this picture featuring a _superhero_, to grasp these concepts visually and make them as powerful as a superhero’s abilities. Let’s delve into the enchanting world of a frontend developer with super powers !!

1\. Loop objects
----------------

**What**: starting to define an object as a a data structure, always we need to store and manage objects in our systems. Often we need to loop these objects by iterating over theirs properties. Below just an example of an object «myTeam» and its properties ( name, membersCount …):

```
const myTeam= { 
  name:’awesometeam’,
  membersCount: 12 , 
  membersActive:[‘namel’,’name2',’name3'], 
  rank:’#1',
  description:’helloworld’,
}
```


**Why**: To implement complex logic and operations efficiently a developer needs to iterate over properties of the object. This loop iterates over all enumerable properties of the object obj, getting and using each key-value pair to develop some specific tasks.

**How**: In JavaScript there are the following 4 ways to loop objects:

*   ‘_Traditional’ for loop_
*   _Object.keys()_
*   _Object.values()_
*   _Object.entries()_

**Traditional for loop**: we can loop over the keys and access their values by referencing the object itself with the given key

```
const myTeam= { 
  name:’awesometeam’,
  membersCount: 12 , 
  membersActive:[‘namel’,’name2',’name3'], 
  rank:’#1',
  description:’helloworld’,
}
for(const key in myTeam)‹
   console.log(‘key:${key},value:${myTeam[key]}’);
}
key:name,value:awesometeam
key:membersCount, value : 12
key:membersActive, value : namel, name, name3 
key:rank, value:#1 
key:description,value:helloworld
```


**Object.keys():** Another way is to use Object.keys and passing the object itself as a parameter, in return we’ll receive all the keys in an array through which we can iterate.

```
const myTeam= { 
  name:’awesometeam’,
  membersCount: 1 2 ,
  membersActive: [‘namel’, ‘name2', ‘name’], 
  rank:’#1',
  description:’helloworld’
}
console.log(Object.keys(myTeam));
Object.keys(myTeam).forEach(key= >{
  console.log(‘key: ${key}, value: $(myTeam [key]}’);
})
( 5 ) [ ‘ name’, "membersCount’,"membersActive’, ‘ r a n k ‘ , ‘description’] key:name,value:awesometeam
key:membersCount,value:12
key:membersActive, value: namel, name2, name3 
key:rank,value:#1 
key:description,value:helloworld
```


**Object.values():** Similar to Object.keys but it returns an array of values insteadofkeys. We can loop through this values array to see for example if there is any array (special type of object) stored inside of it.

```
const myTeam= { 
  name:’awesometeam’,
  membersCount: 12,
  membersActive: [‘namel’,’name2‘ , ‘name3'], 
  rank:’#1'
  description: ‘hello world’
}
console.log(Object.values(myTeam));
Object.values(myTeam).forEach(val=> {
    console.log(value: ${val} type: ${typeof val}’)
})
// check if any object is in the values
const res= Object.values(myTeam).some(el=>typeof el===’object’);
console.log(res);
(5)[‘awesometeam", 12,Array(3),’#1',’helloworld’] 
value:awesometeamtype:string
value:1 2type:number
value:namel,name2,name3type:object 
value:# 1type:string 
value:helloworldtype:string
true
```


**Object.entries():** For many cases probably the most convenient solution since this method returns in an array of key value pairs.

```
const myTeam= { 
  name:’awesometeam’,
  membersCount: 1 2 ,
  membersActive: [‘namel’, ‘name2', ‘name3'], 
  rank:’#1',
  description:’helloworld’
}
console.log(Object.entries(myTeam));
console.log(Object.entries(myTeam)[0];//first element key,value
for(const [key,value] of Object.entries(myTeam)){ 
   console.log (‘key: ${key}, value: ${value)’);
}
(5) [Array(2), Array(2), Array(2), Array(2), Array(2)] (2)[‘name’,’ awesometeam’]
key:name,value:awesometeam 
key:membersCount,value:12
key:membersActive, value: name, name2, name3 
key:rank,value:#1 
key:description,value:helloworld
```


2\. Search inside an array
--------------------------

**What**: A developer needs to search one of more elements inside an array.

**Why**: To implement complex logic and operations efficiently and write its algorithms.

**How**: In JavaScript there are the following methods to search elements inside an array:

*   _filter_
*   _find_
*   _includes_
*   _indexOf_

**filter:** Returns a new array with elements that pass a condition given by a callback function.

```
const numbers = [1, 2, 3, 4, 5, 6];
// Using filter to get all even numbers
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log('Even Numbers:', evenNumbers); // [2, 4, 6]
```


**find**: Returns the first element that passes the condition given by a callback function. If no element match returns undefined.

```
const numbers = [1, 2, 3, 4, 5, 6];
// Using find to get the first number greater than 3
const firstGreaterThanThree = numbers.find(num => num > 3);
console.log('First number greater than 3:', firstGreaterThanThree); // 4
```


**includes**: Returns true if an array contains a value otherwise return false.

```
const numbers = [1, 2, 3, 4, 5, 6];
// Using includes to check if number 5 is in the array
const includesFive = numbers.includes(5);
console.log('Array includes 5:', includesFive); // true
```


**indexOf**: Find the first element that matches a value and return the index of that element. If not elements match return -1

```
const numbers = [1, 2, 3, 4, 5, 6];
// Using indexOf to find the index of number 4
const indexOfFour = numbers.indexOf(4);
console.log('Index of 4:', indexOfFour); // 3
```


3\. Fetch API with Promises
---------------------------

**What**: The Fetch API provides a more powerful and flexible feature set for making HTTP requests.

**Why**: To get and manipulate data making HTTP requests. showcasing below shows how to make an HTTP GET request, handle the response, and manage errors appropriately.

**How**: directly deve into an example of fetching data from a public API and handling the response.

```
// Fetching data from an API
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // Parse the JSON from the response
  })
  .then(data => {
    // Handle the parsed JSON data
    console.log('Post Title:', data.title);
    console.log('Post Body:', data.body);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('There has been a problem with your fetch operation:', error);
  });

```


**Explanation**

*   **_Fetch Request_**: The fetch function initiates a request to the specified URL and returns a Promise that resolves to the Response object representing the response to the request.
*   **_Response Handling: ._**then(response => {…}): The first .then is used to handle the Response object. It checks if the response was successful using response.ok. If not, it throws an error.
*   then(data => {…}): The second .then handles the parsed JSON data. Here, we log the title and body of the post to the console.
*   **_Error Handling_**: The .catch method is used to handle any errors that occur during the fetch operation, whether it’s a network error or an issue with parsing the response.

4.Cloning an Object
-------------------

**What**: Often we need to duplicate an object with its properties. This operation in JavaScript is known as cloning. Mainly we have 2 diverse cloning types: **shallow clone** and **deep clone**.

A **deep copy** creates a new object and recursively copies all objects found in the original. This means that the new object and its contained objects are entirely independent of the original.

A **shallow copy** creates a new object, but inserts references into it to the objects found in the original. This means that the new object is a new container populated with references to the same elements contained in the original.

**Why**: As developers we need to clone an object and work with the cloned one to don’t change original object.

**How**: Cloning an object can be done in several ways in JavaScript, each with its own trade-offs.

*   **_Shallow clone with Object.assign_**

```
const obj1 = { a: 1, b: 2 };
const obj2 = Object.assign({}, obj1);
console.log(obj2); // Output: { a: 1, b: 2 }

```


*   **_Shallow Clone with Spread Operator_**

```
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1 };
console.log(obj2); // Output: { a: 1, b: 2 }

```


*   **_Deep Clone with JSON_**

```
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = JSON.parse(JSON.stringify(obj1));
console.log(obj2); // Output: { a: 1, b: { c: 2 } }

```


5\. Map and Reduce in JavaScript
--------------------------------

**Map** and **reduce** are powerful array methods in JavaScript that allow you to process and transform data efficiently. Let’s dive into what they are, why you should use them, and how to implement them with code snippets.

**What**: The **map** method creates a new array populated with the results of calling a provided function on every element in the calling array.

**Why**: **map** is useful for transforming data without mutating the original array. It’s perfect for scenarios where you need to apply a consistent operation to all items in an array.

**How**: Here’s a simple example of how to use map to convert an array of numbers to their squares. In this example, map takes a function that squares each number and applies it to every element in the numbers array, producing a new array squares.

```
const numbers = [1, 2, 3, 4, 5];
const squares = numbers.map(num => num * num);
console.log(squares); // Output: [1, 4, 9, 16, 25]
```


**What**: The **reduce** method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.

**Why**: **reduce** is ideal for aggregating or summarizing the data in an array. It’s commonly used for tasks like summing numbers, finding averages, or concatenating strings.

**How**: In this example, reduce processes the numbers array, adding each element to the accumulator, starting from an initial value of 0. The final result is the sum of all numbers in the array.

```
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // Output: 15
```


**Combining Map and Reduce**

You can combine map and reduce to perform complex data transformations and aggregations in a concise manner.

```
const numbers = [1, 2, 3, 4, 5];
const doubledSum = numbers
  .map(num => num * 2)
  .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(doubledSum); // Output: 30
```


Combining these methods allows for powerful data processing pipelines, making code more readable and maintainable.

Above an example where we first double the numbers in an array using map, and then sum the doubled values using reduce.