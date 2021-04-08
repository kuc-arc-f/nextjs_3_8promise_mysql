import Mysql from "../../../libs/Mysql"
import LibPagenate from '../../../libs/LibPagenate'

//
export default async function (req, res){
  try{
    let connection =  await Mysql.get_connection()    
    //console.log("uid=", req.query.uid)
    var items = []
    var sql = `
    SELECT * FROM Tag order by id desc
    `;
    var results = await connection.query(sql)
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