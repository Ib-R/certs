import React, { Component } from 'react';

export default class Edit extends Component {
  constructor(props){
    super(props);
    this.state ={
      id:'',
      title:'',
      name:'',
      date:'',
      serial:'',
    }
  }

  componentWillMount(){
    fetch('http://localhost/bcicerts/backend/api/cert/show_single?id='+[this.props.location.state.id]+'')
      .then(res => res.json())
      .then(data => {
        this.setState({
          certId: data.id,
          certTitle: data.title,
          certName: data.name,
          certDate: data.date,
          certSerial: data.serial
        })
      })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
      const data = {"id":this.state.certId,
                  "name":this.state.certName,
                  "serial":this.state.certSerial,
                  "title":this.state.certTitle,
                  "date":this.state.certDate}
      const body = JSON.stringify(data);

      fetch('http://localhost/bcicerts/backend/api/cert/update',
          {
              method: "PUT",
              body,
          })
          .then(res => res.json())
          .then(data => {
              alert(data.message);
            });
  }

  handleDelete = () => {
    const { history } = this.props;
    const confirm = window.confirm("Are You Sure");
    const body = JSON.stringify({"id":this.state.certId});

    if(confirm){
      fetch('http://localhost/bcicerts/backend/api/cert/delete',
    {
      method: "DELETE",
      body
    })
    .then(res => res.json())
    .then(data => {
                alert(data.message);
                history.push('/show');
    });
    }
  }

  render() {
    return (
      <div className="container">
      <h2 className="text-left pb-1">Edit Cert</h2>
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
          <div className="row">
          <input type="button" onClick={this.handleDelete} className="btn btn-danger ml-0 " value="Delete"/>
          <button type="submit" className="btn btn-primary ml-auto ">Submit</button>
          </div>
      </form>
    </div>
    )
  }
}
