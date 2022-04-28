import React, { useState,useEffect } from 'react';
import '../../App.css';
import './DayContainer.css';
import Day from'./Day';

import Axios from "axios";

function DayContainer(props) {
    const DAY = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica'];

    const [days, setDays] = useState(initDays(props.selected));
    const [names, setNames] = useState(props.names);
    const [selected, setSelected] = useState(props.selected);
    const [ft, setFT] = useState(true);
    

    useEffect( () => {
        console.log("useEffect");
        if(selected != props.selected || ft){
            setFT(false);
            setSelected(props.selected);
            setDaysFromAPI(initDays(props.selected),props.selected);
        }
    });

    
    function initDays(selected){
        let day = [];
        let date = new Date(selected);

        for(let i=0; i<7; i++){
            day[i] = {id:i,day:(new Date(date)),firstname:"",secondname:"",excname:""};
            date.setDate(date.getDate() + 1);
        }
        return day;
    }

    function setDaysFromAPI(dbDay,start){
        console.log("setDaysFromAPI");
        var show = [];
        let day = new Date(start);
        for(let j=0;j<7;j++){
            show[j]=day.toLocaleDateString();
            day.setDate(day.getDate()+1);
        }
        console.log(show);

        Axios.get("http://localhost:3001/getWeek").then((response) => {
            response.data.map( record => {
                for(let k=0;k<show.length;k++){
                    if(record.day === show[k]){
                        dbDay[k]= {id:k,
                                day:new Date(dbDay[k].day),
                                firstname:record.first_name,
                                secondname:record.second_name,
                                excname:record.exc_name
                            };
                    }
                }
            });
        }).then(() => {
            setDays(dbDay);
        });
    }
    
    function addDay(index,first,second,excname){
        let newday=new Date(selected);
        newday.setDate(newday.getDate() + index);
        let textDay=newday.toLocaleDateString();
        
        Axios.post("http://localhost:3001/UpdateOrAdd",{
            day:textDay,
            first_name:first,
            second_name:second,
            exc_name:excname
        }).catch((err) => {
            console.log("####   CATCHED SOME ERROR");
        }).then((response) => {
            if(response.status===204)
                console.log("####   ADDING:"); 
            console.log("####   UPDATE:"); 
        }).then(() => {
            setDaysFromAPI(initDays(props.selected),props.selected);
        });
    }

    return (
        <div className="days-container">
            {days.map(day =>
                <Day  
                    key={day.id}
                    dayText={DAY[day.id]}
                    day={day.day.toLocaleDateString()}
                    index={day.id}
                    firstname={day.firstname}
                    secondname={day.secondname}
                    excname={day.excname}
                    names={names}
                    onClick={addDay.bind(this)}
                    >
                </Day> 
             )}
        </div>
    );
}

export default DayContainer;
