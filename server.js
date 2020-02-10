var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var HEROS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/heros/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/heros", function(req, res) {
  db.collection(HEROS_COLLECTION).find({}).toArray(function(err, heros) {
    if (err) {
      handleError(res, err.message, "Failed to get heros.");
    } else {
      res.status(200).json(heros);
    }
  });
});

app.post("/api/heros", function(req, res) {
  var newHero = req.body;
  newHero.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(HEROS_COLLECTION).insertOne(newHero, function(err, hero) {
      if (err) {
        handleError(res, err.message, "Failed to create new hero.");
      } else {
        res.status(201).json(hero.ops[0]);
      }
    });
  }
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/heros/:id", function(req, res) {
  db.collection(HEROS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, hero) {
    if (err) {
      handleError(res, err.message, "Failed to get hero");
    } else {
      res.status(200).json(hero);
    }
  });
});

app.put("/api/heros/:id", function(req, res) {
  var updateHero = req.body;
  delete updateHero._id;

  db.collection(HEROS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateHero, function(err, hero) {
    if (err) {
      handleError(res, err.message, "Failed to update hero");
    } else {
      updateHero._id = req.params.id;
      res.status(200).json(updateHero);
    }
  });
});

app.delete("/api/heros/:id", function(req, res) {
  db.collection(HEROS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete hero");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});