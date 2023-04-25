import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function Signup(props) {
	const navigate = useNavigate();
	const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};
	const SignIn=async (e)=>{
		e.preventDefault();
		console.log(e.target)
		const username=e.target.querySelector('#username').value
		const email=e.target.querySelector('#email').value
		const password=e.target.querySelector('#password').value
		const {data}= await axios.get('http://localhost:8080/signin',{params :{username : username, email : email, password : password}})
		console.log('on sign in',data.data)
		if(data.data=='1')
		{
           navigate('/')
		}
		else
		{
           username=""
		   email=""
		   password=""
		}
	}
	return (
		<div className={styles.container}>
			{/* <h1 className={styles.heading}>Sign up Form</h1> */}
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/figure.jpg" alt="signup" />
				</div>
				<div className={styles.right}>
					<form onSubmit={SignIn}>
					<h2 className={styles.from_heading}>Create Account</h2>
					<input type="text" id="username" className={styles.input} placeholder="Username" />
					<input type="text" id="email" className={styles.input} placeholder="Email" />
					<input type="password" id="password" className={styles.input} placeholder="Password" />
					<button type="submit" className={styles.btn}>Sign Up</button>
					</form>
					<p className={styles.text}>or</p>
					{/* <button className={styles.google_btn} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sign up with Google</span>
					</button> */}
					<p className={styles.text}>
						Already Have Account ? <Link to="/login">Log In</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;