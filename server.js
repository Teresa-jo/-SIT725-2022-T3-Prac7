var express = require("express")
var app = express()
var cors = require("cors");
let projectCollection;
let dbConnect = require("./dbConnect");
let projectRoutes = require("./routes/projectRoutes");

let http = require('http').createServer(app);
let io = require('socket.io')(http);

var port = process.env.port || 3000;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/api/projects', projectRoutes)


app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req,res,next){
  var firstNumber = parseInt(req.params.firstNumber) 
  var secondNumber = parseInt(req.params.secondNumber)
  var result = firstNumber + secondNumber || null
  if(result == null) {
    res.json({result: result, statusCode: 400}).status(400)
  }
  else { res.json({result: result, statusCode: 200}).status(200) } 
})

// Socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);
});

http.listen(port, () => {
  console.log("App listening to http://localhost:" + port)
  // createCollection('Flowers')
})


// MongoDb connection
// var MongoClient = require('mongodb').MongoClient;

// Add database
// const uri = 'mongodb+srv://Yaru:Newworld1223@cluster1.ehpmsoe.mongodb.net/?retryWrites=true&w=majority'
// const client = new MongoClient(uri, {useNewUrlParser: true})

/*
 const insertProjects = (project, callback) => {
  projectCollection.insert(project, callback);
}

const getProjects = (callback) => {
  projectCollection.find({}).toArray(callback);
}
*/

/* 
  const createCollection = (collectionName) => {
    client.connect((err, db) => {
      projectCollection = client.db().collection(collectionName);
      if (!err){
        console.log("MonogoDB Connected")
      }
      else {
        console.log("DB Error: ", err);
        process.exit(1);
      }
    })
  }
  */

/* const cardList = [
    {
        title: "Kitten",
        image: "images/image2.jpg",
        link: "About Kitten",
        description: "Demo description about kitten 2"
    },
    {
        title: "Kitten 3",
        image: "images/flower1.jpg",
        link: "About Kitten 3",
        description: "Demo description about kitten 3"
    }
]
*/

/*
app.get('/api/projects', (req, res) => {
  getProjects((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err })
    }
    else {
      res.json({ statusCode: 200, message: "Success", data: result })
    }
  })
})

app.post('/api/projects', (req, res) => {
  console.log("New Project added", req.body)
  var newProject = req.body;
  insertProjects(newProject, (err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err })
    }
    else {
      res.json({ statusCode: 200, message: "Success", data: result })
    }
  })
})
*/


