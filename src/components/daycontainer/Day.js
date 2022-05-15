import React, { useState, useEffect } from "react";
import './DayContainer.css';
import { BiX,BiUserX } from "react-icons/bi";

function Day(props) {
  
  const [selected, setSelected] = useState(false);
  const [names, setNames] = useState(props.names);
  const [firstname, setFirst] = useState("");
  const [secondname, setSecond] = useState("");
  const [selectexc, setSelectExc] = useState(false);
  const [excname, setExcName] = useState("");

  useEffect( () => {
    setFirst(props.firstname);
    setSecond(props.secondname);
    setExcName(props.excname);
  })
  
  function saveDay(){
    let f = document.getElementById("firstN");
    let first = f.options[f.selectedIndex].text;

    let s = document.getElementById("secondN");
    let second = s.options[s.selectedIndex].text;

    let e ;
    let exc ="";
    if(selectexc === true|| !(excname===""||excname===undefined)){
      e = document.getElementById("excN");
      exc = e.options[e.selectedIndex].text;
    }
    
    if((exc!==first && exc !==second)||exc === "")
      props.onClick(props.day,first,second,exc);
    else
      alert("Attention! the excluded name must be different from the working ones");

    if(selected)
      setSelected(false);
  }
  
  return (
      <div className="day-div" onClick={ () => !selected? setSelected(true): ""  }>
          {selected === false && 
            <div>
              <div>
              <p className='Day'>
                {props.dayText}
                <span className="right-date">
                  {props.day.toLocaleDateString('en-US')}
                </span>
                </p>
              </div>
                
              <div className='Name'>
                {firstname}
              </div>
              <div className='Name'>
                {secondname}
              </div>
              <div className='excName'>
                {excname}
              </div>
            </div>  
          }


          {//#################################       SELECTED
          selected === true && 
            <div>
              <div className="Day-icon"  >
                {props.dayText} 
            
                <BiX 
                  className="icon-close" 
                  onClick={ () => {
                    if(selected){
                      setSelected(false);
                      setSelectExc(false);
                      }
                    }
                  }
                  />
              </div>

                <div className="line">
                  <select 
                    id="firstN"
                    name="basic" 
                    className="NamePicker" 
                  >
                      <option value="DEFAULT" disabled selected hidden>{firstname}</option>
                      <option value="" ></option>
                      {names.map( name =>
                        name!=excname?<option key={name} value={name}>{name}</option>:""
                      )};
                  </select>
                </div>
                <div className="line">
                  <select 
                    id="secondN"
                    className="NamePicker" 
                  >
                      <option value="DEFAULT" disabled selected hidden>{secondname}</option>
                      <option value="" ></option>
                      {names.map(name =>
                        name!=excname?<option key={name} value={name}>{name}</option>:""
                      )};
                  </select>
                  
                  <button
                  className="btn-save" 
                  onClick={() => saveDay()}>
                    <h4>SAVE</h4>
                  </button>

                </div>

                <div className="line">
                    <BiUserX
                    className="exc-icon" 
                      onClick={() => selectexc?setSelectExc(false):setSelectExc(true)}
                    />
                    {//---ICON SELECTED
                      (selectexc === true|| !(excname===""||excname===undefined)) && 
                      
                      <select 
                        id="excN"
                        className="NamePickerExc" 
                        >
                          <option value="DEFAULT" disabled selected hidden>{excname}</option>
                          <option value="" ></option>
                          {names.map(name =>
                            <option key={name} value={name}>{name}</option>
                          )};
                    </select>
                    }
                </div>
            </div>
          }
      </div> 
  );
  
}

export default Day;