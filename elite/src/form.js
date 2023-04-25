import { useState,useRef } from "react";
import React from "react"
// import Nav from './Nav.jsx'
import './App.css'
import './nav.css'
import CongratulationsPage from "./Nav.jsx";



const names = ['APJ Abdul Kalam','Galileo Galilei','Echo','R','Thomas Alva Edison','Eraser','Movie','Mercury','Zebra']

function Form(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage,setErrorMessage] = useState(""); 
  const [completed,setCompleted] = useState(false);
  const clueLinks = [
    {clue:"https://www.youtube.com/watch?v=99O8ieYc9hE.",
    type:"link"},
    
    
    {clue:"https://media.istockphoto.com/id/512605413/photo/telescope.jpg?s=612x612&w=is&k=20&c=OTXz8ld9bqMllA4OAsehDvrR9yn-YeDLVQSh-H3xdzc=",type:'image'
    },
    
    {clue:"I speak without a mouth and hear without ears. I have no body, but I come alive with wind..",
    type:"text"},

    {clue:"Tomorrow I am surely here, yesterday I am found as well. Today I am gone",type:"text"},

    {clue:"https://www.instagram.com/p/zS15eJqOap/?igshid=YmMyMTA2M2Y=",type:"link"},

    {clue:"My neighbor makes mistakes. I get rid of them.",
    type:"text"},

    {clue:"https://youtube.com/shorts/sDDfd70kP_M?feature=share",type:"link"},

    {clue:"I'm a god, a planet, and measurer of heat.",type:"text"},

    {clue:"I go from Z to A",type:"text"},
  ];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("BELOW")
    console.log(event.target)
    const expectedValue = names[currentPage - 1];
    
    if (expectedValue.toLowerCase()===inputValue.toLowerCase()) {
        if(currentPage!==9){
            setCurrentPage(currentPage + 1);
            setErrorMessage("");
        }
      
      if (currentPage === 9) {
            setCompleted(true);
      } else {
        setInputValue("");
      }
    } else {
        //WA
        const input = event.target.querySelector('.inPut');
        input.style.border= '3px solid red';
        
        setTimeout(() => {
            input.style.border= ''; // reset to original background color
        }, 1000); // 1000 milliseconds = 1 second
       
    //   setErrorMessage("Wrong answer please try again.");
      setInputValue("");
    }
  };

  const url= process.env.REACT_APP_API_URL
    const googleAuth = () => {
      window.open(
        `${url}/auth/google/callback`,
        "_self"
      );
    };
    // const googleAuthOut = () => {
    //   window.open(
    //     `${url}/logout`,
    //      "_self"
    //   );
    // };
    const logout = ()=>{
        window.open(
          `${url}/logout`,
          "_self"
        );
    }
  return (
   <div className="Div1">
    {((currentPage == 9) && completed)?<CongratulationsPage/>
  :
  <>  <nav className="Header">
   <h1>MIND MAZE</h1>


        <div className="sidepanel" id="mySidepanel">
          <a href="#" className="closebtn" onClick={closeNav}>
            &times;
          </a>
          <ul>
          
          <h1>MIND MAZE</h1>
          <li><a  href="#">About</a></li>
          <li><a href="#">Services</a></li> 
          <li><a href="#" onClick={logout}>logout</a></li>

          </ul>
        </div>

        <button className="openbtn" onClick={openNav}>
          &#9776;
        </button>
      </nav>
    
  
 <div className="Level"><h1>LEVEL {currentPage}</h1></div>
<div className="clue"> <form className="Form" onSubmit={handleSubmit}>
    {clueLinks[currentPage-1].type==='text'?
    <h1 className="Clues" >Clue : {clueLinks[currentPage - 1].clue}</h1>
    :
    (
    clueLinks[currentPage-1].type==='image'?
    <h1>Clue : <img src={clueLinks[currentPage-1].clue} alt="" style={{width:'150px',height:'150px'} }/></h1>
    :<h1>Clue : <a href={clueLinks[currentPage-1].clue} target="_blank" rel="noopener noreferrer">{clueLinks[currentPage - 1].clue}</a></h1>)
    }
    
    <hr/>   
 <input className="inPut" type="text" placeholder={`Who am i ?`} value={inputValue}
          onChange={handleInputChange}/><button className = "Button" type="submit">NEXT</button>
          {/* <h6>Number of Attempts : 2</h6>  */}
          </form>
          {errorMessage && <h1>{errorMessage}</h1>}
          </div></>}
    <div className="container">

    </div>
    </div>
  );
}

function openNav() {
    document.getElementById("mySidepanel").style.width="20%";
  }
  
  function closeNav() {
    document.getElementById("mySidepanel").style.width="0%";
  }

export default Form;


