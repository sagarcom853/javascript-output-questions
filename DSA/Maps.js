// Time Complexity: \(O(N.Klog K)). N is the number of strings in the array (strs.length).K is the maximum length of a single string in the array.
// Reasoning: The loop runs N times.
// Inside the loop, you split, sort, and join each string. Sorting a string of length K takes O(Klog K) time.
//  Finally, Object.values(obj) extracts the arrays, which takes (O(N) time.
// 
//Space Complexity: (O(N.K)\)Reasoning: In the worst-case scenario (where no strings are anagrams), 
// the hash object (obj) will store every single string from the input. 
// It holds N keys, and each value is an array containing strings of length K.


/** Find Anagrams array*/
//Method: Using maps 
//Complexity : Time O(n.logk) | Space : O (n.k)
function Anagram (strs){
    let map = new Map()
    for(let str of strs){
        let sorted = str.split('').sort().join('')
        console.log(map)
        if(map.has(sorted)){
            map.get(sorted).push(str)
        }
        else{
            map.set(sorted, [str]) // create an array of sorted str
        }
    }
    const result = Array.from(map.values())
    return result
    
}

// Method 2: Using Objects. 
function Anagram(strs){
    let obj = {}
    for(let str of strs){
        let sorted = str.split('').sort().join('')
        console.log(str, sorted)
        if(!obj[sorted]){
            obj[sorted] = []
        }
          obj[sorted].push(str)
        }
const result = Object.values(obj)
return result
}

let strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
console.log(Anagram(strs))

// -------------------------------------------------------------

  // Find K top most element by Frequency in an array
  let nums = [4, 4, 4, 2, 4, 3, 1, 1, 2, 2, 3];
  let k = 2;
  // Output: [1,2]

  //Method 1: USing Obj
  // Complexity: Time O(logn) because of sorting | Space : O(n)
  function mostEle(nums, k) {
    let obj = {};
    for (let num of nums) {
      if (!obj[num]) {
        obj[num] = 1;
      } else {
        obj[num] += 1;
      }
    }
    console.log(obj);
    let sorted = Object.keys(obj)
      .sort((a, b) => obj[b] - obj[a])
      .slice(0, k)
      .map((a) => parseInt(a));
    return sorted;
  }

  //Method 2: using maps
    // Complexity: Time O(logn) because of sorting | Space : O(n)
  function mostEle(nums, k) {
    let map = new Map();
    for (let num of nums) {
      if (!map[num]) {
        map[num] = 1;
      } else {
        map[num] += 1;
      }
    }
    console.log(map);
    let result = Object.keys(map)
      .sort((a, b) => map[b] - map[a])
      .slice(0, k)
      .map((a) => parseInt(a));

    return result;
  }

  console.log(mostEle(nums, k));

// Method 3: To remove sorting by using buckets with object mapping:
// Complexity: Time : O(n) | Space: O(n) 
function kMostFrequent(nums, k) {
  const obj = {};
  
  for( const key of nums) {
   if (obj[key]) {
     obj[key] = obj[key] + 1
    } else {
     obj[key] = 1
    }
  }
  let buckets = Array(nums.length -1).fill().map(() => []);
  for (let [num, freq] of Object.entries(obj)) {
    buckets[freq].push(num);
  }
  let res = []
  for(let i = buckets.length - 1; i>=0; i--) {
   res.push(...buckets[i])
  }
  
  return res.slice(0,k)
}

//   ------------------------------------------------------------------------

// Longest Consecutive element list using sets.
var longestConsecutive = function(nums) {
    if (nums.length === 0) return 0;

    let numSet = new Set(nums);
    let longestStreak = 0;

    for (let num of numSet) {
        // Check if current num is the start of a sequence
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            while (numSet.has(currentNum + 1)) {
                currentNum += 1;
                currentStreak += 1;
            }

            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }

    return longestStreak;
};