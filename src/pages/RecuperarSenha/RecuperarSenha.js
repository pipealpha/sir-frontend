import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../api';
import './RecuperarSenha.css';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/recuperar-senha', { email });
      setSuccess('Instruções de recuperação de senha foram enviadas para o seu e-mail.');
      setError('');
    } catch (error) {
      setError('Erro ao enviar e-mail de recuperação. Tente novamente.');
      setSuccess('');
    }
  };

  return (
    <Container className="recuperar-senha-container">
      <div className="recuperar-senha-form">
        <h2>Recuperar Senha</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
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

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Enviar
          </Button>
          <Button variant="secondary" as={Link} to="/" className="w-100 mt-3">
            Cancelar
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default RecuperarSenha;
