import React, { Component } from 'react';
import './WeekSelector.css';
import { Button } from '../Button';

class Week extends Component {
    MONTH = ['Gen','Feb','Mar','Apr','Mag','Giu','Lul','Ago','Set','Ott','Nov','Dic'];
   
    render() { 
        return (
            <div className='hero-btns'>
                {this.props.week.map(week => 
                    <Button  
                        key={week.id}
                        className='btns'
                        buttonStyle={week.ck}
                        buttonSize='btn--large'
                        onClick={() => this.props.onClick(week.id-1)}
                        >
                            <div>{(week.firstday).getDate()+ '-' +this.MONTH[week.firstday.getMonth()]}</div>
                            <div>{(week.secondday).getDate()+ '-' +this.MONTH[week.secondday.getMonth()]}</div>
                    </Button> 
                )}
            </div>);
    }
}

export default Week;