import React, { Component } from 'react';
import './App.css';

import PlayerInfo from './PlayerInfo';
import Menu from './Menu';

const URL = 'https://api.worldoftanks.eu/wot/account/list/?application_id=883ff6ceefb13177357ffea34d6fb06f&search='
const URL2 = 'https://api.worldoftanks.eu/wot/account/info/?application_id=883ff6ceefb13177357ffea34d6fb06f&account_id='
const URL3 = 'https://api.worldoftanks.eu/wot/tanks/stats/?application_id=883ff6ceefb13177357ffea34d6fb06f'
const vehicleFileds = 'tank_id,all.battles,all.damage_dealt,all.frags,all.wins,all.spotted,all.dropped_capture_points'
const api_id = '883ff6ceefb13177357ffea34d6fb06'

class App extends Component {
  constructor() {
    super();
    this.state = {
      account_id: '',
      nickname: '',
      playerStat: '',
      vehicleStat: '',
      statPlayers: false,
      statVehicle: false,
      checked: true,
    };

    this.findNick = this.findNick.bind(this);
    this.changeInputValue = this.changeInputValue.bind(this);
    this.loadPlayerStat = this.loadPlayerStat.bind(this);
    this.doRequest = this.doRequest.bind(this);
  }

  changeInputValue(e) {
    this.setState({ nickname: e.target.value });
  };

  doRequest(event) {
    let nick = event.target.nickname.value;
    
    this.setState({ nickname: nick });
    event.preventDefault();
    this.findNick(nick);
  }


  findNick(nick) {
    let id;
    fetch(URL + nick, id)
      .then((resp) => {
        return resp.json();
      })
      .then((result) => {
        this.setState({ account_id: result.data[0].account_id, nickname: result.data[0].nickname });
        return result.data[0].account_id;
      })
      .then((account_id) => {
        this.loadPlayerStat(account_id);
        this.loadVehicleStat(account_id);
      });
    document.title = "Hracske staty | " + this.state.nickname;

  };


  loadPlayerStat(account_id) {
    fetch(URL2 + account_id)
      .then((resp) => {
        if (resp.status !== 200) {
          console.log('Chyba, status kod: ' + resp.status);
        }
        else {
          return resp.json();
        }

      })
      .then((result) => {
        if (result.status === "ok") {
          this.setState({ playerStat: result.data, statPlayers: true });
        } else {
          this.setState({ playerStat: { "Status": 'not found' } });
        }

      });
  };

  loadVehicleStat(account_id){
    console.log(JSON.stringify({'account_id': account_id,
    'fields': vehicleFileds,
    'application_id': api_id
   }))

    fetch(URL3, {
      method: 'POST',      
      body: "&account_id="+account_id+"&fields"+vehicleFileds 
    })
    .then((res) => res.json())      
    .then((result) => {
      console.log(result)
      this.setState({vehicleStat: result })
    });

  }

  render() {
    let playerInfo = <div></div>;   
    

    /** Podmienene zobrazenie hracskych statov */
    let menu
    if (this.state.statPlayers) {
      menu = <div><Menu data={this.state.playerStat} account_id={this.state.account_id} /></div>;
    }
    else {
      menu = <div></div>
    }


    if (this.state.account_id > 0) {
      playerInfo = <div className="card mt-1"><PlayerInfo account_id={this.state.account_id} data={this.state.playerStat} /></div>;      
    }

    return (
      <div className="ReactApp">
        <form onSubmit={this.doRequest}>
          <input type="text" name="nickname" />
          <input type="submit" value="Najdi" />
        </form>
        {playerInfo}        
        {menu}
      </div>
    );
  }
}

export default App;
