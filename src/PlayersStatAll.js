import React, { Component } from 'react';

import './App.css';

class PlayersStatAll extends Component {
  constructor(props) {
    super(props);
    this.state = {

    },
    this.load = this.load.bind(this),
    this.save = this.save.bind(this),
    this.delete = this.delete.bind(this)

  }

  load(event) {
    event.preventDefault();
    alert("Load");
  }

  save(event) {
    event.preventDefault();
    alert("Save");

  }

  readPlayerStatHeaders() {

    let All
    if (typeof this.props.data[ this.props.account_id ] !== 'undefined') {
      let all = Object.keys(this.props.data[ this.props.account_id ].statistics.all)

      All = all.map((k)=>{
        return  <th key={k+1}>{all[k]}</th>
      })




    }
    return All;
  }

  delete(event) {
    event.preventDefault();
    alert("Delete");
  }

    render() {
      const headers = this.readPlayerStatHeaders();
      return (
        <div className="card-body">
          <h3 className="card-title">Player stats for battles all</h3>
          <nav className="navbar navbar-light bg-light">
            <form className="form-inline">
              <button className="btn btn-sm btn-outline-success" onClick={this.load}   type="button">Load</button>
              <button className="btn btn-sm btn-outline-secondary" onClick={this.save} type="button">Save</button>
              <button className="btn btn-sm btn-outline-secondary" onClick={this.delete} type="button">Delete</button>
            </form>
          </nav>
          <table className="table">
            <thead className="thead-light">
              <tr>{headers}</tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>

        </div>

      );
    };

}

export default PlayersStatAll;
