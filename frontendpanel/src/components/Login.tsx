import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Check if the entered credentials match the admin credentials
        if (email === 'admin@gmail.com' && password === '123456') {
            // Redirect to the admin page
            window.location.href = '/admin';
        } else if (email === 'user@gmail.com' && password === '123456') {
            // Handle invalid credentials
            window.location.href = '/instructor';
        }
    };

    return (
        <div>
            <br />
            <div>
                <p>
                    Admin Email := admin@gmail.com
                </p>
                <p>
                    Admin Password : = 123456
                </p>
                <br />
                <p>
                    User Email := user@gmail.com
                </p>
                <p>
                    User Password : = 123456
                </p>
            </div>
            <div>
                <h2>Login</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
