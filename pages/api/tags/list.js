import LibPrisma from '../../../libs/LibPrisma'
import LibPagenate from '../../../libs/LibPagenate'

//
export default async function (req, res){
  try{
    const prisma = LibPrisma.get_client()
    //console.log("uid=", req.query.uid)
    var items = []
    //
    const posts = await prisma.tag.findMany({
      orderBy: [
        {
          id: 'desc',
        },
      ],
    })
//    items = LibPagenate.get_items(posts, 0, 100 )
    items = posts
    var ret ={
      items: items
    }   
    await prisma.$disconnect()
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send(); 
      await prisma.$disconnect()   
  }   
};