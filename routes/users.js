const express = require('express');
const router = express.Router();

/* GET users listing. */
function usersRouter(connection, db) {
  router.get('/', async function (req, res, next) {
    let id=req.query.id;
    let sql
    if(id){
      sql="SELECT first_name ,last_name FROM users WHERE id=? and role='vendedor'"
    }else{
      sql="SELECT first_name ,last_name FROM users WHERE role='vendedor'"
    }

    // query to database. Mysql and Oracle modules have different ways to query, this is why the if is needed.
    if (db === 'oracle') {
      try {
        const results = await connection.execute(sql,id, []);
        res.send(results.rows);
      } catch (err) {
        console.log('Ouch!', err)
      }
    } else {
      const request = connection.query(sql,id, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
      })
      console.log(request.sql)
    }
  });
  return router;
}
module.exports = usersRouter;
