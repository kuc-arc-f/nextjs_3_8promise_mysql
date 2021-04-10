export default {
  add_test3 :async function(num , token){
    try{
      var item = {
        title:"title-" + num,
        content: "content-" + num,
        _token: token
      }
      const res = await fetch('http://localhost:3000/api/tasks/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        const json = await res.json()
      } else {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.log(err);
      throw new Error("Error, add_test ");
    }
  },
  getRandomStr :function(){
    var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var random = Math.floor( Math.random()* s.length );
    if(random >= s.length){ throw new Error('Error , getRandomStr'); }
   //    console.log(s[random] )
    return s[random]    
  },
  get_apikey :function(){
    try{
      var s = ""
      for(var i=0; i< 24; i++ ){
        s += this.getRandomStr()
      }
//      console.log(s)
      return s
    } catch (err) {
      console.log(err);
      throw new Error('error, get_apikey');
    }    
  },  

}
