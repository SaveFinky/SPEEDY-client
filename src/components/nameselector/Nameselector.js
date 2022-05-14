import React, { useState,useEffect } from 'react';
import '../../App.css';
import './Nameselector.css';

import Axios from "axios";

function Nameselector(){
    const [names,setNames] = useState([]);
    const [adding,setAdd] = useState(false);
    const [name,setName] = useState("");
    const [deleting,setDel] = useState(false);
    const [display, setDisplay] = useState(true);

    useEffect( () => {
       if(names.length === 0)
           getNameFromAPI();
    });

    function getNameFromAPI(){
        let name=[];
        let k=0;
        Axios.get("https://speedyapp.herokuapp.com/getName").then((response) => {
            response.data.map( record => {
                name[k++]={name:record.name}
            });
        }).then(() => {
            setNames(name);
        });
    }

    function addNameFromAPI(name){
        Axios.post("https://speedyapp.herokuapp.com/AddName",{
            name:name
        }).catch((err) => {
            console.log("#### CATCHED SOME ERROR");
        }).then((response) => {
            console.log("####   ADDED:"); 
        }).then(() => {
            getNameFromAPI();
        });

    }

    function deleteNameFromAPI(name){
        Axios.post("https://speedyapp.herokuapp.com/DelName",{
            name:name
        }).catch((err) => {
            console.log("#### CATCHED SOME ERROR");
        }).then((response) => {
            console.log("####   DELETED"); 
        }).then(() => {
            getNameFromAPI();
        });
    }

    function saveName() {
        let input = document.getElementById('in-name').value;
        if(input === "")
            alert("Name is empty");
        else{
            addNameFromAPI(input);
            setAdd(false);
            setDisplay(true);
        }
        
    }

    function deleteName(name) {
        deleteNameFromAPI(name);
        setDel(false);
        setDisplay(true);
    }

    return(
        <>
        { display === true  &&  
            <div className='main-container'>
                <p>Current employees:</p>
                <hr className='foot'></hr>
                <div className='name-container'>
                    {names.length === 0 &&
                        <div className="msg">
                        The names will appear here ...
                        </div>
                    }
                    { names.map( name => 
                            <div className='name-div'>
                                <div className='name'>
                                    <p>{name.name}</p>
                                </div>
                                <div className='delete-div'
                                    onClick={() => {setName(name.name);
                                                    setDel(true);
                                                    setDisplay(false);
                                                    }}>
                                    x
                                </div>
                            </div>
                            
                            )
                    }
                    <div className='btn-add'
                        onClick={() => {setAdd(true);
                                        setDisplay(false);
                                        }}>
                        +  
                    </div>
                </div>
            </div>
        }
        {
            display === true && names.length == 0 &&  
            <></>
        }
        { adding === true && 
            <div className='message-container'>
                <p >Add Name</p>
                <input 
                    id='in-name' 
                    type="text" 
                    className='name-picker'
                    placeholder=' Name'
                    ></input>
                <div>
                    <button
                        className="btn-save" 
                        onClick={() => saveName()}
                        >
                        <h4>SAVE</h4>
                    </button>
                    <button
                        className='btn-cancel'
                        onClick={() => {setAdd(false);
                                        setDisplay(true);
                                        }}
                        >close
                    </button>
                </div>
                
            </div>
        }
        { deleting === true && 
            <div className='message-container'>
                <p >Do you want to delete :</p>
                <div className='del-name'>
                    {name}
                </div>
                <div>
                    <button
                        className="btn-delete" 
                        onClick={() => deleteName(name)}
                        >
                        <h4>DELETE</h4>
                    </button>
                    <button
                        className='btn-cancel'
                        onClick={() => {setDel(false);
                                        setDisplay(true);
                                        }}
                        >close
                    </button>
                </div>
                
            </div>
        }
        </>
    );
}
export default Nameselector;

