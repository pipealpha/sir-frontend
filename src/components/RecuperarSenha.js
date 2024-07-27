import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './RecuperarSenha.css';

const RecuperarSenha = () => {
  return (
    <Container className="recuperar-senha-container">
      <div className="recuperar-senha-form">
        <h2>Recuperar Senha</h2>
        <Form>
          <Form.Group controlId="formEmail" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Digite seu email" />
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
