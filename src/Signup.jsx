
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import './Signup.css'
export default function Signup() {
    const[items, setItems] = useState([])
    const navigateTo = useNavigate();
    
        const handleSubmit = (e) => {
            e.preventDefault()

            const data = JSON.parse(localStorage.getItem('items')) || [];
            const name = e.target[0].value;
            const user = data.find((item) => item.name === name);
            if (user) {
                alert('User already exists! Please register with a different username or Login!');
            }
            else{
            const newItem = {
                name: e.target[0].value,
                email: e.target[1].value,
                password: e.target[2].value,
              };
              setItems([...items, newItem]);
              e.target[0].value = '';
              e.target[1].value = '';
              e.target[2].value = '';

            //const data = JSON.parse(localStorage.getItem('items')) || [];
            if (data.length === 0) {
                localStorage.setItem('items', JSON.stringify([...items, newItem]));
            }else {
                localStorage.setItem('items', JSON.stringify([...data, ...items,newItem]));
            }
            setTimeout(() => {
                navigateTo('/Login');
              }, 100);
            }
            
        }
        function redirect() {
        
            navigateTo('/Login');
        }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div>
            <label className="form-element" htmlFor="name">Username:</label>
            <input className="form-element" type="text" id="name" name="name" required />
            </div>
            <div>
            <label className="form-element" htmlFor="email">Email:</label>
            <input className="form-element" type="email" id="email" name="email" required />
            </div>
            <div>
            <label className="form-element" htmlFor="password">Password:</label>
            <input className="form-element" type="password" id="password" name="password" required />
            </div>
            <div>
            <button className="form-element" type="submit">Sign Up</button>
            </div>
            <div>
            <label  id="already" className="form-element" htmlFor="login">Already have an account?</label>
            <button className="form-element" onClick={redirect} >Login</button>
            </div>
        
        </form>
    )
}