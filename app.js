const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

const authors = [
  {
    name: 'Haruki Murakami',
    books: [
      'Hard-Boiled Wonderland and the End of the World',
      'The Wind-Up Bird Chronicle'
    ]
  },
  {
    name: 'Kurt Vonnegut',
    books: [
      'Slaughterhouse-Five'
    ]
  }
]

app.get('/authors', (req, res) => {
  res.send(authors);
  
}) 

app.get('/authors/:id', (req, res, next) => {
  const id = Number(req.params.id);
  if (!authors[id]) {
    next({ status: 404, message: "Author Doesn't Exist." })
  } else {
    res.send(authors[id])}
}); 
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status).json({ error: err })
});

app.post('/authors', (req, res, next)=> {
  const {name} = req.body;
  if (!name) {
    next({status: 400, message: "Hey, Where's your Author's name?"})
  } else {
    authors.push({name})
      res.status(201).send(authors);
    }
})

/* Add RESTful routes for the following:

  - GET author by index
    - should respond 404 if author at index does not exist
  - POST author  
  - GET all books by author
  - POST book by author
    - should respond 404 if author does not exist
  - PATCH specific book by author
    - should respond 404 if author does not exist
  - DELETE specific book by author
    - should respond 404 if author does not exist
  
  Bonus challenge: Make middleware that checks if the requested author index exists, respond 404 if not.
*/



app.use((req, res) => {
  res.sendStatus(404)
})


app.listen(port, () => console.log(`Listening on port ${port}`))
