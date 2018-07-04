import React from 'react'
import {Link } from "react-router-dom";

export default () => {
  return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom box-shadow">
          <h5 className="my-0 mr-md-auto font-weight-normal">Certs App</h5>
          <nav className="my-2 my-md-0 mr-md-3">
              <Link className="p-2 text-dark" to="/">Home</Link>
              <Link className="p-2 text-dark" to="/show">Certs</Link>
              <a className="p-2 text-dark" href="/search">Search</a>
              <a className="p-2 text-dark" href="/">Pricing</a>
          </nav>
          <a className="btn btn-outline-primary" href="/">Sign up</a>
      </div>
  )
}