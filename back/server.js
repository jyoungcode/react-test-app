const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.get('/api/hello', (req, res) => {
//   res.send({ message: 'Hello Express!' });
// });


// https://jsonlint.com/
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


app.listen(port, () => console.log(`Listening on port ${port}`));