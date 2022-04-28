import React, { Component} from 'react';
import '../../App.css';
import DayContainer from '../daycontainer/DayContainer';
import './WeekSelector.css';
import Week from './Week';


//-------------
import Names from '../../data/name.json';

class WeekSelector extends Component{
    MONTH = ['Gen','Feb','Mar','Apr','Mag','Giu','Lul','Ago','Set','Ott','Nov','Dic'];
    DAY = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica'];

    state = {  
        //[weeks,selected]
        weeks: this.getWeekDate(),//WEEKS

        Names:this.getName()
    }; 

    prevMonth(){
        let weeks = this.state.weeks;
        for(let i=3;i>0;i--){
            weeks[0][i]=weeks[0][i-1];
            weeks[0][i].id++;
        }

        let newWeek= new Date(weeks[0][0].firstday);//FIRST DATE
        newWeek.setDate(newWeek.getDate()-1);
        let secondday = new Date(newWeek);

        newWeek.setDate(newWeek.getDate()-6);
        let firstday = new Date(newWeek);

        let type;
        if(newWeek.getTime() === weeks[1].getTime())//same data of selected day (selected week CK)
            type='btn--primary';
        else
            type='btn--outline';

        weeks[0][0]={id:1,firstday:firstday,secondday:secondday,ck:type};
        this.setState({weeks:weeks})
    }
    
    nextMonth(){
        let weeks = this.state.weeks;
        for(let i=0;i<3;i++){
            weeks[0][i]=weeks[0][i+1];
            weeks[0][i].id--;
        }

        let newWeek= new Date(weeks[0][3].secondday);//LAST DATE
        newWeek.setDate(newWeek.getDate()+1);
        let type;
        if(newWeek.getTime() === weeks[1].getTime())//same data of selected day (selected week CK)
            type='btn--primary';
        else
            type='btn--outline';

        let firstday = new Date(newWeek);
        newWeek.setDate(newWeek.getDate()+6);
        let secondday = new Date(newWeek);

        weeks[0][3]={id:4,firstday:firstday,secondday:secondday,ck:type};
        this.setState({weeks:weeks})
    }

    selectDay(index) {
        let week = this.state.weeks;

        for(let i=0;i<4;i++)
            week[0][i].ck = 'btn--outline';
        
        week[0][index].ck = 'btn--primary';
        week[1]=new Date(this.state.weeks[0][index].firstday);
        this.setState({weeks:week});
    }

    getWeekDate(){
        let newWeek = new Date();
       
        let dayOfWeekNumber = newWeek.getDay();
        if(dayOfWeekNumber==0)
            dayOfWeekNumber=7;
        let weeks = [4];
        let firstday = new Date();
        let secondday = new Date();
        
        //current week
        newWeek.setDate(newWeek.getDate() - dayOfWeekNumber +1);
        let selected = new Date(newWeek);
        newWeek.setDate(newWeek.getDate()-8);
        
        for(let i=0;i<4;i++){
        newWeek.setDate(newWeek.getDate()+1);
        firstday= new Date(newWeek);
        newWeek.setDate(newWeek.getDate()+6);
        secondday = new Date(newWeek);
        if(i==1)
            weeks[i]= {id:(i+1),firstday:firstday,secondday:secondday,ck:'btn--primary'};
        else
            weeks[i]= {id:(i+1),firstday:firstday,secondday:secondday,ck:'btn--outline'};
        }

        return  [weeks,selected];
    }

    getName(){
        var arr = [];
        Names.map( names => {
            if(names.Name !== 'undefined')
                arr.push(names.Name);
        });
        return arr;
    }

    render(){
         return (
            <div className='main-page'>
                <div className='week-container'>
                    <i className="arrow left" onClick={this.prevMonth.bind(this)}></i>
                    <Week  
                        week={this.state.weeks[0]}
                        onClick={this.selectDay.bind(this)}
                    />
                    <i className="arrow right" onClick={this.nextMonth.bind(this)}></i>
                </div>
                <hr className='foot'></hr>
                <hr className='foot'></hr>
                <DayContainer 
                    days={{id:1,day:(new Date()),firstname:"",secondname:""}}
                    names={this.state.Names}
                    selected={this.state.weeks[1]}
                    />
            </div>
        );
    }

}

export default WeekSelector;



