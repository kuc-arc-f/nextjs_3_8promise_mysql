var csrf = require('csrf');
var tokens = new csrf();
//import LibPrisma from '../../../libs/LibPrisma'
import Mysql from "../../../libs/Mysql"
import LibConst from '../../../libs/LibConst'
//
export default async function (req, res){
  try{
    let connection =  await Mysql.get_connection()    
    var ret_arr = {ret:0, msg:""}
    if (req.method === "POST") {
      var data = req.body
//console.log(data);
      var token =data._token
      var category_id =data.category_id
      var CSRF_SECRET = process.env.CSRF_SECRET
      if(tokens.verify(CSRF_SECRET, token) === false){
        throw new Error('Invalid Token, csrf_check');
      }
      let sql = `
      INSERT INTO Book (title , content, createdAt ,categoryId 
      ) VALUES
      ('${ data.title }',
      '${ data.content }',
      now(),
      ${category_id} 
      )
      `;
      var results = await connection.query(sql) 
//console.log(results.insertId)            
      await connection.end();
    }
    res.json([]);
  } catch (err) {
      console.log(err);
      res.status(500).send(); 
  }   
};