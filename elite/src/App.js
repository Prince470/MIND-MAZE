import './App.css';
import React,{useState , useEffect} from 'react';
import Form from './form.js'
import Login from './Login/login.js'
import SignUp from './Signup/index.jsx'
import { BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom"
import axios from 'axios'
function App() {
  const [user,setUser] = useState(null) 
  const check_user = async ()=>{
    const {data}= await axios.get('http://localhost:8080/check_user',{withCredentials : true})
    console.log(data)
    if(data.data=='1')
    {
      setUser({email: data.email, username: data.username})
    }
		
  }
  useEffect(()=>{
    check_user()
},[])
  return (
    <div className="container">
    <Router>
      <Routes>
				<Route
					exact
					path="/"
					element={user ? <Form user={user}/> : <Navigate to="/login" />}
				/>
				<Route
					exact
					path="/login"
					element={user ? <Navigate to="/" /> : <Login setUser={setUser}/>}
				/>
        <Route
          exact
          path='/signup'
          element={user ? <Navigate to="/" /> : <SignUp setUser={setUser}/>}
        />
			</Routes>
      </Router>
      </div>
  );
  
}

export default App;
