import Mysql from "../../../libs/Mysql"
//
export default async function (req, res){
  try{
    let connection =  await Mysql.get_connection()    
// console.log(req.query );
    var id = req.query.id
    let sql = `
      SELECT * FROM Task where id=${id}
    `;
    var post = await connection.query(sql)
//    var post = await connection.query(sql)
//console.log(post);
    var ret ={
      item: post[0]
    }
    await connection.end();
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};