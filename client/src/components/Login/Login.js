import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
function Login(props) {
  let navigate = useNavigate();

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    
    let SendDataToServer = async () => {
        let data = {
          email: email,
          password: password,
        };



    let res = await fetch(`http://localhost:9048/api/Users/get?user_email=${email}&user_password${password}`);
    
    if (res.ok) {
      let jsonData = await res.json();
      setEmail("");
      setPassword("");
      alert("entering");
      navigate("../personalPage",{name:jsonData.first_name});
    }else{
      alert("Login Failed");
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

export default Login;