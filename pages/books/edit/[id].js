import Head from 'next/head'
import Router from 'next/router'
import React from 'react'
import flash from 'next-flash';
import cookies from 'next-cookies'

import Layout from '../../../components/layout'
import LibConst from '../../../libs/LibConst'
//
export default class extends React.Component {
  static async getInitialProps(ctx) {
console.log("id=", ctx.query.id)
    var BASE_URL = process.env.BASE_URL
    var id = ctx.query.id
    var user_id = cookies(ctx).user_id
    var url = BASE_URL + '/api/books/show?id=' + id
    url += "&user_id=" +user_id
    const res = await fetch(url)
    const json = await res.json()
    var item = json.item    
    var url = BASE_URL + '/api/token_get'
    var tokenRes = await fetch(url)
    var tokenJson = await tokenRes.json()  
    url = BASE_URL + '/api/category/list'
    const resCategory = await fetch(url)
    const jsonCategory = await resCategory.json() 
//    url = BASE_URL + '/api/tags/list'
    //const resTag = await fetch(url)
    //const jsonTag = await resTag.json()     
//console.log(jsonCategory)
    return {
      id: id,
      item: item,
      category: jsonCategory.items,
      tags: [],
      user_id :cookies(ctx).user_id,
      csrf: tokenJson.csrf, BASE_URL: BASE_URL,
    };
  }
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.state = {
      title: this.props.item.title, 
      content: this.props.item.content,
      _token : this.props.csrf.token,
    }
//console.log(props.tags )
  }
  componentDidMount(){
console.log(this.props.item.categoryId )
    if(typeof this.props.user_id === 'undefined'){
    }
    var elem = document.getElementById('category_id')
    elem.value = this.props.item.categoryId
  }     
  handleChangeTitle(e){
    console.log("handleChangeTitle:")
    this.setState({title: e.target.value})
  }
  handleChangeContent(e){
    this.setState({content: e.target.value})
  }  
  async handleClickDelete(){
    //delete
    console.log("#deete-id:" , this.props.id)
    try {
      var item = {
        id: this.props.id,
        _token: this.state._token
      }
//console.log(item)
      const res = await fetch(this.props.BASE_URL +'/api/books/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        Router.push('/books');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }     
  } 
  async handleClick(){
  console.log("#-handleClick")
//  console.log(this.state)
    await this.update_item()
  }     
  async update_item(){
    try {
      var elem = document.getElementById('category_id')
      var myForm = document.getElementById('myForm');
      var formData = new FormData(myForm);       
      var arrTags = [] 
      var tags = this.props.tags     
      tags.map((item, index) => {
//console.log(item.name)
        var elemName = "check_" + item.id
        var value = formData.get( elemName )
        if(value ==  "on"){
          console.log(item.name, value)
          arrTags.push(item.id)
        }
      }) 
      var jsonTags = JSON.stringify( arrTags );      
      var item = {
        category_id: elem.value,
        title: this.state.title,
        content: this.state.content,
        tagIds: jsonTags,
        id: this.props.id,
        user_id: this.props.user_id,
        _token: this.state._token
      }
//console.log(item)
        const res = await fetch(this.props.BASE_URL +'/api/books/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });
      if (res.status === 200) {
        Router.push('/books');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }     
  }
  valid_dispCheck(id, items){
    var ret = false
    items.map((item, index) => {
//console.log(item )
      if(item === id){
        ret = true
      }
    })    
    return ret
  }
  checkRow(){
    var tags = this.props.tags
    var self = this
    return tags.map((item, index) => {
      var tag_arr = JSON.parse(self.props.item.tagIds || '[]')
      var valid = self.valid_dispCheck(item.id, tag_arr)
// console.log(item.id, valid )
      var name = "check_" + item.id
      return(
        <div key={index}>
          <input type="checkbox" name={name} id={name} defaultChecked={valid}
          /> {item.name}
        </div>        
      )
    })    
  }     
  render() {
    const items = this.props.category
    return (
      <Layout>
          <div className="container">
            <form action="/api" method="post" id="myForm" name="myForm">
            <hr className="mt-2 mb-2" />
            <h1>Books - Edit</h1><hr />
            <div className="row">
              <div className="col-md-8">
                <div className="form-group">
                  <label>Category :</label>
                  <select id="category_id" name="category_id" className="form-control">
                    <option value="0">Select Please</option>
                    {items.map((item, index) => {
    //console.log(item.name)
                      return(<option key={index}
                        value={item.id}>{item.name}</option>)            
                    })}                
                  </select>
                </div>
              </div>
            </div>          
            <div className="row">
              <div className="col-md-6">
                  <div className="form-group">
                      <label>Title:</label>
                      <input type="text" id="title" className="form-control"
                      value={this.state.title}
                      onChange={this.handleChangeTitle.bind(this)} />
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
              <div className="form-group">
                  <label>Content:</label>
                  <input type="text" className="form-control"
                    value={this.state.content}
                    onChange={this.handleChangeContent.bind(this)}/>
              </div>
              </div>
            </div>
            <div className="form-group">
            <label>Tag :</label>
              {this.checkRow()}          
            </div><hr />
            </form>
            <div className="form-group">
              <button className="btn btn-primary" onClick={this.handleClick}>Save
              </button>
            </div>
            <hr />                  
            <div className="form-group">
              <button className="btn btn-danger" onClick={this.handleClickDelete}>Delete
              </button>
            </div>

            <hr />
            ID : {this.props.id}
          </div>
      </Layout>
    );
  };
}

