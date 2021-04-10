import Head from 'next/head'
import React from 'react'
import cookies from 'next-cookies'

import Layout from '../../components/layout'
import LibConst from '../../libs/LibConst'
import LibBook from '../../libs/LibBook'
//
function Page(props) {
  var item = props.item
  var tags = props.tags
// console.log(tags)
  return (
  <Layout>
    <div className="container">
      <div><h1>{item.title}</h1>
      </div>
      <div>Content: {item.content}
      </div>
      Date: {item.created_at} 
      <hr />
      Category : {item.category_name}
      <hr />
      Tag : 
      <pre className="pre_text">
      {tags.map((item, index) => {
//console.log(item)
        return (<span key={index}> #{item.name}</span>)
      })}      
      </pre>           
    </div>
  </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  console.log(ctx.query.id)
  var BASE_URL = process.env.BASE_URL
  var id = ctx.query.id
  var user_id = cookies(ctx).user_id
  var url = BASE_URL +'/api/books/show?id=' + id
  url += "&user_id=" +user_id
  const res = await fetch(url)
  const json = await res.json()
  url = BASE_URL + '/api/tags/list'
  const resTag = await fetch(url)
  const jsonTag = await resTag.json()  
  var tag_arr = JSON.parse(json.item.tagIds || '[]')
  var tags = LibBook.get_tag_items(tag_arr , jsonTag.items)  
  var item = json.item
  return {
    props: { item , tags },
  }
}
export default Page

