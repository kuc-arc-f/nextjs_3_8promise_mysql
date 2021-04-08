var csrf = require('csrf');
var tokens = new csrf();
import Mysql from "../../../libs/Mysql"
import LibConst from '../../../libs/LibConst'
//
export default async function (req, res){
  try{
    let connection =  await Mysql.get_connection()    
    var data = req.body
//console.log(data);
    var id = data.id
    var category_id =data.category_id
    var CSRF_SECRET = process.env.CSRF_SECRET
    if(tokens.verify(CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }
    let sql = `
      update Book set title = '${ data.title }' 
      , content = '${ data.content }'
      , categoryId = ${category_id}
      where id = ${id}
    `;     
    var result = await connection.query(sql)    
//console.log(add_data)   
    var ret ={
      item: {}
    }
    await connection.end();
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};