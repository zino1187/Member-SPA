var express = require('express');
var pool = require("../mymodule/pool");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express 동작 성공' });
});

router.post('/regist', function (req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var age = req.body.age;

  console.log("등록요청 받음", name, email, age);

  pool.getConnection(function (error, con) {
    if (error) {
      console.log(error);
    } else {
      var sql = "insert into member(name,email,age) values(?,?,?)";
      con.query(sql, [name, email, age], function (err, result, fields) {
        if (err) {
          console.log(err);
        } else {
          var obj = null;
          if (result.affectedRows == 0) {
            obj = { result: 0 };
          } else {
            obj = { result: 1 };
          }
          res.writeHead(200, { "Content-Type": "text/json" });
          res.end(JSON.stringify(obj));
        }
        pool.releaseConnection(function (e) { });
      });
    }
  });
});


/* 조회하기 */
router.get("/list", function (req, res, next) {

  pool.getConnection(function (error, con) {
    if (error) {
      console.log(error);
    } else {
      var sql = "select * from member order by member_id asc";
      con.query(sql, function (err, result, fields) {
        if (err) {
          console.log(err);
        }else{
          res.writeHead(200, { "Content-Type": "text/json" });
          res.end(JSON.stringify(result));
        }
        pool.releaseConnection(function(e){});
      });
    }
  });
});

module.exports = router;
