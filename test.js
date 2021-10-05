function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
let randomYear =  getRandomDate(new Date(2000, 0, 1), new Date())
console.log(randomYear.getFullYear())


const d = new Date(2019, 0, 23)
const year = d.getFullYear() // 2019
//console.log(year)
const date = d.getDate() // 23