import React, { Component } from 'react';
import PlayerStatAll from './PlayerStatAll';
import VehicleStatAll from './VehicleStatAll'

import './App.css';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoadForm: false
        },
            this.load = this.load.bind(this),
            this.save = this.save.bind(this),
            this.delete = this.delete.bind(this)
        this.ChangeLoad = this.ChangeLoad.bind(this)
    }

    load(event) {
        this.setState({ showLoadForm: true })
        event.preventDefault()

    }

    save(event) {
        let statistic = this.props.data[this.props.account_id].statistics;
        var ts = new Date / 1E3 | 0;
        let key = this.props.account_id + "-ps-" + ts;

        localStorage.setItem(key, JSON.stringify(statistic));
        event.preventDefault();

        alert("Ukladam kluc: " + key);

    }

    ChangeLoad(e) {
        this.setState({ showLoadForm: false })
        e.preventDefault()
    }

    getFormLoad() {
        var data = this.getLocalStoreKeys()
        let key = Object.keys(data)

        let select = key.map((k) => {
            return <option key={data[k].key} value={data[k].key}>snapshot from {data[k].time} </option>
        })
        let form =
            <select className="custom-select custom-select-sm ml-1" value={this.state.value} onChange={this.ChangeLoad} >
            <option disabled selected>Get snapshot</option>
                {select}
            </select>


        return form
    }

    delete(event) {
        event.preventDefault();
        alert("Delete");
    }

    timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    getLocalStoreKeys() {
        let keys = Object.keys(localStorage);
        let array
        let result = []

        for (var key in keys) {
            let c = keys[key]
            array = c.split("-")

            if (parseInt(array[0]) == parseInt(this.props.account_id) && array[1] == "ps") {
                var timestamp = parseInt(array[2])
                var date = new Date(timestamp * 1000)
                let year = date.getFullYear()
                let month = date.getUTCMonth() + 1
                let day = date.getDay()
                var hour = date.getHours();
                var min = date.getMinutes();
                var time = year + "/" + month + "/" + day + " " + hour + ":" + min

                var part = {}
                part.key = c
                part.ps = array[1]
                part.id = array[0]
                part.time = time
                result.push(part)

            }
        }

        return result

    }

    render() {
        /** Ak je stlaceny load zobraz select box */
        let lForm
        if (this.state.showLoadForm) {
            lForm = this.getFormLoad()
        }

        return (
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-light bg-light">
                        <form className="form-inline">
                            <button className="btn btn-sm btn-outline-success col" onClick={this.load} type="button">Load</button>
                            <button className="btn btn-sm btn-outline-secondary col" onClick={this.save} type="button">Save</button>
                            <button className="btn btn-sm btn-outline-secondary col" onClick={this.delete} type="button">Delete</button>
                            {lForm}
                        </form>
                    </nav>
                </div>
                <div className="col-4 p-3">
                    <PlayerStatAll data={this.props.data[this.props.account_id].statistics.all} account_id={this.props.account_id} />
                </div>
                <div className='col-8 p-3'>
                    <VehicleStatAll />
                </div>
            </div>

        );
    };

}

export default Menu;
