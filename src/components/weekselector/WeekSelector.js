import React, { useEffect, useState } from "react";
import '../../App.css';
import DayContainer from '../daycontainer/DayContainer';
import './WeekSelector.css';
import Week from './Week';


function WeekSelector() {
    //const MONTH = ['Gen','Feb','Mar','Apr','Mag','Giu','Lul','Ago','Set','Ott','Nov','Dic'];
    //const DAY = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica'];
    
    //[weeks,selected]
    const [weekState, setWeeks] = useState(getWeekDate());
    const [completed, setcompleted] = useState(false);

    function prevMonth(){
        var weeks = [[],null];

        for(let i=0;i<4;i++){
            weeks[0][i]= weekState[0][i];
        }
        weeks[1]=weekState[1];
        
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
        setWeeks(weeks);
    }
    
    function nextMonth(){
        var weeks = [[],null];

        for(let i=0;i<4;i++){
            weeks[0][i]= weekState[0][i];
        }
        weeks[1]=weekState[1];

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
        setWeeks(weeks);
    }

    function selectDay(index) {
        var week = [[],null];

        for(let i=0;i<4;i++){
            week[0][i]= weekState[0][i];
            week[0][i].ck = 'btn--outline';
        }
            
        week[0][index].ck = 'btn--primary';
        week[1]=new Date(weekState[0][index].firstday);
        
        setWeeks(week);
    }

    function getWeekDate(){
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

    function recCompleted() {
        setcompleted(true);
    }

    return (
        <div className='main-page'>
            { completed && 
               <>
                    <div className='week-container'>
                        <div className='ar-con-left' 
                            onClick={ prevMonth.bind(this)}>
                            <i className="arrow left" ></i>
                        </div>
                        <Week  
                            week={weekState[0]}
                            onClick={selectDay.bind(this)}
                        />
                        <div className='ar-con-right' 
                            onClick={ nextMonth.bind(this)}>
                            <i className="arrow right" ></i>
                        </div>
                    </div>
                    <hr className='foot'></hr>
               </>
            }
            <DayContainer 
                days={{id:1,day:(new Date()),firstname:"",secondname:""}}
                selected={weekState[1]}
                recCompleted={recCompleted.bind(this)}
                />
        </div>
    );
}

export default WeekSelector;


