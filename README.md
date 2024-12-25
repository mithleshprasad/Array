# Array

### **Arrays in JavaScript: Deep Explanation**

Arrays in JavaScript are ordered collections of items, where each item (element) is stored at an indexed position starting from `0`. They allow efficient random access, traversal, and manipulation of elements.

---

### **1. Basic Operations on Arrays**

#### **Traversal**
- **Definition:** Traversal involves accessing each element of the array sequentially.
- **Why Use?**
  - To read or display array elements.
  - To apply transformations or calculations on elements.
- **Implementation:**
  JavaScript provides several ways to traverse arrays:
  - **For Loop:** The classic way.
  - **`forEach()` Method:** Executes a callback for each element.
  - **`map()` Method:** Creates a new array by applying a function to every element.

**Examples:**
1. Using `for` loop:
   ```javascript
   let arr = [10, 20, 30, 40];
   for (let i = 0; i < arr.length; i++) {
       console.log(arr[i]); // Output: 10, 20, 30, 40
   }
   ```

2. Using `forEach()`:
   ```javascript
   arr.forEach(element => console.log(element));
   ```

3. Using `map()`:
   ```javascript
   let doubled = arr.map(element => element * 2);
   console.log(doubled); // Output: [20, 40, 60, 80]
   ```

---

#### **Insertion**
- **Definition:** Adding an element at a specific position in the array.
- **Key Points:**
  - Adding at the **end**: Efficient using `push()`.
  - Adding at the **beginning** or **middle**: Requires shifting elements, making it less efficient (\(O(n)\)).

**Examples:**
1. **Add at the end (`push`):**
   ```javascript
   let arr = [1, 2, 3];
   arr.push(4); // Adds 4 at the end
   console.log(arr); // Output: [1, 2, 3, 4]
   ```

2. **Add at the beginning (`unshift`):**
   ```javascript
   arr.unshift(0); // Adds 0 at the beginning
   console.log(arr); // Output: [0, 1, 2, 3, 4]
   ```

3. **Insert at a specific index (`splice`):**
   ```javascript
   arr.splice(2, 0, 99); // Insert 99 at index 2
   console.log(arr); // Output: [0, 1, 99, 2, 3, 4]
   ```

---

#### **Deletion**
- **Definition:** Removing an element from a specific position in the array.
- **Key Points:**
  - Removing the **last element**: Efficient using `pop()`.
  - Removing the **first element** or **specific index**: Requires shifting, making it less efficient (\(O(n)\)).

**Examples:**
1. **Remove the last element (`pop`):**
   ```javascript
   arr.pop(); // Removes the last element
   console.log(arr); // Output: [0, 1, 99, 2, 3]
   ```

2. **Remove the first element (`shift`):**
   ```javascript
   arr.shift(); // Removes the first element
   console.log(arr); // Output: [1, 99, 2, 3]
   ```

3. **Remove from a specific index (`splice`):**
   ```javascript
   arr.splice(1, 1); // Removes 1 element at index 1
   console.log(arr); // Output: [1, 2, 3]
   ```

---

### **2. Prefix Sums**

#### **Definition**
The **prefix sum** is a technique where an auxiliary array is built, storing cumulative sums of elements up to each index. It allows efficient calculation of subarray sums in \(O(1)\) time after preprocessing.

#### **How it Works**
1. Create an array `prefixSum`, where:
   \( prefixSum[i] = arr[0] + arr[1] + \ldots + arr[i] \).
2. To calculate the sum of elements from index \(l\) to \(r\):
   \[
   \text{subarray sum} = prefixSum[r] - (prefixSum[l-1] \text{ if } l > 0 \text{ else } 0)
   \]

#### **Example**
```javascript
let arr = [2, 4, 6, 8];
let prefixSum = [];
prefixSum[0] = arr[0];
for (let i = 1; i < arr.length; i++) {
    prefixSum[i] = prefixSum[i - 1] + arr[i];
}

// Find sum from index 1 to 3
let l = 1, r = 3;
let subarraySum = prefixSum[r] - (prefixSum[l - 1] || 0);
console.log(subarraySum); // Output: 18
```

---

### **3. Sliding Window**

#### **Definition**
The **sliding window** technique is used to solve problems involving contiguous subarrays, optimizing the time complexity compared to nested loops.

#### **How it Works**
1. Start with a "window" of size \(k\) or based on conditions.
2. Slide the window by adding a new element to the end and removing the first element.
3. Keep track of the required result (e.g., max sum, min length).

#### **Example**
Find the maximum sum of a subarray of size \(k\):
```javascript
let arr = [1, 2, 3, 4, 5];
let k = 3;
let maxSum = 0, currentSum = 0;

// Calculate the sum of the first window
for (let i = 0; i < k; i++) {
    currentSum += arr[i];
}
maxSum = currentSum;

// Slide the window
for (let i = k; i < arr.length; i++) {
    currentSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, currentSum);
}

console.log(maxSum); // Output: 12
```

---

### **4. Kadane’s Algorithm (Maximum Subarray Sum)**

#### **Definition**
Kadane's Algorithm is a dynamic programming approach to find the maximum sum of a contiguous subarray in \(O(n)\) time.

#### **How it Works**
1. Use two variables:
   - `maxCurrent`: Maximum sum of subarray ending at the current index.
   - `maxGlobal`: Overall maximum sum encountered so far.
2. Update:
   - \( maxCurrent = \max(arr[i], maxCurrent + arr[i]) \)
   - \( maxGlobal = \max(maxGlobal, maxCurrent) \)

#### **Example**
```javascript
let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
let maxCurrent = arr[0];
let maxGlobal = arr[0];

for (let i = 1; i < arr.length; i++) {
    maxCurrent = Math.max(arr[i], maxCurrent + arr[i]);
    if (maxCurrent > maxGlobal) {
        maxGlobal = maxCurrent;
    }
}

console.log(maxGlobal); // Output: 6 (subarray: [4, -1, 2, 1])
```

---

### **Summary of Techniques**

| **Technique**       | **Purpose**                                              | **Time Complexity** |
|----------------------|----------------------------------------------------------|----------------------|
| **Traversal**        | Process each element.                                    | \(O(n)\)            |
| **Insertion/Deletion** | Modify the array by adding or removing elements.        | \(O(1)\) to \(O(n)\)|
| **Prefix Sums**      | Precompute sums for efficient range queries.             | \(O(n)\) (preprocessing), \(O(1)\) (query) |
| **Sliding Window**   | Solve fixed or variable subarray problems efficiently.   | \(O(n)\)            |
| **Kadane’s Algorithm** | Find the maximum subarray sum in linear time.           | \(O(n)\)            |

