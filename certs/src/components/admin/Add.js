import React, { Component } from 'react'

export default class Add extends Component {
    constructor(props){
        super(props);
        this.state = {
            certSerial:'',
            certName:'',
            certTitle:'',
            certDate:'',
            certImg:''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // document.getElementById('uploadBtn').click();
        const data = {"name":this.state.certName,
                    "serial":this.state.certSerial,
                    "title":this.state.certTitle,
                    "date":this.state.certDate}
        const body = JSON.stringify(data);

        fetch('http://localhost/bcicerts/backend/api/cert/create',
            {
                method: "POST",
                body,
            })
            .then(res => res.json())
            .then(data => {
                this.handleUpload(data.message);
                this.setState({
                    certSerial:'',
                    certName:'',
                    certTitle:'',
                    certDate:''
                })
            })
            .catch(err => alert(err));
    }

    handleUpload = (msg) => {
        const file = document.getElementById("uploadInput").files[0];
        const body = new FormData();
        body.append('certImg',file);

        fetch('http://localhost/bcicerts/backend/api/cert/upload',
        {
            method: 'POST',
            body,

        })
        .then(res => res.text())
        .then(success => alert('Image Upload Status: '+ success+' Cert Creation Status: '+msg))
        .catch(fail => alert(fail))
    }

  render() {
    return (
      <div className="container">
        <h2 className="text-left pb-1">Add Cert</h2>
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <input type="text" value={this.state.certSerial} onChange={this.handleChange} className="form-control" name="certSerial" aria-describedby="emailHelp" placeholder="Enter serial#" required/>
                <small id="emailHelp" className="form-text text-muted">Please provide the serial num for the cert.</small>
            </div>
            <div className="form-group">
                <input type="text" value={this.state.certName} onChange={this.handleChange} className="form-control" name="certName" aria-describedby="emailHelp" placeholder="Enter name" required/>
                <small id="emailHelp" className="form-text text-muted">Please provide the cert owner name.</small>
            </div>
            <div className="form-group">
                <input type="text" value={this.state.certTitle} onChange={this.handleChange} className="form-control" name="certTitle" aria-describedby="emailHelp" placeholder="Enter title" required/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <input type="date" value={this.state.certDate} onChange={this.handleChange} className="form-control" name="certDate" aria-describedby="emailHelp" required/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
                <div className="form-group">
                    <input id="uploadInput" type="file" value={this.state.certImg} onChange={this.handleChange} className="form-control" name="certImg" aria-describedby="emailHelp" required/>
                </div>
            <div className="row">
            <button type="submit" className="btn btn-primary ml-auto ">Submit</button>
            </div>
        </form>
      </div>
    )
  }
}
