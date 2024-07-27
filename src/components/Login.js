import React, { useState } from 'react';
import { Form, Button, Container, Alert, ButtonGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const users = [
  { login: 'estudante', password: '123', role: 'estudante' },
  { login: 'coordenador', password: '123', role: 'coordenador' },
  { login: 'raci', password: '123', role: 'raci' }
];

const Login = ({ setRole }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('estudante'); // Estado para o perfil selecionado
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.login === login && user.password === password && user.role === selectedRole);
    if (user) {
      setRole(user.role);
      navigate('/dashboard');
    } else {
      setError('Login, senha ou perfil inválidos.');
    }
  };

  return (
    <Container className="login-container">
      <div className="login-form">
        <h2>Sistema Integrado de Requerimentos</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formLogin" className="form-group">
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
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
                variant={selectedRole === 'estudante' ? 'primary' : 'outline-primary'}
                onClick={() => setSelectedRole('estudante')}
              >
                Estudante
              </Button>
              <Button
                variant={selectedRole === 'coordenador' ? 'primary' : 'outline-primary'}
                onClick={() => setSelectedRole('coordenador')}
              >
                Coordenador
              </Button>
              <Button
                variant={selectedRole === 'raci' ? 'primary' : 'outline-primary'}
                onClick={() => setSelectedRole('raci')}
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
