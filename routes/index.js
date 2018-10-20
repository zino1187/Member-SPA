var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express 동작 성공' });
});

router.post('/regist', function(req, res, next) {
  console.log("등록요청 받음");
  //파라미터 받기!!!
  var name=req.body.name; //{name:"",email:""}
  var email=req.body.email;
  var age=req.body.age;

  console.log(name, email, age);
  var obj=null;
  obj={
    result:1
  }
  res.writeHead(200, {"Content-Type":"text/json"});
  res.end(obj);

});

module.exports = router;
