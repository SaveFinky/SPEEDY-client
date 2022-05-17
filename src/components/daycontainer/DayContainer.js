import React, { useState,useEffect } from 'react';
import '../../App.css';
import './DayContainer.css';
import Day from'./Day';

import Axios from "axios";

//   preloader
import Lottie from "react-lottie";
import * as pizza from "../preloader/pizza.json";
import * as success from "../preloader/success.json";

const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: pizza.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

function DayContainer(props) {
    const DAY = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica'];

    const [days, setDays] = useState(initDays(props.selected));
    const [names, setNames] = useState([]);
    const [selected, setSelected] = useState(props.selected);
    const [ft, setFT] = useState(true);
    const [readyName,setRN] = useState(false);
    const [readyDays,setRD] = useState(false);
    //proloader
    const [loading, setloading] = useState(undefined);
    const [completed, setcompleted] = useState(false);
    

    useEffect( () => {
        //first time
        if(ft){
            setFT(false);
            getNameFromAPI();
            setDaysFromAPI(initDays(props.selected),props.selected);

       }
       //Change props
       if(selected != props.selected){
            setSelected(props.selected);
            setDaysFromAPI(initDays(props.selected),props.selected);
       }

       if(!completed){
            setTimeout(() => {
                if(readyName && readyDays){

                    setloading(true);

                    setTimeout(() => {
                        setcompleted(true);
                        console.log("SET completed true : RName:"+readyName+" RDays:"+readyDays);
                        props.recCompleted();
                    }, 2000);
                }
                    
            }, 3000);
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
        var show = [];
        let day = new Date(start);
        for(let j=0;j<7;j++){
            show[j]=day.toLocaleDateString('en-US');
            day.setDate(day.getDate()+1);
            
        }

        Axios.get("https://speedyapp.herokuapp.com/getWeek").then((response) => {
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
            setRD(true);
        });
    }

    function getNameFromAPI(){
        var name=[];
        let k=0;
        Axios.get("https://speedyapp.herokuapp.com/getName").then((response) => {
            response.data.map( record => {
                name[k++]=record.name
            });
        }).then(() => {
            setNames(name);
            setRN(true);
        });
    }
    
    function addDay(day,first,second,excname){
        
        let textDay=day.toLocaleDateString('en-US');
        
        Axios.post("https://speedyapp.herokuapp.com/UpdateOrAdd",{
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
        <>
            {!completed ? (
                <div className="load-container">
                    <div>
                        {!loading ? (
                            <Lottie options={defaultOptions1} height={200} width={200} />
                        ) : (
                            <div className='success-container'>
                                <Lottie options={defaultOptions2} height={100} width={100} />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
               <div className="days-container">
                    {days.map(day =>
                        <Day  
                            key={day.id}
                            dayText={DAY[day.id]}
                            day={day.day}
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
            )} 
        </>
        
    );
}

export default DayContainer;
