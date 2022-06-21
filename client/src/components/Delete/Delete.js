import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
function Delete(props) {
  let navigate = useNavigate();

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    
    


    let SendDataToServer = async () => {
      
    let requestOptions = {
         method: "DELETE",
    };
    try {
      let res = await fetch(`http://localhost:9048/api/Users/delete?email=${email}&password=${password}`, requestOptions);
      console.log(`status code=${res.status}`);
      if (res.ok) {
      
        setEmail("");
        setPassword("");
       
        alert("user is being deleted ");
        navigate("../home");
      }else{
        alert("deleting failed");
      }
    } catch (error) {
      console.log(error.message);
    }
   
  };
    return (
        <div>
            
            <ul class="form-style-1">
        <label>
          Email <span class="required">*</span>
        </label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="text"
          name="email"
          class="field-divided"
        />

        <li></li>
        <label>
          Password <span class="required">*</span>
        </label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          name="password"
          class="field-divided"
        />

        <li>
          <input
            type="submit"
            value="Submit"
            onClick={SendDataToServer}
          />
        </li>

      </ul>


        </div>
    );
}

export default Delete;