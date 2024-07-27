import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import './GerenciarCursos.css';

const GerenciarCursos = () => {
  const [cursos, setCursos] = useState([
    { id: 1, nome: 'Engenharia de Computação', sigla: 'ECO', email: 'eco@ifc.edu' },
    { id: 2, nome: 'Engenharia de Controle e Automação', sigla: 'ECA', email: 'eca@ifc.edu' }
  ]);

  const [novoCurso, setNovoCurso] = useState({ nome: '', sigla: '', email: '' });
  const [editandoCursoId, setEditandoCursoId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoCurso({ ...novoCurso, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editandoCursoId) {
      setCursos(cursos.map(curso => curso.id === editandoCursoId ? { ...novoCurso, id: editandoCursoId } : curso));
      setEditandoCursoId(null);
    } else {
      setCursos([...cursos, { ...novoCurso, id: cursos.length + 1 }]);
    }
    setNovoCurso({ nome: '', sigla: '', email: '' });
  };

  const handleEdit = (curso) => {
    setNovoCurso(curso);
    setEditandoCursoId(curso.id);
  };

  const handleDelete = (id) => {
    setCursos(cursos.filter(curso => curso.id !== id));
  };

  return (
    <Container className="gerenciar-cursos-container">
      <h2>Gerenciar Cursos</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group controlId="formNomeCurso">
              <Form.Label>Nome do Curso</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do curso"
                name="nome"
                value={novoCurso.nome}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formSiglaCurso">
              <Form.Label>Sigla</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a sigla do curso"
                name="sigla"
                value={novoCurso.sigla}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formEmailCurso">
              <Form.Label>Email da Coordenação</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite o email da coordenação"
                name="email"
                value={novoCurso.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          {editandoCursoId ? 'Salvar' : 'Cadastrar'}
        </Button>
      </Form>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Nome do Curso</th>
            <th>Sigla</th>
            <th>Email da Coordenação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map(curso => (
            <tr key={curso.id}>
              <td>{curso.nome}</td>
              <td>{curso.sigla}</td>
              <td>{curso.email}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(curso)} className="mr-2">Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(curso.id)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GerenciarCursos;
