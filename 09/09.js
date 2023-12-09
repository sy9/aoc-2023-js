const input = await Bun.file("09_input.txt").text()
const lines = input.split("\n")

let total = 0, totalFirsts = 0

lines.forEach(line => {
  let nums = line.split(" ").map(n => parseInt(n))
  const finals = [nums[nums.length-1]]
  const firsts = [nums[0]]
  while (!allZero(nums)) {
    nums = diff(nums)
    finals.push(nums[nums.length-1])
    firsts.push(nums[0])
  }
  total += getNext(finals)
  totalFirsts += getNextNeg(firsts)
})

console.log("part a: ", total)
console.log("part b: ", totalFirsts)

// allZero returns true if all elements in arr are 0
function allZero(arr) {
  for (const i of arr)
    if (i !== 0) return false
  return true
}

// diff returns an array containing the difference between
// arr1 elements
function diff(arr1) {
  const arr2 = []
  for (let i = 1; i<arr1.length; i++) {
    arr2.push(arr1[i] - arr1[i-1])
  }
  return arr2
}

function getNext(arr) {
  let total = 0
  for (let i=(arr.length-1); i>0; i--) {
    total += arr[i-1]
  }
  return total
}

function getNextNeg(arr) {
  let total = 0
  for (let i=(arr.length-1); i>=0; i--) {
    total = arr[i] - total
  }
  return total
}
