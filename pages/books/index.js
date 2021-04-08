import Link from 'next/link';
import React from 'react';
import Router from 'next/router'
import flash from 'next-flash';
import cookies from 'next-cookies'

import IndexRow from './IndexRow';
import Layout from '../../components/layout'
import LibConst from '../../libs/LibConst'

//
export default class Page extends React.Component {
  static async getInitialProps(ctx) {
    var BASE_URL = LibConst.get_config().BASE_URL
    var url = BASE_URL+ '/api/books/list?uid=' + cookies(ctx).user_id
    const res = await fetch(url)
    const json = await res.json()

//console.log(cookies(ctx).user_id)
    return { 
      items: json.items ,user_id :cookies(ctx).user_id,
    }
  }
  constructor(props){
    super(props)
//console.log(this.props.items )
  }  
  componentDidMount(){
//console.log(this.props.items)
    if(typeof this.props.user_id === 'undefined'){
    }    
  }
  render() {
    const items = this.props.items
console.log( items )
    return (
    <Layout>
      <div className="container">
        <Link href="/books/create">
          <a className="btn btn-primary mt-2">New</a>
        </Link>          
        <h1>Books</h1>
        <ul>
        {items.map((item, index) => {
          var categoryName = 'Unknown category'
          if(item.category_name != null ){ categoryName = item.category_name}
//console.log( categoryName )
          return (<IndexRow key={index}  categoryName={categoryName}
            id={item.id} title={item.title} />       
          )
        })}      
        </ul>
      </div>
    </Layout>
    )
  }
}
