import React, { Component } from 'react';
import PlayerStatAll from './PlayerStatAll';
import VehicleStatAll from './VehicleStatAll'



class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoadForm: false,
            snapShotPlayer: '',
        }
            this.load = this.load.bind(this)
            this.save = this.save.bind(this)
            this.delete = this.delete.bind(this)
        this.ChangeLoad = this.ChangeLoad.bind(this)
    }

    load(event) {
        this.setState({ showLoadForm: true })
        event.preventDefault()

    }

    save(event) {
        let statistic = this.props.data[this.props.account_id].statistics;
        var ts = new Date() / 1E3 | 0;
        let key = this.props.account_id + "-ps-" + ts;

        localStorage.setItem(key, JSON.stringify(statistic));
        event.preventDefault();

        alert("Saving the snapshot: " + this.timeConverter(ts));

    }

    /** Ked vyberie snapshot, uloz ho do state */
    ChangeLoad(e) {
        this.setState({ showLoadForm: false })
        var data = JSON.parse(localStorage.getItem(e.target.value))
        this.setState({ snapShotPlayer: data["all"] })
        e.preventDefault()
    }

    getFormLoad() {
        var data = this.getLocalStoreKeys()
        let key = Object.keys(data)

        let select = key.map((k) => {
            return <option key={data[k].key} value={data[k].key}>Snapshot from {data[k].time} </option>
        })
        let form =
            <select className="col-2" value={this.state.value} onChange={this.ChangeLoad} >
                <option defaultValue>Select snapshot</option>
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

            if (parseInt(array[0], 10) === parseInt(this.props.account_id, 10) && array[1] === "ps") {
                var timestamp = parseInt(array[2], 10)                
                var time = this.timeConverter(timestamp)
                
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
        let snapShotAll = this.state.snapShotPlayer
       
       

        return (
            <div className="row">
                <div className="col-12 mb-1">
                    <div className="shadow">
                        <form >
                            <button className="col-1 button" onClick={this.load} type="button" id="load">Load</button>
                            <button className="col-1 button" onClick={this.save} type="button" id="save">Save</button>
                            <button className="col-1 button" onClick={this.delete} type="button" id="delete">Delete</button>
                            {lForm}
                        </form>
                    </div>
                </div>
                <div className="col-3 p-3 shadow mr-1">
                    <PlayerStatAll data={this.props.data[this.props.account_id].statistics.all} account_id={this.props.account_id} stat={snapShotAll} />
                </div>
                <div className='col-8 p-3 shadow'>
                    <VehicleStatAll />
                </div>
            </div>

        );
    };

}

export default Menu;
