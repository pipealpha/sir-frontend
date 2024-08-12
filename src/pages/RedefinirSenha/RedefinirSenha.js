import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api';
import './RedefinirSenha.css';

const RedefinirSenha = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const email = queryParams.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      await api.post('/auth/redefinir-senha', { token, email, password });
      setSuccess('Senha alterada com sucesso.');
      setError('');
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      setError('Erro ao redefinir a senha. Tente novamente.');
      setSuccess('');
    }
  };

  return (
    <Container className="redefinir-senha-container">
      <div className="redefinir-senha-form">
        <h2>Redefinir Senha</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formPassword" className="form-group">
            <Form.Label>Nova Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="form-group">
            <Form.Label>Confirme a Nova Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirme sua nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Redefinir Senha
          </Button>
          <Button variant="secondary" as={Link} to="/" className="w-100 mt-3">
            Cancelar
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default RedefinirSenha;
