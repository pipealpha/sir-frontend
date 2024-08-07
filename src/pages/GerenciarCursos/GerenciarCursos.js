import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';
import api from '../../api';
import './GerenciarCursos.css';

const GerenciarCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [novoCurso, setNovoCurso] = useState({ nome: '', sigla: '', emailCoordenador: '' });
  const [editandoCursoId, setEditandoCursoId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await api.get('/cursos');
        setCursos(response.data);
      } catch (error) {
        console.error('Erro ao carregar cursos', error);
        setError('Erro ao carregar cursos. Tente novamente.');
      }
    };

    fetchCursos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoCurso({ ...novoCurso, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoCursoId) {
        await api.put(`/cursos/${editandoCursoId}`, novoCurso);
        setCursos(cursos.map(curso => curso.idCurso === editandoCursoId ? { ...novoCurso, idCurso: editandoCursoId } : curso));
        setEditandoCursoId(null);
      } else {
        const response = await api.post('/cursos', novoCurso);
        setCursos([...cursos, response.data]);
      }
      setNovoCurso({ nome: '', sigla: '', emailCoordenador: '' });
    } catch (error) {
      console.error('Erro ao salvar curso', error);
      setError('Erro ao salvar curso. Tente novamente.');
    }
  };

  const handleEdit = (curso) => {
    setNovoCurso(curso);
    setEditandoCursoId(curso.idCurso);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/cursos/${id}`);
      setCursos(cursos.filter(curso => curso.idCurso !== id));
    } catch (error) {
      console.error('Erro ao excluir curso', error);
      setError('Erro ao excluir curso. Tente novamente.');
    }
  };

  return (
    <Container className="gerenciar-cursos-container">
      <h2>Gerenciar Cursos</h2>
      {error && <Alert variant="danger">{error}</Alert>}
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
            <Form.Group controlId="formEmailCoordenador">
              <Form.Label>Email da Coordenação</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite o email da coordenação"
                name="emailCoordenador"
                value={novoCurso.emailCoordenador}
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
            <tr key={curso.idCurso}>
              <td>{curso.nome}</td>
              <td>{curso.sigla}</td>
              <td>{curso.emailCoordenador}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(curso)} className="mr-2">Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(curso.idCurso)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GerenciarCursos;
