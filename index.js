let SERVER_NAME = 'user-api'
let PORT = 3000;
let HOST = '127.0.0.1';

const mongoose = require ("mongoose");
const username = "user1";
const password = "strongpassword";
const dbname = "Cluster0";

// Atlas MongoDb connection string format
let uristring = 'mongodb+srv://user1:strongpassword@cluster0.vlecl7q.mongodb.net/?appName=Cluster0'+
 dbname+'?retryWrites=true&w=majority';

// Makes db connection asynchronously
mongoose.connect(uristring, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
  // we're connected!
  console.log("!!!! Connected to db: " + uristring)
});

const testSchema = new mongoose.Schema({
    testType: String,
    testResult: String,
    testDate: { type: Date, default: Date.now } // Add timestamp field
})

const userSchema = new mongoose.Schema({
  name: String, 
  age: String,
  deparment: String,
  test: [testSchema]
});

let UsersModel = mongoose.model('Users', userSchema);

let errors = require('restify-errors');
let restify = require('restify')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('**** Resources: ****')
  console.log('********************')
  console.log(' /users')
  console.log(' /users/:id')  
})

server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());


// Create a new patients
server.post('/patients', function (req, res, next) {
  console.log('POST /patient params=>' + JSON.stringify(req.params));

  // validation of manadatory fields
  if (req.body.name === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new errors.BadRequestError('name must be supplied'))
  }else if (req.body.age === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new errors.BadRequestError('age must be supplied'))
  } else if (req.body.deparment === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new errors.BadRequestError('age must be supplied'))
  }

  let newUser = new UsersModel({
		name: req.body.name, 
		age: req.body.age,
    deparment: req.body.deparment,
    test: []
	});

  // Create the user and save to db
  newUser.save()
    .then((user)=> {
      console.log("saved user: " + user);
      // Send the user if no issues
      res.send(201, user);
      return next();
    })
    .catch((error)=>{
      console.log("error: " + error);
      return next(new Error(JSON.stringify(error.errors)));
  });
})

server.get('/patients', function (req, res, next) {
  console.log('GET /patients query=>');
  UsersModel.find({})
    .then((users)=>{
      console.log("found users: " + users);
      res.send(users);
      return next();
    })
    .catch((error)=>{
      console.log("error: " + error);
      return next(new Error(JSON.stringify(error.errors)));
  });
})

server.get('/patients/:id', function (req, res, next) {
  console.log('GET /patients/:id params=>' + JSON.stringify(req.params));
  
  UsersModel.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return next(new errors.NotFoundError('Patient not found'));
      }
      res.send(user);
      return next();
    })
    .catch((error) => {
      console.log("error: " + error);
      return next(new Error(JSON.stringify(error.errors)));
    });
})

server.post('/patients/:id/test', function (req, res, next) {
  console.log('POST /patients/:id/test params=>' + JSON.stringify(req.params));
  console.log('POST /patients/:id/test body=>' + JSON.stringify(req.body));

  if (req.body.tests === undefined) {
    return next(new errors.BadRequestError('Test must be supplied'))
  }

  const incomingTests = Array.isArray(req.body.tests) ? req.body.tests : [req.body.tests];

  // Basic validation: each test must include a testType
  for (const t of incomingTests) {
    if (!t || t.testType === undefined) {
      return next(new errors.BadRequestError('Each test must include a testType'))
    }
  }

  UsersModel.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return next(new errors.NotFoundError('Patient not found'));
      }

      // Add current timestamp to each test if not already provided
      incomingTests.forEach(incomingTest => {
        // If testDate is not provided, add current date
        if (!incomingTest.testDate) {
          incomingTest.testDate = new Date();
        }
        user.test.push(incomingTest);
      });

      return user.save();
    })
    .then((savedUser) => {
      console.log("added tests for user: " + (savedUser && savedUser.name));
      res.send(201, savedUser);
      return next();
    })
    .catch((error) => {
      console.log("error: " + error);
      return next(new Error(JSON.stringify(error.errors || error)));
    });
});

// Delete a patient by ID
server.del('/patients/:id', function (req, res, next) {
  console.log('DELETE /patients/:id params=>' + JSON.stringify(req.params));
  
  if (!req.params.id) {
    console.log('Failed to Delete')
    return next(new errors.BadRequestError('Patient ID must be supplied'))
  }

      console.log('Deleting')


  UsersModel.findOneAndDelete({ name: req.params.id })
    .then((deletedUser) => {
      if (!deletedUser) {
        return next(new errors.NotFoundError('Patient not found'));
      }
      
      console.log("deleted patient: " + deletedUser.id);
      res.send(200, {
        success: true,
        message: 'Patient deleted successfully',
        deletedPatient: {
          id: deletedUser._id,
          name: deletedUser.name
        }
      });
      return next();
    })
    .catch((error) => {
      console.log("error: " + error);
      return next(new Error(JSON.stringify(error.errors)));
    });
})