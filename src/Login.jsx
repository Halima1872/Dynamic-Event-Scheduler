import { useNavigate } from 'react-router-dom';
import './Signup.css'
export default function Login() {
    const navigateTo = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault()
        const data = JSON.parse(localStorage.getItem('items')) || [];
        const name = e.target[0].value;
        const password = e.target[1].value;
        const user = data.find((item) => item.name === name && item.password === password);
        if (user) {
            alert('Login successful');
            navigateTo('/Welcome');
            localStorage.setItem('CurrentUser', name);
            localStorage.setItem('isLoggedIn', true);
        }
        else {
            alert('Invalid Credentials');
        }
    }
    function redirect() { 
        navigateTo('/');
    }
    
    return (
        <form method="post" onSubmit={handleLogin} >
        <h1>Login</h1>
        <div>
        <label className="form-element" htmlFor="name">Username:</label>
        <input className="form-element" type="text" id="name" name="name" required/>
        </div>
        <div>
        <label className="form-element" htmlFor="password">Password:</label>
        <input className="form-element" type="password" id="password" name="password" required/>
        </div>
        <div>
        <button className="form-element" type="submit">Login</button>
        </div>
        <div>
        <label  id="already" className="form-element" htmlFor="login">Dont have an account?</label>
        <button className="form-element" onClick={redirect} >Sign Up</button>
        </div>
    </form>
    )
}