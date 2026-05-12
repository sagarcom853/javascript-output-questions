// Promises and pollyfill concepts: https://levelup.gitconnected.com/vimp-javascript-promise-implementation-challenges-5a4f120d8606


// In JavaScript EventLoop, there is also the concept of priority.

// Tasks with higher priority are called microtasks. Includes: Promise, ObjectObserver, MutationObserver, process.nextTick, async/await .
// Tasks with lower priority are called macrotasks. Includes: setTimeout , setInterval and XHR .

// Promise.all

const promiseArr = [
  new Promise(resolve => setTimeout(resolve, 100, 'apple')),
  new Promise(resolve => setTimeout(resolve, 100, 'banana')),
  new Promise(resolve => setTimeout(resolve, 3000, 'orange'))
]
Promise.all(promiseArr)
  .then(fruits => console.log(fruits))
  .catch(err => console.log('Error:', err))

// After 3 seconds, logs out the following
// ["apple", "banana", "orange"]

// ------------------------------------------------------------------------
// Promise.allSettled

const promiseArr = [
  new Promise(resolve => setTimeout(resolve, 100, 'apple')),
  new Promise((resolve, reject) => setTimeout(reject, 10, 'banana')),
  new Promise(resolve => setTimeout(resolve, 3000, 'orange'))
]
Promise.allSettled(promiseArr)
  .then(fruits => console.log(fruits))
  .catch(err => console.log('Error:', err))

// After 10 ms, logs out the following
// [
//  {status: 'fulfilled', value: 'apple'},
//  {status: 'rejected', value: 'banana'},
//  {status: 'fulfilled', value: 'orange'}
// ]

// -------------------------------------------------------------------------

console.log('start'); 
const promise1 = new Promise((resolve, reject) => {  
   console.log(1)
//   resolve('2')
}) 

promise1.then((res) => console.log(res))
console.log('end');

//start 1 end. (without resolve('2'))
// start 1 end 2 (with resolve ('2'))

// --------------------------------------

console.log('start'); 
const promise1 = new Promise((resolve, reject) => {  
  console.log(1)  
  resolve(2)  
  console.log(3)
})
promise1.then(res => {  
  console.log(res)
}) 
console.log('end');

//start 1 3 end 2

// -----------------------------------------

/** Resolve is not present .*/

console.log('start'); 
const promise1 = new Promise((resolve, reject) => {  
  console.log(1)
}) 
promise1.then(res => {  
  console.log(2)
})
console.log('end');

// start 1 end
// ----------------------------------------
//* Here use of functions  */

console.log('start') 
const fn = () => (new Promise((resolve, reject) => {   
    console.log(1);  
    resolve('success')
})) 
console.log('middle') 
fn().then(res => {  
   console.log(res)
})
 
console.log('end')

// start middle 1 end success

// ----------------------------------------

//* MacroTasks and MicroTasks mixed */
const promise = new Promise((resolve, reject) => {  
  console.log(1);  
  setTimeout(() => {    
    console.log("timerStart");    
    resolve("success");    
    console.log("timerEnd");  
  }, 0);  
  console.log(2);
}); 
promise.then((res) => {  
   console.log(res);
}); 
console.log(4);

// 1 2 4 timerStart timerEnd success

// ------------------------------------------

//* More examples of mixture */
const timer1 = setTimeout(() => {  
  console.log('timer1');    
  let promise1 = Promise.resolve().then(() => {   
    console.log('promise1')  
  })
}, 0) 
const timer2 = setTimeout(() => {  console.log('timer2')}, 0)


// Timer 1 promoise1 timer2



