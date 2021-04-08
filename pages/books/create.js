import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import React, {Component} from 'react';
import cookies from 'next-cookies'

import LibConst from '../../libs/LibConst'
import Layout from '../../components/layout'
//
export default class extends Component {
  static async getInitialProps(ctx) {
    var BASE_URL = LibConst.get_config().BASE_URL
    var url = BASE_URL + '/api/token_get'
    const res = await fetch(url)
    const json = await res.json()
    url = BASE_URL + '/api/category/list'
    const resCategory = await fetch(url)
    const jsonCategory = await resCategory.json()
    url = BASE_URL + '/api/tags/list'
    const resTag = await fetch(url)
    const jsonTag = await resTag.json()
//console.log(jsonTag.items)
    return { 
      user_id :cookies(ctx).user_id,
      csrf: json.csrf,
      BASE_URL: BASE_URL,
      category: jsonCategory.items,
      tags: jsonTag.items,
    }
  }  
  constructor(props){
    super(props)
    this.state = {title: '', content: '', _token : ''}
    this.handleClick = this.handleClick.bind(this);
//console.log(props.tags)
  }
  componentDidMount(){
    this.setState({ _token: this.props.csrf.token });
    console.log( "user_id=" ,this.props.user_id )
    if(typeof this.props.user_id === 'undefined'){
    }
  }   
  handleChangeTitle(e){
    this.setState({title: e.target.value})
  }
  handleChangeContent(e){
    this.setState({content: e.target.value})
  }   
  handleClick(){
    this.add_item()
  } 
  async add_item(){
    try {
      var elem = document.getElementById('category_id');
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
        user_id: this.props.user_id,
        title: this.state.title,
        content: this.state.content,
        tagIds: jsonTags,
        _token: this.state._token
      }
      var url = this.props.BASE_URL + '/api/books/new'
//console.log(item)
      const res = await fetch(url , {
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
      alert("Error, save item")
      console.error(error);
    }    
  }
  checkRow(){
    var tags = this.props.tags
//console.log(tags)
    return tags.map((item, index) => {
// console.log(item )
      var name = "check_" + item.id
      return(
        <div key={index}>
          <input type="checkbox" name={name} id={name}
          /> {item.name}
        </div>
      )
    })    
  }    
  render() {
    const items = this.props.category
    const tags = this.props.tags
    return (
      <Layout>
        <div className="container">
          <form action="/api/content/new" method="post" id="myForm" name="myForm">
          <hr className="mt-2 mb-2" />
          <h1>Books - Create</h1>
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
                    <input type="text" className="form-control"
                    onChange={this.handleChangeTitle.bind(this)} />
                </div>
            </div>
          </div>
          <div className="row">
              <div className="col-md-6">
              <div className="form-group">
                  <label>Content:</label>
                  <input type="text" className="form-control"
                    onChange={this.handleChangeContent.bind(this)}/>
              </div>
              </div>
          </div><br />
          <hr />
          <div className="form-group">
            <label>Tag :</label>
            {this.checkRow()}          
          </div>
          </form>
          <div className="form-group">
            <button className="btn btn-primary" onClick={this.handleClick}>Create
            </button>
          </div>                
          <hr />
        </div>
      </Layout>
    )    
  } 
}

