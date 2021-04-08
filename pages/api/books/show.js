import Mysql from "../../../libs/Mysql"
//
export default async function (req, res){
  try{
    let connection =  await Mysql.get_connection()    
// console.log(req.query );
    var id = req.query.id
    var sql = `
    SELECT Book.*,
      Category.name as category_name
    FROM Book
    LEFT OUTER JOIN Category ON Category.id = Book.categoryId
    where Book.id =${id}
    order by Book.id desc
    `;    
    var post = await connection.query(sql)    
//console.log( post);
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