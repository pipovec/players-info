import React, { Component } from 'react';

class Winrate extends Component {

winrateColor (winrate) {
    let color;

    if ( winrate < 46)
        color = {'backgroundColor': '#930D0D', 'color': 'white'}
    else if(winrate >= 46.00 && winrate <= 46.99 )
        color = {'backgroundColor': '#cd3333', 'color': 'white'}
    else if(winrate >= 47 && winrate <= 47.99)
        color = {'backgroundColor': '#CC7A00','color':'white'};
    else if(winrate >= 48 && winrate <= 49.99 )
        color = {'backgroundColor': '#CCB800','color': 'white'}
    else if(winrate >= 50 && winrate <= 51.99 )
        color = {'backgroundColor': '#849B24','color': 'white'}
    else if(winrate >= 52 && winrate <= 53.99 )
        color = {'backgroundColor': '#4D7326','color': 'white'}
    else if(winrate >= 54 && winrate <= 55.99 )
        color = {'backgroundColor':'#4099BF','color': 'white'}
    else if(winrate >= 56 && winrate <= 59.99 )
        color = {'backgroundColor': '#3972C6','color': 'white'};
    else if(winrate >= 60 && winrate <= 64.99 )
        color = {'backgroundColor': '#793DB6','color': 'white'};
    else if(winrate >= 65  )
        color = {'backgroundColor': '#401070', 'color': 'white'};

    
    return color;
}

render() {
    let winrate = (this.props.wins / this.props.battles) * 100
    let s = this.winrateColor(winrate)
    
    return (
        <td className="text-center" style={s}>{winrate.toFixed(4)}</td>
    )
}

}

export default Winrate