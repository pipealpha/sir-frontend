import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SolicitarAjusteMatricula.css';

function SolicitarAjusteMatricula() {
  const [course, setCourse] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [requestType, setRequestType] = useState('');
  const [previousRequest, setPreviousRequest] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para submeter o formulário
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <Container className="solicitar-ajuste-container">
      <Form className="solicitar-ajuste-form" onSubmit={handleSubmit}>
        <h2>Solicitar Ajuste de Matrícula</h2>
        <Form.Group controlId="formCourse">
          <Form.Label>Curso que está ofertando a disciplina cujo ajuste está sendo requerido</Form.Label>
          <Form.Control
            as="select"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">Selecione o curso</option>
            <option value="curso1">Curso 1</option>
            <option value="curso2">Curso 2</option>
            <option value="curso3">Curso 3</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formDiscipline">
          <Form.Label>Disciplina</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite ou selecione a disciplina"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formRequestType">
          <Form.Label>Tipo de Solicitação</Form.Label>
          <Form.Control
            as="select"
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
          >
            <option value="">Selecione o tipo de solicitação</option>
            <option value="incluir">Incluir</option>
            <option value="excluir">Excluir</option>
            <option value="quebra">Quebra de pré-requisito</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formPreviousRequest">
          <Form.Label>Você já fez essa solicitação antes?</Form.Label>
          <Form.Check
            type="radio"
            label="Sim"
            name="previousRequest"
            value="sim"
            checked={previousRequest === 'sim'}
            onChange={(e) => setPreviousRequest(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Não"
            name="previousRequest"
            value="não"
            checked={previousRequest === 'não'}
            onChange={(e) => setPreviousRequest(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="btn-submit">
          Submeter
        </Button>
        <Button variant="secondary" onClick={handleCancel} className="btn-cancel">
          Cancelar
        </Button>
      </Form>
    </Container>
  );
}

export default SolicitarAjusteMatricula;
