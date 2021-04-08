import LibPagenate from '../../../libs/LibPagenate'
import Mysql from "../../../libs/Mysql"

//
export default async function (req, res){
  try{
    let connection =  await Mysql.get_connection()        
    //console.log("uid=", req.query.uid)
    var items = []
    var results = await connection.query('SELECT * FROM Category order by id desc')
    items = results
    var ret ={
      items: items
    }   
    await connection.end();
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send(); 
  }   
};