import { Link } from "react-router-dom";
import { useState,useRef } from "react";
import styles from "./styles.module.css";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import usePasswordToggle from "/src/usePasswordToggle";
import { useNavigate } from 'react-router-dom';


function Login(props) {
	const [EmailValue, setEmailValue] = useState("");
	const [PasswordValue, setPasswordValue] = useState("");
	const navigate = useNavigate();
	const EmailChange = (event) => {
		setEmailValue(event.target.value);
	  };
	const PasswordChange = (event) => {
		setPasswordValue(event.target.value);
	  };
    const googleAuth = () => {
		console.groupCollapsed("LOGIN")
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};
    const Login = async (e)=>{
		const {data}= await axios.get('http://localhost:8080/login',{params :{email : EmailValue, password : PasswordValue}})
		console.log(EmailValue)
		console.log(PasswordValue)
		console.log("data is",data)
        if(data.data=='1')
		{
            await props.setUser({username : data.username, email:data.email});
			navigate('/')
		
		}
		
	}

	return (
		<div className={styles.container}>
			{/* <h1 className={styles.heading}></h1> */}
			<div className={styles.form_container}>
				{/* <div className={styles.left}>
					<img className={styles.img} src="./images/login.jpg" alt="login" />
				</div> */}
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Players Log in</h2>
			     
					<input type="text" className={styles.input} placeholder="Email"  onChange={EmailChange}/>
					<input type="Password" className={styles.input} placeholder="Password" onChange={PasswordChange}/>
					{/* <span className="password-toggle-icon">{ToggleIcon}</span> */}
					{/* <button className={styles.btn}>Log In</button> */}
					<button className={styles.btn} onClick={Login}>
						Log in
					</button>
					 <p className={styles.text}>or</p>
					<button className={styles.google_btn} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sign in with Google</span>
					</button> 
				    
					<p className={styles.text}>
						New Here ? <Link to="/signup">Create Account</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;