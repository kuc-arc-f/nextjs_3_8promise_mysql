import LibPagenate from '../../libs/LibPagenate'
import Mysql from "../../libs/Mysql"
//
export default async function (req, res){
  try{
    let connection =  await Mysql.get_connection()
    var results = await connection.query('SELECT * FROM Task order by id desc')
//console.log(results[0].id)
//console.log(results[0])
    var ret ={
      items: results
    }   
    res.json(ret);
    connection.end();
  } catch (err) {
      console.log(err);
      res.status(500).send(); 
  }   
};

