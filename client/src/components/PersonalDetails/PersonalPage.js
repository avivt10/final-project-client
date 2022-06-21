import './personalPage.css'
import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function PersonalPage(props) { 
    let navigate = useNavigate();
    const location = useLocation();
    console.log(location.state);
    let arrFoods = ["pizza", "Shnitzel + pasta","Chiken + rice","Falafel",
    "Shntizel + rice","Shntizel(Baguette)","Falafel","Shnitzel + pasta","hamburger",
    "hamburger", "Shnitzel + pasta","hamburger","Falafel","Shnitzel + pasta",
    "Falafel","Falafel","Chiken + rice", "hamburger","Chiken + rice","Chiken + rice" ];
    let [food , setFood] = useState(new Array(5));
    let [date,setDate]=useState('')
    useEffect(()=>{
       getDate() 
    },[])
    const getDate=async()=>{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          try {
            let response=await fetch("http://localhost:9048/api/Users/getDate", requestOptions)
            response=await response.text()
            setDate(response)
          } catch (error) {
              console.log(error.message);
          }
        
    }
    const sendDetailtoServer=()=>{
        alert ("send")
        console.log(food);
        let requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
         body: JSON.stringify(food),
        };
        fetch(`http://localhost:9048/api/Users/Orders/add`, requestOptions).then( (response) => response.json() )
        .then( (data) => console.log(data) )
        .catch( (error) => console.log(error.message));
    }
    const onDetailChanged = (e)=> {
        let newArr = [...food]; // copying the old datas array
        setFood(newArr)
        console.log(e.currentTarget.name);
      switch (e.currentTarget.name) {
        case "sunday":
            newArr[0]=e.currentTarget.value
            break;
        case "monday":
            newArr[1]=e.currentTarget.value
            break;
        case "thusday":
            newArr[2]=e.currentTarget.value
            break;
        case "wednesday":
            newArr[3]=e.currentTarget.value
            break;
        case "thursday":
            console.log('thursday');
            newArr[4]=e.currentTarget.value
            break;

          
        }
        setFood(newArr)
        console.log(newArr);
    }
    if(location.state){
        return (
            <div className="page-container">
                <div className='header-container'>
                    <button onClick={()=>{navigate("../home")}}>Log Out</button>
                    <div style={{width:"50%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <label>{date}</label>
                        <label>{location.state.name}</label>
                  
                    </div>
                     
                   
                  
                </div>
                <div className="content-container">
                    <table>
                        <tr>
                            <th>
                            Thursday
                            </th>
                            <th>wednesday</th>
                            <th>tuesday</th>
                            <th>monday</th>
                            <th>sunday</th>

                        </tr>
                        <tr>
                            <td>
                                <input type="radio" id="e1" name="thursday" value="pizza" onChange={onDetailChanged} />
                                <label>{arrFoods[0]}</label>
                            </td>
                            <td> 
                                <input type="radio" id="e2" name="wednesday" value="Shnitzel + pasta" onChange={onDetailChanged}/>
                                <label>{arrFoods[1]}</label>
                            </td>
                            <td>
                                <input type="radio" id="e3" name="thusday" value="Chiken + rice"  onChange={onDetailChanged}/>
                                <label>{arrFoods[2]}</label>
                                    
                            </td>
                            <td>
                                <input type="radio" id="e4" name="monday" value="Falafel" onChange={onDetailChanged}/>
                                <label>{arrFoods[3]}</label>
                            </td>
                            <td>
                                <input type="radio" id="e5" name="sunday" value="Shnitzel + rice" onChange={onDetailChanged}/>
                                <label>{arrFoods[4]}</label>
    
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="radio" id="e6" name="thursday" value="Shntizel(Baguette)" onChange={onDetailChanged}/>
                                <label>{arrFoods[5]}</label>
                            </td>
                            <td>
                                <input type="radio" id="e7" name="wednesday" value="Falafel" onChange={onDetailChanged}/>
                                <label>{arrFoods[6]}</label>
                            </td>
                            <td>
                                <input type="radio" id="e8" name="thusday" value="Shnitzel + pasta" onChange={onDetailChanged}/>
                                <label>{arrFoods[7]}</label>
                            </td>
                            <td>
                            <input type="radio" id="e9" name="monday" value="hamburger" onChange={onDetailChanged}/>
                                <label for="huey">{arrFoods[8]}</label>
                            </td>
                            <td>
                                <input type="radio" id="e10" name="sunday" value="hamburger" onChange={onDetailChanged}/>
                                <label for="huey">{arrFoods[9]}</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="radio" id="e11" name="thursday" value="Shnitzel + pasta" onChange={onDetailChanged}/>
                                <label>{arrFoods[10]}</label>
                            </td>
                            <td>
                                <input type="radio" id="e12" name="wednesday" value="hamburger" onChange={onDetailChanged}/>
                                <label for="huey">{arrFoods[11]}</label>
                            </td>
                            <td>
                                <input type="radio" id="e13" name="thusday" value="Falafel" onChange={onDetailChanged}/>
                                <label for="huey"> {arrFoods[12]}</label>
                            </td>
                            <td>
                                <input type="radio" id="e14" name="monday" value="Shnitzel + pasta" onChange={onDetailChanged}/>
                                <label for="huey">{arrFoods[13]}</label>
                            </td>
                            <td>
                                <input type="radio" id="e15" name="sunday" value="Falafel" onChange={onDetailChanged}/>
                                <label for="huey">{arrFoods[14]}</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="radio" id="e16" name="thursday" value={arrFoods[15]} onChange={onDetailChanged}/>
                                <label for="huey">{arrFoods[15]}</label>
                            </td>
                            <td>
                                <input type="radio" id="e17" name="wednesday" value="Chiken + rice" onChange={onDetailChanged}/>
                                <label for="huey">{arrFoods[16]}</label>
                            </td>
                            <td>
                                <input type="radio" id="e18" name="thusday" value="hamburger" onChange={onDetailChanged}/>
                                <label for="huey">{arrFoods[17]}</label>
                            </td>
                            <td>
                                <input type="radio" id="e19" name="monday" value="Chiken + rice" onChange={onDetailChanged}/>
                                <label for="huey">{arrFoods[18]}</label>
                            </td>
                            <td>
                                <input type="radio" id="e20" name="sunday" value="Chiken + rice" onChange={onDetailChanged}/>
                                <label for="huey">{arrFoods[19]}</label>
                            </td>
                        </tr>
                    </table>
                    <button onClick={sendDetailtoServer}>SEND</button>
                </div>
            </div>
        );
    }
    return(<h1>unautherized</h1>)
  
}

export default PersonalPage;