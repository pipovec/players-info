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
    const statistics = "statistics"
    var id = this.props.account_id;
    var data =this.props.data[id];
    console.log(data);
      //var data2 = data.statistics;
   //console.dir(data2);

    
    return 0;
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
              <tr></tr>
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
