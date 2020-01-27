var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
const AWS = require('aws-sdk');
const config = require('../../config/config');
AWS.config.update(config.aws_local_config);
var docClient = new AWS.DynamoDB.DocumentClient();

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

// Gets all Employees
router.get('/selempall', (req, res, next) => {

  const params = {
    TableName: config.aws_table_name
  };

  docClient.scan(params, function (err, data) {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      res.json(data);
    }
  });
});

// Post employee

router.post('/empost', bodyParser.json(), (req, res, next) => {
  if (req.body !==  {}){


    var empId = parseInt(req.body.empId);
    var Fname = req.body.Fname1;
    var surnam = req.body.surnam1;
    var email = req.body.email1;
    var DOB = req.body.DOB1;
    var Gen = req.body.gen1;

    var params = {
      TableName: config.aws_table_name,
      Item: {
        empno: empId,
        empfname: Fname,
        empsurnam: surnam,
        empemail: email,
        empdob: DOB,
        empgen: Gen
      },
      ConditionExpression: 'attribute_not_exists(empno)'
    };

    docClient.put(params, function (err, data) {
      if (err) {

        res.send({
          success: false,
          message: 'Error:Request Body is null'
        });
      } else {
        console.log('data', data);
        const { Items } = data;
        res.send({
          success: true,
          message: 'Employee Created',
          empno: empId

        });
      }
    });
  }
});


// Get a single emp by id
router.get('/selemp/:id', function (req, res) {

  var empId = parseInt(req.params.id, 10);

  var params = {
    TableName: config.aws_table_name,
    KeyConditionExpression: "empno = :id",
    ExpressionAttributeValues: {
      ":id": empId
    }
  };
  docClient.query(params, function (err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.log("Query succeeded.");
      res.send(data.Items)
      }
     
});
});

//update
router.put('/updemp/:id', function (req, res) {
      var empId = parseInt(req.params.id, 10);
console.log("test",empId);
  var Fname = req.body.Fname1;
  var surnam = req.body.surnam1;
  var email = req.body.email1;
  var DOB = req.body.DOB1;
  var Gender = req.body.gender1;

  var params = {
    TableName: config.aws_table_name,
    Key: {
      empno: empId,
    },
             UpdateExpression: "set empfname=:Fname1,empsurnam=:surnam1,empemail=:email1,empdob=:DOB1,empgen=:gender1",
             ConditionExpression : 'attribute_exists(empno)',
        ExpressionAttributeValues: {
      ":Fname1": Fname,
      ":surnam1": surnam,
      ":email1": email,
      ":DOB1": DOB,
      ":gender1": Gender
    },
    
    ReturnValues: "UPDATED_NEW"
  };
      console.log("param val",params);
        docClient.update(params, function (err, data) {
     
        if (err) {
        console.error("Unable to update item. Error JSON:", empId, ". Error JSON:", JSON.stringify(err, null, 2));
  
        res.send({
          success: false,
          message: 'Error: Employee id does not exist.Enter a valid Id'
  
        });
      }
      else {
        console.log('data', data);
        res.send({
          success: true,
          message: 'Employee Details Updated',
          empno: empId
        });
      }
    });
  
});


// Get employee for deletion
router.delete('/delemp/:id', function (req, res) {
  console.log("inseide dele", req.url);
  var empId = parseInt(req.params.id, 10);
  console.log(req.url)
  console.log(empId);

  var params = {
    TableName: config.aws_table_name,
    Key: {
      empno: empId,
    },
  };
  console.log("Attempting a conditional delete...");
  docClient.delete(params, function (err, data) {

    if (err) {
      console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
      res.send({
        success: true,
        message: 'Employee Record deleted',
        empno: empId
      });
    }
  });
});
module.exports = router;

