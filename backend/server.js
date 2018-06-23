const express = require('express');
const app = express();
const cors = require('cors')();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost', //127.0.0.1
  port: '3306',
  user: 'root',
  password: 'frontend',
  database: 'phonebook'
});

connection.connect((err)=>{
  if (err){
    console.log(err);
  }
  console.log('디비 연결이 잘 되었습니다.');
      //원래 4000포트가 뒤고 디비연결이 앞이여야 하는데 결과가 디비연결이 뒤임. 왜? ->콜백이어서
});

connection.query('SELECT * FROM test',(err,rows)=>{
  if(err){
    console.log(err);
  }
  console.log(rows);
})
//console.log(rows); -> [RowDataPacket < id: 1, number:10 > ]
//                   -> 배열로 넘어옴. 한열당 하나의 객체로 생각
//console.log(rows[0].number); -> 10

app.use(cors);

app.listen(4000,()=>{
  console.log('4000포트로 웹서버가 실행되었습니다.');
});

app.get('/test',(req,res)=>{
  // res.json({
  //   number : 10
  // });
  // 디비 쿼리를 통해서 원하는 값을 보내준다.
  connection.query('SELECT * FROM test',(err,rows)=>{
    if(err){
      console.log(err);
    }
    // res.json({number : rows[0].number});
    res.json({ result : rows });
  })
});

app.post('/test',(req,res)=>{
  // console.log('a');
  //데이터는 body를 통해서 넘어온다.
  console.log(req.body.num);

  //디비에 Insert를 사용해서 데이터를 넣는다.
  /*
  connection.query('INSERT INTO test SET ?',
  {number : req.body.num},
  (err,rows)=>{
    if(err){
      console.log(err);
    }
    console.log(rows);
  });
*/

  connection.query('INSERT INTO test SET number="' + req.body.num + '"',
  (err,rows)=>{
    if(err){
      console.log(err);
    }
    console.log(rows);
    res.json({message : '잘받았어'});
  });

});
