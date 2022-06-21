import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

function Register(props) {
  let errArr = [];
  let navigate = useNavigate();
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let SendDataToServer = () => {
    
    let data = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
    };
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:9048/api/Users/create", requestOptions).then( (response) => response.json() )
    .then( (data) =>{
      alert("You have successfully registered")
      navigate("../personalPage",{state:{name:data.first_name}}) 
    })
    .catch( (error) => alert("Busy email "));
  }
    const validateFirstName = (text) => {
      console.log("validate name")

      if (text.length < 2 || text.length > 10)
      { 
 
        errArr.push("first name is not valid!"); 
      }
      
    }

    const validLastName = (text) => {
      if (text.length < 2 || text.length > 12)
      {
        errArr.push("last name is not valid!");
      }
      
    }

    const validPassword = (text) => {
      if (text.length === 0)
      {
        errArr.push("password is not valid!");
      }
      
    }

    const ValidateEmailAddress = (emailString) => {
      // check for @ sign
      var shtrodel = emailString.indexOf("@");
      if(shtrodel < 1) return false;
      
      var dot = emailString.indexOf(".");
      if(dot <= shtrodel + 2) return false;
      
      // check that the dot is not at the end
      if (dot === emailString.length - 1) return false;
      
      return true;
    }
   
    const handleRegistration = async () => {
      console.log("in registraion")
      try {
        await validateFirstName(firstName);
       
        await validLastName(lastName);
        let isValid = await ValidateEmailAddress(email);
        if(!isValid)
        {
          errArr.push("email address is not valid!")
        }
        await validPassword(password);
        console.log(errArr)
        if (errArr.length == 0 )
        {
          console.log("sending data")
         SendDataToServer();
        }
        else
        {
          let errMessage = "";
          for (let index = 0; index < errArr.length; index++) {
            const element = errArr[index];
            errMessage += element + "\n";
   
          }
          alert(errMessage)
          errArr = [];
        }
      } catch (error) {
        console.log(error.message)
      }
  
    }

    return (
        <div>
      <ul class="form-style-1">
        <li>
          <label>
            First Name <span class="required">*</span>
          </label>
          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
            type="text"
            name="firstname"
            class="field-divided"
            placeholder="First name"
          />
          <label>
            Last Name <span class="required">*</span>
          </label>
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
            type="text"
            name="lastname"
            class="field-divided"
            placeholder="Last name"
          />
        </li>
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
          placeholder="Email"
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
          placeholder="Password"
          class="field-divided"
        />

        <li>
          <input
            type="submit"
            value="Submit"
            onClick={handleRegistration}
          />
        </li>
      </ul>
            
        </div>
    );
}

export default Register;