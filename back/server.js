const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const config = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  port: config.port,
  database: config.database
});

connection.connect();

/* 주의!
1. gitignore에 database 안올라가게 설정 (데이터베이스 id,pw 안올리게)
2. database.json 생성
*/

// app.get('/api/hello', (req, res) => {
//   res.send({ message: 'Hello Express!' });
// });


// https://jsonlint.com/
// 하드코딩데이터
/*
app.get('/api/customers', (req, res) => {
  res.send([
    {
      "id": 1,
      "image": "https://placeimg.com/64/64/any",
      "name": "John",
      "birthday": "890424",
      "gender": "man",
      "job": "학생"
    },
    {
      "id": 2,
      "image": "https://placeimg.com/64/64/any",
      "name": "Nana",
      "birthday": "890424",
      "gender": "girl",
      "job": "교사"
    },
    {
      "id": 3,
      "image": "https://placeimg.com/64/64/any",
      "name": "Sara",
      "birthday": "890424",
      "gender": "girl",
      "job": "학생"
    }
  ]);
});
*/

app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER",
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.listen(port, () => console.log(`Listening on port ${port}`));