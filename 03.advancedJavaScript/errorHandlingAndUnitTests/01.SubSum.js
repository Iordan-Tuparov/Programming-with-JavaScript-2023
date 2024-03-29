function subSum(array, start, end) {

    if (!Array.isArray(array)) {
        return NaN;
    }

    let startIndex = Math.max(start, 0);
    let endIndex = Math.min(end, array.length - 1);

    let subSum = array.slice(startIndex, endIndex + 1);
    let sum = subSum.reduce((a, x) => a + Number(x), 0);

    return sum;
}

console.log(subSum([10, 20, 30, 40, 50, 60], 3, 300));
console.log(subSum([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1));