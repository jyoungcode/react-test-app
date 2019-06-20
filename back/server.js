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

// 파일때문에 multer
const multer = require('multer');
const upload = multer({ dest: './upload'});

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

// upload 폴더 공유를 위해
// 사용자는 image라는 path로 upload폴더를 접근할 수있게
app.use('/image', express.static('./upload'));

// upload.single('image')는 image라는 데이터명을 받아온다는 뜻
// **주의 : gitignore에 upload폴더 등록
app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));