---
Title: "Python Cheat Sheet for Coding Interviews"
Date: 2026-05-01
Tags: ["Python", "LeetCode", "Coding Interviews", "Algorithms", "Data Structures", "Cheat Sheet"]
image: "/img/collections/python-cheat-sheet.png"
Description: "A comprehensive Python cheat sheet for LeetCode and coding interviews. Data structures, algorithms, and common patterns — all in one place."
Draft:
---

# 🐍 Python Cheat Sheet for Coding Interviews

Save this. Bookmark it. Use it every time you practice.

Everything you need to solve LeetCode problems efficiently — in one reference sheet.

---

## 📋 Table of Contents

1. [Built-in Data Structures](#built-in-data-structures)
2. [String Operations](#string-operations)
3. [List/Array Operations](#listarray-operations)
4. [Dictionary/Hash Map](#dictionaryhash-map)
5. [Set Operations](#set-operations)
6. [Heap/Priority Queue](#heappriority-queue)
7. [Stack & Queue](#stack--queue)
8. [Linked List](#linked-list)
9. [Binary Tree](#binary-tree)
10. [Binary Search](#binary-search)
11. [Sorting & Searching](#sorting--searching)
12. [Two Pointers](#two-pointers)
13. [Sliding Window](#sliding-window)
14. [Backtracking](#backtracking)
15. [Dynamic Programming](#dynamic-programming)
16. [BFS & DFS](#bfs--dfs)
17. [Bit Manipulation](#bit-manipulation)
18. [Common Patterns](#common-patterns)

---

## 🔧 Built-in Data Structures

### Quick Reference

| Structure | Syntax | Time Complexity (Access/Search/Insert) | Use Case |
|-----------|--------|----------------------------------------|----------|
| List | `[]` | O(1)/O(n)/O(n) | Ordered, mutable sequences |
| Dict | `{}` | O(1)/O(1)/O(1) | Key-value mappings |
| Set | `set()` | O(1)/O(1)/O(1) | Unique elements, membership |
| Tuple | `()` | O(1)/O(n)/N/A | Immutable sequences |
| Heap | `heapq` | O(log n) | Priority queues |

---

## 🔤 String Operations

```python
# Basic operations
s = "leetcode"
len(s)                    # 8
s[0]                      # 'l'
s[-1]                     # 'e'
s[2:5]                    # 'etc' (slicing)
s[::-1]                   # 'edocteel' (reverse)

# Check substring
"code" in s               # True

# String methods
s.upper()                 # 'LEETCODE'
s.lower()                 # 'leetcode'
s.capitalize()            # 'Leetcode'
s.title()                 # 'Leetcode'
s.strip()                 # Remove leading/trailing whitespace
s.split(',')              # Split by delimiter
','.join(['a', 'b'])      # 'a,b'
s.find('code')            # 4 (index) or -1
s.index('code')           # 4 (raises ValueError if not found)
s.count('e')              # 3
s.replace('e', 'a')       # 'laatcada'
s.startswith('leet')      # True
s.endswith('code')        # True

# Check character types
c.isalpha()               # True if alphabetic
c.isdigit()               # True if numeric
c.isalnum()               # True if alphanumeric
c.isspace()               # True if whitespace
c.islower()               # True if lowercase
c.isupper()               # True if uppercase

# Convert
ord('a')                  # 97 (char to ASCII)
chr(97)                   # 'a' (ASCII to char)
str(123)                  # '123'
int('123')                # 123
int('1a', 16)             # 26 (base 16)
bin(10)                   # '0b1010'
hex(10)                   # '0xa'

# Format strings
f"Result: {value}"        # f-string (Python 3.6+)
"{} {}".format(a, b)      # .format()
"%s %d" % (s, n)          # printf-style
```

---

## 📦 List/Array Operations

```python
# Creation
arr = []
arr = [1, 2, 3]
arr = [0] * n             # [0, 0, 0, ...] n times
arr = list(range(10))     # [0, 1, 2, ..., 9]
arr = list(range(1, 10, 2)) # [1, 3, 5, 7, 9]

# List comprehension
squares = [x**2 for x in range(5)]           # [0, 1, 4, 9, 16]
evens = [x for x in range(10) if x % 2 == 0] # [0, 2, 4, 6, 8]
pairs = [(x, y) for x in [1,2] for y in [3,4]] # [(1,3), (1,4), (2,3), (2,4)]

# Basic operations
arr.append(x)             # Add to end
arr.extend([1, 2])        # Extend with another list
arr.insert(0, x)          # Insert at index
arr.remove(x)             # Remove first occurrence of x
arr.pop()                 # Remove and return last element
arr.pop(0)                # Remove and return first element
arr.index(x)              # Index of first occurrence of x
arr.count(x)              # Count occurrences of x
arr.sort()                # Sort in-place
arr.sort(reverse=True)    # Sort descending
sorted(arr)               # Return new sorted list
arr.reverse()             # Reverse in-place
arr[::-1]                 # Return reversed copy
min(arr), max(arr), sum(arr)

# Slicing
arr[start:end]            # start inclusive, end exclusive
arr[start:]               # from start to end
arr[:end]                 # from beginning to end
arr[:]                    # shallow copy
arr[::2]                  # every 2nd element
arr[-3:]                  # last 3 elements

# 2D arrays
matrix = [[0] * 3 for _ in range(3)]  # 3x3 matrix
# WARNING: [[0] * 3] * 3 creates references to same list!

# Zip and enumerate
for i, val in enumerate(arr):   # Index and value
    pass

for a, b in zip(arr1, arr2):    # Iterate two lists together
    pass
```

---

## 📖 Dictionary/Hash Map

```python
# Creation
d = {}
d = {'a': 1, 'b': 2}
d = dict(a=1, b=2)
d = {k: v for k, v in pairs}

# Basic operations
d[key] = value            # Set/Update
d.get(key, default)       # Get with default (no KeyError)
del d[key]                # Delete
key in d                  # Check existence
d.keys()                  # All keys (view)
d.values()                # All values (view)
d.items()                 # All key-value pairs

# Iteration
for key in d:             # Iterate keys
    pass

for value in d.values():  # Iterate values
    pass

for key, value in d.items():  # Iterate both
    pass

# Useful patterns
from collections import defaultdict

dd = defaultdict(int)     # Default value 0 for int
dd = defaultdict(list)    # Default empty list
dd = defaultdict(set)     # Default empty set

from collections import Counter

counter = Counter(arr)    # Count frequencies
counter.most_common(2)    # Top 2 most common

# Merge dictionaries
d1 | d2                   # Python 3.9+ merge
{**d1, **d2}              # All versions
```

---

## 🎯 Set Operations

```python
# Creation
s = set()
s = {1, 2, 3}
s = {x for x in range(5)}

# Basic operations
s.add(x)                  # Add element
s.remove(x)               # Remove (raises KeyError if not found)
s.discard(x)              # Remove (no error)
s.pop()                   # Remove and return arbitrary
x in s                    # O(1) membership check
len(s)

# Set operations
s1 | s2                   # Union
s1 & s2                   # Intersection
s1 - s2                   # Difference
s1 ^ s2                   # Symmetric difference
s1.issubset(s2)           # s1 ⊆ s2
s1.issuperset(s2)         # s1 ⊇ s2
```

---

## 📚 Heap/Priority Queue

```python
import heapq

# Min heap (default)
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 2)
heapq.heappop(heap)       # Returns 1 (smallest)
heap[0]                   # Peek at smallest (O(1))

# Max heap (negate values)
heap = []
heapq.heappush(heap, -3)
heapq.heappush(heap, -1)
-heapq.heappop(heap)      # Returns 3 (largest)

# Heapify existing list
arr = [3, 1, 4, 1, 5]
heapq.heapify(arr)        # O(n)

# n smallest/largest
heapq.nsmallest(3, arr)   # [1, 1, 3]
heapq.nlargest(2, arr)    # [4, 5]

# Heap with tuples (priority, item)
heap = []
heapq.heappush(heap, (2, 'task2'))
heapq.heappush(heap, (1, 'task1'))
heapq.heappush(heap, (3, 'task3'))
heapq.heappop(heap)       # (1, 'task1')
```

---

## 📐 Stack & Queue

```python
# Stack (LIFO) - use list
stack = []
stack.append(x)           # Push
stack.pop()               # Pop
stack[-1]                 # Peek

# Queue (FIFO) - use deque
from collections import deque
q = deque()
q.append(x)               # Enqueue
q.popleft()               # Dequeue
q[0]                      # Peek front
q[-1]                     # Peek back

# Deque (double-ended queue)
q.appendleft(x)           # Add to front
q.pop()                   # Remove from back
```

---

## 🔗 Linked List

```python
# Definition
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Common patterns

# Create linked list from array
def create_list(arr):
    dummy = ListNode(0)
    curr = dummy
    for val in arr:
        curr.next = ListNode(val)
        curr = curr.next
    return dummy.next

# Traverse
curr = head
while curr:
    print(curr.val)
    curr = curr.next

# Reverse linked list
def reverse_list(head):
    prev = None
    curr = head
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev

# Find middle (slow/fast pointers)
slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
# slow is at middle

# Detect cycle (Floyd's algorithm)
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False

# Merge two sorted lists
def merge_lists(l1, l2):
    dummy = ListNode(0)
    curr = dummy
    while l1 and l2:
        if l1.val < l2.val:
            curr.next = l1
            l1 = l1.next
        else:
            curr.next = l2
            l2 = l2.next
        curr = curr.next
    curr.next = l1 or l2
    return dummy.next
```

---

## 🌳 Binary Tree

```python
# Definition
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# DFS - Preorder (Root, Left, Right)
def preorder(root):
    if not root:
        return
    print(root.val)
    preorder(root.left)
    preorder(root.right)

# DFS - Inorder (Left, Root, Right)
def inorder(root):
    if not root:
        return
    inorder(root.left)
    print(root.val)
    inorder(root.right)

# DFS - Postorder (Left, Right, Root)
def postorder(root):
    if not root:
        return
    postorder(root.left)
    postorder(root.right)
    print(root.val)

# BFS - Level Order
from collections import deque
def level_order(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result

# Get height/depth
def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

# Check if valid BST
def is_valid_bst(root, min_val=float('-inf'), max_val=float('inf')):
    if not root:
        return True
    if not (min_val < root.val < max_val):
        return False
    return (is_valid_bst(root.left, min_val, root.val) and
            is_valid_bst(root.right, root.val, max_val))
```

---

## 🔍 Binary Search

```python
# Standard binary search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Find first element >= target (lower bound)
def lower_bound(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left

# Find first element > target (upper bound)
def upper_bound(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] <= target:
            left = mid + 1
        else:
            right = mid
    return left

# Using bisect module
import bisect
bisect.bisect_left(arr, target)   # Lower bound
bisect.bisect_right(arr, target)  # Upper bound
bisect.insort(arr, target)        # Insert in sorted position
```

---

## 📊 Sorting & Searching

```python
# Built-in sorting
arr.sort()                        # In-place sort
arr.sort(key=lambda x: x[1])      # Sort by custom key
arr.sort(reverse=True)            # Descending
sorted(arr)                       # Return new sorted list
sorted(arr, key=len)              # Sort strings by length

# Custom comparator (Python 3.2+)
from functools import cmp_to_key
def compare(a, b):
    if a < b:
        return -1
    elif a > b:
        return 1
    return 0
arr.sort(key=cmp_to_key(compare))

# Quick select (find kth largest)
import random
def quick_select(arr, k):
    pivot = random.choice(arr)
    left = [x for x in arr if x > pivot]
    mid = [x for x in arr if x == pivot]
    right = [x for x in arr if x < pivot]
    if k <= len(left):
        return quick_select(left, k)
    elif k <= len(left) + len(mid):
        return pivot
    return quick_select(right, k - len(left) - len(mid))
```

---

## 👆 Two Pointers

```python
# Pattern 1: Opposite ends (palindrome, two sum sorted)
left, right = 0, len(arr) - 1
while left < right:
    if condition:
        left += 1
    else:
        right -= 1

# Pattern 2: Same direction (sliding window, remove duplicates)
slow = fast = 0
while fast < len(arr):
    # Process arr[fast]
    if condition:
        arr[slow] = arr[fast]
        slow += 1
    fast += 1

# Example: Remove duplicates in-place
def remove_duplicates(arr):
    if not arr:
        return 0
    slow = 0
    for fast in range(1, len(arr)):
        if arr[fast] != arr[slow]:
            slow += 1
            arr[slow] = arr[fast]
    return slow + 1
```

---

## 🪟 Sliding Window

```python
# Fixed size window
def fixed_window(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum

# Variable size window (longest substring without repeating)
def variable_window(s):
    char_set = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len

# With counter (minimum window substring)
from collections import Counter
def min_window(s, t):
    need = Counter(t)
    missing = len(t)
    left = start = 0
    min_len = float('inf')
    
    for right, char in enumerate(s, 1):
        if need[char] > 0:
            missing -= 1
        need[char] -= 1
        
        if missing == 0:
            while left < right and need[s[left]] < 0:
                need[s[left]] += 1
                left += 1
            
            if right - left < min_len:
                min_len = right - left
                start = left
            
            need[s[left]] += 1
            missing += 1
            left += 1
    
    return s[start:start + min_len] if min_len != float('inf') else ""
```

---

## 🔄 Backtracking

```python
# General pattern
def backtrack(path, choices):
    if base_case:
        result.append(path[:])
        return
    
    for choice in choices:
        if is_valid(choice):
            path.append(choice)      # Make choice
            backtrack(path, new_choices)
            path.pop()               # Undo choice

# Example: Subsets
def subsets(nums):
    result = []
    def backtrack(start, path):
        result.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result

# Example: Permutations
def permute(nums):
    result = []
    def backtrack(path):
        if len(path) == len(nums):
            result.append(path[:])
            return
        for num in nums:
            if num not in path:
                path.append(num)
                backtrack(path)
                path.pop()
    backtrack([])
    return result

# Example: Combination Sum
def combination_sum(candidates, target):
    result = []
    def backtrack(start, path, total):
        if total == target:
            result.append(path[:])
            return
        if total > target:
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i, path, total + candidates[i])
            path.pop()
    backtrack(0, [], 0)
    return result
```

---

## 🧠 Dynamic Programming

```python
# 1D DP - Climbing Stairs
def climb_stairs(n):
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Space optimized
def climb_stairs_opt(n):
    if n <= 2:
        return n
    prev1, prev2 = 1, 2
    for _ in range(3, n + 1):
        curr = prev1 + prev2
        prev1, prev2 = prev2, curr
    return prev2

# 2D DP - Longest Common Subsequence
def lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

# Knapsack 0/1
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], dp[i-1][w-weights[i-1]] + values[i-1])
    return dp[n][capacity]

# Common DP patterns
# - Fibonacci: dp[i] = dp[i-1] + dp[i-2]
# - LIS: dp[i] = max(dp[j] + 1) for j < i if nums[j] < nums[i]
# - LCS: dp[i][j] = dp[i-1][j-1] + 1 if match else max(...)
# - Knapsack: dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight] + value)
# - Coin change: dp[i] = min(dp[i], dp[i-coin] + 1)
# - Edit distance: dp[i][j] = min operations to convert s1[:i] to s2[:j]
```

---

## 🔎 BFS & DFS

```python
# BFS - Shortest path in unweighted graph
from collections import deque
def bfs(start, target, graph):
    queue = deque([(start, 0)])  # (node, distance)
    visited = {start}
    while queue:
        node, dist = queue.popleft()
        if node == target:
            return dist
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))
    return -1

# DFS - Recursive
def dfs_recursive(node, visited, graph):
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs_recursive(neighbor, visited, graph)

# DFS - Iterative
def dfs_iterative(start, graph):
    stack = [start]
    visited = set()
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            stack.extend(reversed(graph[node]))
    return visited

# Number of islands
def num_islands(grid):
    if not grid:
        return 0
    count = 0
    rows, cols = len(grid), len(grid[0])
    
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)
    
    for i in range(rows):
        for j in range(cols):
            if grid[i][j] == '1':
                dfs(i, j)
                count += 1
    return count
```

---

## 🔢 Bit Manipulation

```python
# Basic operations
a & b       # AND
a | b       # OR
a ^ b       # XOR
~a          # NOT
a << n      # Left shift
a >> n      # Right shift

# Common tricks
a & 1       # Check if odd (last bit is 1)
a | (1 << n)  # Set nth bit to 1
a & ~(1 << n) # Set nth bit to 0
a ^ (1 << n)  # Toggle nth bit
a & (a - 1)   # Clear lowest set bit
a & -a        # Get lowest set bit

# XOR properties
a ^ a = 0     # Same numbers cancel
a ^ 0 = a     # XOR with 0 is identity
a ^ b ^ a = b # XOR is commutative and associative

# Find single number (all others appear twice)
def single_number(nums):
    result = 0
    for num in nums:
        result ^= num
    return result

# Check if power of 2
def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0

# Count set bits
def count_bits(n):
    count = 0
    while n:
        count += n & 1
        n >>= 1
    return count

# Or use built-in
bin(n).count('1')
```

---

## 🎯 Common Patterns

### Prefix Sum
```python
# Build prefix sum array
prefix = [0] * (len(arr) + 1)
for i in range(len(arr)):
    prefix[i + 1] = prefix[i] + arr[i]

# Range sum query [left, right]
range_sum = prefix[right + 1] - prefix[left]
```

### Difference Array
```python
# For range update problems
diff = [0] * (n + 1)
# Add val to range [l, r]
diff[l] += val
diff[r + 1] -= val

# Reconstruct actual array
arr = [0] * n
arr[0] = diff[0]
for i in range(1, n):
    arr[i] = arr[i-1] + diff[i]
```

### Monotonic Stack
```python
# Next greater element
def next_greater(arr):
    result = [-1] * len(arr)
    stack = []
    for i in range(len(arr) - 1, -1, -1):
        while stack and stack[-1] <= arr[i]:
            stack.pop()
        if stack:
            result[i] = stack[-1]
        stack.append(arr[i])
    return result
```

### Union Find (Disjoint Set Union)
```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True
```

### Topological Sort
```python
def topological_sort(n, edges):
    graph = [[] for _ in range(n)]
    indegree = [0] * n
    for u, v in edges:
        graph[u].append(v)
        indegree[v] += 1
    
    queue = deque([i for i in range(n) if indegree[i] == 0])
    result = []
    while queue:
        node = queue.popleft()
        result.append(node)
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)
    
    return result if len(result) == n else []  # Empty if cycle exists
```

---

## 📝 Time Complexity Quick Reference

| Operation | Time Complexity |
|-----------|-----------------|
| List append/pop | O(1) |
| List insert/delete | O(n) |
| Dict get/set | O(1) average |
| Set add/remove | O(1) average |
| Heap push/pop | O(log n) |
| Binary search | O(log n) |
| Merge sort | O(n log n) |
| Quick sort | O(n log n) average |
| BFS/DFS | O(V + E) |
| Dijkstra | O((V + E) log V) |

---

## 🧪 Useful Imports

```python
from collections import defaultdict, Counter, deque, OrderedDict
from heapq import heapify, heappush, heappop, nsmallest, nlargest
from itertools import combinations, permutations, product, accumulate
from functools import lru_cache, reduce, cmp_to_key
from math import inf, sqrt, ceil, floor, gcd, lcm
from typing import List, Dict, Set, Tuple, Optional
from bisect import bisect_left, bisect_right, insort
import random
```

---

## 💡 Final Tips

1. **Know your constraints** — O(n²) for n≤1000, O(n log n) for n≤10⁵
2. **Use built-ins** — Python's standard library is powerful
3. **Practice patterns** — Not memorizing solutions, but recognizing patterns
4. **Write clean code** — Variable names matter even in interviews
5. **Test edge cases** — Empty input, single element, duplicates

---

*Bookmark this page. Use it during practice. The goal is to internalize these patterns until they become second nature.*

*Good luck with your interviews!* 🚀

---

*This post is part of the Informatics series on coding interview preparation.*
