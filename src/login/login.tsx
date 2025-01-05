import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; 

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();  // Inicializar el hook navigate

    // Datos estáticos emulando respuesta del backend
    const user = {
        email: "user@example.com",
        password: "password123",
        role: 2, // 1 = admin, 2 = client
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegisterClick = () => {
        navigate('/register');  // Redirige a la ruta /register
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();  // Prevenir el comportamiento por defecto del formulario

        // Verifica el rol y redirige según corresponda
        if (user.role === 1) {
            navigate('/admin/');  // Si es administrador, redirige al dashboard de administrador
        } else if (user.role === 2) {
            navigate('/home');  // Si es cliente, redirige a la gestión del cliente
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="header-text">
                    <h2>Hello!</h2>
                    <p>Sign into Your account</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <span className="icon">📧</span>
                        <input type="email" placeholder="E-mail" required />
                    </div>
                    <div className="input-group">
                        <span className="icon">🔒</span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            required
                        />
                        <span
                            className="show-password"
                            onClick={togglePasswordVisibility}
                        >
                            👁️
                        </span>
                    </div>
                    <button type="submit" className="sign-in-button">
                        SIGN IN
                    </button>
                </form>
                <div className="register-section">
                    <div className='account-text'><p>No tienes una cuenta?</p></div>
                    <button className="register-button" onClick={handleRegisterClick}>
                        Registrarse
                    </button>
                </div>
            </div>
            <div
                className="welcome-section"
                style={{
                    background: "url('/images/logo.jpg') no-repeat center center",
                    backgroundSize: 'cover',
                }}
            ></div>
        </div>
    );
};

export default Login;
