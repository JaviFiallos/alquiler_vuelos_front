import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { login } from '../services/auth.service';
import { getUserId, getUserRole } from '../utils/utils';
import './style.css';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);  // Estado de carga
    const navigate = useNavigate();

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
        navigate('/register');
    };

    const handleLogin = async (values: { email: string; password: string }) => {
        const { email, password } = values;

        setLoading(true);  // Empieza el proceso de carga

        try {
            const response = await login({ email, password });
            localStorage.setItem('authToken', response);
            console.log('Inicio de sesión exitoso:', response);

            if (getUserId() != null) {
                if (getUserRole() == 2) {
                    navigate("/home");
                } else if (getUserRole() == 1) {
                    navigate("/admin");
                } else{
                    navigate("/")
                }
            }

            message.success('Inicio de sesión exitoso!');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            message.error('Correo o contraseña incorrectos. Intenta de nuevo.');
        } finally {
            setLoading(false);  // Termina el proceso de carga
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="header-text">
                    <h2>Hello!</h2>
                    <p>Sign into Your account</p>
                </div>

                <Form
                    onFinish={handleLogin}  // El formulario usa onFinish para manejar el submit
                    layout="vertical"  // Usamos un layout vertical
                    initialValues={{ email: '', password: '' }}
                >
                    <Form.Item
                        label="E-mail"
                        name="email"
                        rules={[
                            { required: true, message: 'Por favor ingresa tu correo electrónico!' },
                            { type: 'email', message: 'El formato del correo es inválido!' },
                        ]}
                    >
                        <Input
                            prefix="📧"
                            placeholder="E-mail"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Por favor ingresa tu contraseña!' },
                            { min: 6, message: 'La contraseña debe tener al menos 6 caracteres!' },
                        ]}
                    >
                        <Input.Password
                            prefix="🔒"
                            placeholder="Password"
                            size="large"
                            iconRender={(visible) => (
                                <span onClick={togglePasswordVisibility}>
                                    {visible ? '👁️' : '👁️'}
                                </span>
                            )}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                        >
                            {loading ? 'Cargando...' : 'SIGN IN'}
                        </Button>
                    </Form.Item>
                </Form>

                <div className="register-section">
                    <div className="account-text">
                        <p>No tienes una cuenta?</p>
                    </div>
                    <Button
                        type="link"
                        onClick={handleRegisterClick}
                    >
                        Registrarse
                    </Button>
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
