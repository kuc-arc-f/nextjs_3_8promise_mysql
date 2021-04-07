import Head from 'next/head'
import React from 'react'
import cookies from 'next-cookies'

import Layout from '../../components/layout'
import LibConst from '../../libs/LibConst'
//
function Page(data) {
  var item = data.item
console.log(data.item )
  return (
  <Layout>
    <div className="container">
      <div><h1>{item.title}</h1>
      </div>
      <div>Content: {item.content}
      </div>
      Date: {item.created_at} 
      <hr />     
    </div>
  </Layout>
  )
}
//
Page.getInitialProps = async (ctx) => {
console.log(ctx.query.id)
//  var BASE_URL = process.env.BASE_URL
  var BASE_URL = LibConst.get_config().BASE_URL
// console.log("uid=", cookies(ctx).user_id)
  var id = ctx.query.id
  var user_id = cookies(ctx).user_id
  var url = BASE_URL +'/api/tasks/show?id=' + id
  url += "&user_id=" +user_id
  const res = await fetch(url)
  const json = await res.json()
  var item = json.item
//console.log(item)
  return { item:item }
}

export default Page

