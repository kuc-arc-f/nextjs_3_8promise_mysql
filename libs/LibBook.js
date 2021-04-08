
//
export default {
  get_category_item : function(id , categories){
    try{
      var ret = {}
      categories.forEach(function (category){
        if( id === category._id ){
          ret = category
        }
      });
      return ret;  
    } catch (e) {
      console.log(e);
      throw new Error('Error , get_category_item');
    } 
  },    
  get_tag_items : function(ids , tags){
    try{
      var ret = []
      ids.forEach(function (item){
        tags.forEach(function (tag){
          if( item === tag.id ){
//            ret = category
            ret.push(tag)
          }
        });
//        item.category = { name: ""}
//console.log(item)
      });
      return ret;  
    } catch (e) {
      console.log(e);
      throw new Error('Error , get_tag_items');
    } 
  },
}
