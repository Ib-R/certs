import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Show extends Component {
    constructor(props){
        super(props);
        this.state ={
            data:null
        }
    }
    componentWillMount(){
        fetch('http://localhost/bcicerts/backend/api/cert/show')
            .then(res => res.json())
            .then(content => {
                this.setState({data: content.data})
            })
    }

  render() {
        const dataList = (this.state.data != null ? this.state.data.map((cert, i)=>
         <li className="p-2 text-left" key={i}>
            <img src={`http://localhost/bcicerts/backend/api/cert/uploads/${cert.img}`} width="200" alt=""/> 
            <strong>Name: </strong>{cert.name} 
            <strong>Title: </strong>{cert.title}
            <strong>Serial: </strong>{cert.serial}
            <strong>Date: </strong>{cert.date}
            <button className="btn btn-primary ml-2"><Link className="text-white" to={{ pathname:'/edit', state:{id:cert.id} }}>Edit</Link></button>
         </li>)
         : <strong>No Data Found!</strong> ) 
    return (
      <div className="container">
        <h2 className="text-left pb-1 pl-2">Certs Found</h2>
        <ol className="ml-0">{dataList}</ol>
      </div>
    )
  }
}
