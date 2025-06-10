// import libraries
const express = require('express')
const sqlite3 = require('sqlite3')

const app = express()

// allows express to understand p5 code
app.use(express.json());
app.use(express.urlencoded({ extended: true })) 

// connects to p5 in public folder
const server = app.listen(process.env.PORT, function() {
  console.log('server running')
})
// server static files
app.use(express.static('public')) 

// function add score to database
app.post("/addScore", function(req, res) { 
  // req.body is the object p5 code sends containing the score and the name

  console.log(req.body)

  // opens database under instance db 
  let db = new sqlite3.Database('database.db');
  // sql demands
  let sql = `INSERT INTO scores (name,score) VALUES ("${req.body.name}",${req.body.score});` 
  // runs the sql on the database
  db.run(sql, function(err) {
    if (err) {
      console.log(err)
      res.send('there was an error')
    }else{
      res.send('score saved thanks')
    }
  });
  // close database
  db.close()
})

// function displays top scores
app.get("/topScores", function(req, res) {
    // open the database
    let db = new sqlite3.Database('database.db');
    // gets the top 3 scores 
    let sql = 'SELECT * FROM SCORES ORDER BY SCORE DESC LIMIT 5;'
    db.all(sql, function(err, rows) {
      if (err) {
        console.log(err)
      }else{
        res.send(rows)
      }
      // closes database
      db.close()
    });
})


// this code prints entire table
const db = new sqlite3.Database('database.db')

let sql = 'select * from scores' // prints entire table
db.all(sql, function(err, rows) {
  if (err) {
    throw err
  }
  for (let row of rows) {
    // displays entire table
    console.log(row) 
  }
  db.close()
})

