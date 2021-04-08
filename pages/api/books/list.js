import LibPagenate from '../../../libs/LibPagenate'
import Mysql from "../../../libs/Mysql"

//
export default async function (req, res){
  try{
    let connection =  await Mysql.get_connection()    
    //console.log("uid=", req.query.uid)
    var items = []
    var sql = `
    SELECT Book.*,
      Category.name as category_name
    FROM Book
    LEFT OUTER JOIN Category ON Category.id = Book.categoryId
    order by Book.id desc
    `;
    var results = await connection.query(sql)
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