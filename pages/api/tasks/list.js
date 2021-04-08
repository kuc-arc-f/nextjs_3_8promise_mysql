import Mysql from "../../../libs/Mysql"
import LibPagenate from '../../../libs/LibPagenate'
//
export default async function (req, res){
  try{
    let connection =  await Mysql.get_connection()
//console.log("uid=", req.query.uid)
    var results = await connection.query('SELECT * FROM Task order by id desc LIMIT 100')
    var ret ={
      items: results
    }  
    await connection.end();
    res.json(ret);
  } catch (err) {
    console.log(err);
    res.status(500).send(); 
  }   
};