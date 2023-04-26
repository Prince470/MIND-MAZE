import { Link } from "react-router-dom";
import styles from "./styles.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import usePasswordToggle from "/src/usePasswordToggle";

function Login() {
	const googleAuth = () => {
		console.groupCollapsed("LOGIN")
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);

	// const[PasswordInputType, ToggleIcon] = usePasswordToggle();
	};

    const Login = () => {
		console.groupCollapsed("LOGIN")
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);

	};


	return (
		<div className={styles.container}>
			{/* <h1 className={styles.heading}></h1> */}
			<div className={styles.form_container}>
				{/* <div className={styles.left}>
					<img className={styles.img} src="./images/login.jpg" alt="login" />
				</div> */}
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Players Log in</h2>
					<input type="text" className={styles.input} placeholder="Email" />
					<input type="Password" className={styles.input} placeholder="Password" />
					{/* <span className="password-toggle-icon">{ToggleIcon}</span> */}
					{/* <button className={styles.btn}>Log In</button> */}
					<button className={styles.btn} onClick={Login}>
						Log in
					</button>
					{ <p className={styles.text}>or</p>
					/*<button className={styles.google_btn} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sign in with Google</span>
					</button> */}
					<p className={styles.text}>
						New Here ? <Link to="/signup">Create Account</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;