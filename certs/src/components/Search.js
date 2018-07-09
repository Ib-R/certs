import React, { Component } from 'react'

export default class Search extends Component {
    state = {
        search:'',
        name:null,
        title:'',
        serial:'',
        img:''
    }

    handleChange = (e)=>{
        this.setState({[e.target.name]:[e.target.value]});

        fetch(`http://localhost/certs/backend/api/cert/show_single?serial=${e.target.value}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                name: data.name,
                img: data.img,
                serial: data.serial
            })
        })
    }
  render() {
      
      const cert = (this.state.name != null ? 
        <div>
            <img src={`http://localhost/certs/backend/api/cert/uploads/${this.state.img}`} width="200" alt=""/> 
            <strong>Name: </strong>{this.state.name} 
            <strong>Title: </strong>{this.state.title}
            <strong>Serial: </strong>{this.state.serial}
        </div> :
        <p>No Cert Found with this serial.</p>
        )

    return (
        <div className="container">
            <div className="form-group mb-3">
                <input
                 className="form-control"
                 type="text" name="search" 
                 value={this.state.search} 
                 onChange={this.handleChange}
                 placeholder="Enter Serial..."
                 />
            </div>
            {cert}
        </div>
    )
  }
}
