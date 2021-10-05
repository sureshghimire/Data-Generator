const mysql = require('mysql');
const sql = require('mssql/msnodesqlv8');
const express = require('express');
require('dotenv').config();
const ObjectsToCsv = require('objects-to-csv')

const app = express();
const port = process.env.port || 8888;



let config = {
    user: 'cs4962stu01',
    password: 'ZkYuPMpEd0Uy',
    server: 'cs3.calstatela.edu', // You can use 'localhost\\instance' to connect to named instance
    database: 'cs4962stu01'
};


// Date Generator
function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
let birthYear = getRandomDate(new Date(2000, 0, 1), new Date()).getFullYear();

//Connect to sql
sql.connect(config);
const request = new sql.Request()

app.get('/', (req, res) => {
    //View every records
    request.query('Select *From test')
        .then((res) => {
            console.log(res.recordset)
        })
})


app.get('/millions', (req, res) => {
    //let insertName = request.input('year', sql.NVarChar(4),randomDate ).query(`INSERT into test (BirthYear) VALUES (  ${randomDate}) `)


    function getRandomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    const birthYear = getRandomDate(new Date(2000, 0, 1), new Date()).getFullYear();

    //insert into the table
    let insertYear = request.query(`INSERT into test_table (BirthYear) VALUES ( ${birthYear})`)
    console.log(birthYear)
    return insertYear.recordset;

    // Max Col 1024 in sql so unable to process
})

//Route to covert array to cvs
app.get('/list', (req, res) => {
    const max = 100000;
    let arrayDate = [];
    for (let index = 0; index < max; index++) {

        function getRandomDate(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }
        const birthYear = getRandomDate(new Date(2000, 0, 1), new Date()).getFullYear();

        //populate on array
        arrayDate[index] = { "BirthYear": birthYear };
    }

    console.log(arrayDate)


    async function toCSV(data) {
        const csv = new ObjectsToCsv(data);
        await csv.toDisk('./test');

        console.log(await csv.toString())
    }

    toCSV(arrayDate);





})


app.listen(port, () => { console.log(`Listening to ${port}`) })
