import React, { useState } from 'react';
import { Form, Button, Container, Alert, ButtonGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api';
import './Login.css';

const Login = ({ setRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Estudante');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { email, password });
      const { perfil } = response.data;
      if (perfil !== selectedRole) {
        setError('Perfil inválido.');
      } else {
        setRole(perfil);
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Login ou senha inválidos.');
    }
  };

  return (
    <Container className="login-container">
      <div className="login-form">
        <h2>Sistema Integrado de Requerimentos</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formSenha" className="form-group">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Selecione o perfil</Form.Label>
            <ButtonGroup toggle className="mb-3 d-flex justify-content-center">
              <Button
                variant={selectedRole === 'Estudante' ? 'primary' : 'outline-primary'}
                onClick={() => setSelectedRole('Estudante')}
              >
                Estudante
              </Button>
              <Button
                variant={selectedRole === 'Coordenador' ? 'primary' : 'outline-primary'}
                onClick={() => setSelectedRole('Coordenador')}
              >
                Coordenador
              </Button>
              <Button
                variant={selectedRole === 'RACI' ? 'primary' : 'outline-primary'}
                onClick={() => setSelectedRole('RACI')}
              >
                RACI
              </Button>
            </ButtonGroup>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Entrar
          </Button>
          <Button variant="secondary" as={Link} to="/cadastro" className="w-100 mt-3">
            Cadastrar
          </Button>
          <Button variant="link" as={Link} to="/recuperar-senha" className="w-100 mt-3">
            Esqueceu a Senha?
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
