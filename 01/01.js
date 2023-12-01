const input = Bun.file("01_input.txt")
const txt = await input.text()
let total = 0;

for (let line of txt.split("\n")) {
  let original = line
  const doubles = {"oneight": 1, "twone": 2, "threeight": 3, "fiveight": 5, "nineight": 9, "sevenine": 7, "eightwo": 8, "eighthree": 8}
  const doublesReverse = {"oneight": 8, "twone": 1, "threeight": 8, "fiveight": 8, "nineight": 8, "sevenine": 9, "eightwo": 2, "eighthree": 3}
  const nums = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9}
  Object.keys(doubles).forEach(key => {
    line = line.replaceAll(key, doubles[key])
  })
  Object.keys(nums).forEach(key => line = line.replaceAll(key, nums[key]))
  let linevalue = 0
  for (let val of line.split("")) {
    if (val >= '0' && val <= '9') {
      linevalue = 10 * parseInt(val);
      break
    }
  }
  line = original
  Object.keys(doublesReverse).forEach(key => {
    line = line.replaceAll(key, doublesReverse[key])
  })
  Object.keys(nums).forEach(key => line = line.replaceAll(key, nums[key]))

  for (let val of line.split("").reverse()) {
    if (val >= '0' && val <= '9') {
      linevalue += parseInt(val);
      break
    }
  }
  total += linevalue
}
console.log(total)