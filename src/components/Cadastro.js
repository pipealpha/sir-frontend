import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  return (
    <Container className="cadastro-container">
      <div className="cadastro-form">
        <h2>Cadastro</h2>
        <Form>
          <Form.Group controlId="formNome" className="form-group">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Digite seu nome" />
          </Form.Group>

          <Form.Group controlId="formEmail" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Digite seu email" />
          </Form.Group>

          <Form.Group controlId="formMatricula" className="form-group">
            <Form.Label>Matrícula</Form.Label>
            <Form.Control type="text" placeholder="Digite sua matrícula" />
          </Form.Group>

          <Form.Group controlId="formCurso" className="form-group">
            <Form.Label>Curso</Form.Label>
            <Form.Control type="text" placeholder="Digite seu curso" />
          </Form.Group>

          <Form.Group controlId="formAnoSemestre" className="form-group">
            <Form.Label>Ano/Semestre de Ingresso</Form.Label>
            <Form.Control type="text" placeholder="Digite seu ano/semestre de ingresso" />
          </Form.Group>

          <Form.Group controlId="formSenha" className="form-group">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="Digite sua senha" />
          </Form.Group>

          <Form.Group controlId="formConfirmarSenha" className="form-group">
            <Form.Label>Confirmar Senha</Form.Label>
            <Form.Control type="password" placeholder="Confirme sua senha" />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Cadastrar
          </Button>
          <Button variant="secondary" as={Link} to="/" className="w-100 mt-3">
            Cancelar
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Cadastro;
