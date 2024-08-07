import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Container, Alert } from 'react-bootstrap';
import api from '../../api';
import './GerenciarDisciplinas.css';

const GerenciarDisciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [courses, setCourses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editCodigo, setEditCodigo] = useState('');
  const [editNome, setEditNome] = useState('');
  const [editCurso, setEditCurso] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    
    const fetchDisciplinas = async () => {
      try {
        const cursoId = localStorage.getItem('cursoId');
        const response = await api.get(`/disciplinas/curso/${cursoId}`);
        if (isMounted) {
          setDisciplinas(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar disciplinas", error);
        if (isMounted) {
          setError('Erro ao carregar disciplinas. Tente novamente.');
        }
      }
    };

    const fetchCourses = async () => {
      try {
        const cursoId = localStorage.getItem('cursoId');
        const coursesResponse = await api.get(`/cursos/${cursoId}`);
        if (isMounted) {
          setCourses([coursesResponse.data]);
          setCurso(cursoId);  // Predefine the course to the user's course
        }
      } catch (error) {
        console.error("Erro ao obter cursos", error);
        if (isMounted) {
          setError('Erro ao obter cursos. Tente novamente.');
        }
      }
    };

    fetchDisciplinas();
    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddDisciplina = async () => {
    const novaDisciplina = { codigo, nome, curso: { idCurso: curso } };
    try {
      await api.post('/disciplinas', novaDisciplina);
      const cursoId = localStorage.getItem('cursoId');
      const response = await api.get(`/disciplinas/curso/${cursoId}`);
      setDisciplinas(response.data);
      setCodigo('');
      setNome('');
      setCurso('');
    } catch (error) {
      console.error("Erro ao adicionar disciplina", error);
      setError('Erro ao adicionar disciplina. Tente novamente.');
    }
  };

  const handleEditDisciplina = (index) => {
    setEditIndex(index);
    setEditCodigo(disciplinas[index].codigo);
    setEditNome(disciplinas[index].nome);
    setEditCurso(disciplinas[index].curso.idCurso);
  };

  const handleSaveDisciplina = async (index) => {
    const updatedDisciplina = {
      codigo: editCodigo,
      nome: editNome,
      curso: { idCurso: editCurso, nome: disciplinas[index].curso.nome, sigla: disciplinas[index].curso.sigla },
    };
    try {
      await api.put(`/disciplinas/${disciplinas[index].idDisciplina}`, updatedDisciplina);
      const updatedDisciplinas = [...disciplinas];
      updatedDisciplinas[index] = updatedDisciplina;
      setDisciplinas(updatedDisciplinas);
      setEditIndex(null);
      setEditCodigo('');
      setEditNome('');
      setEditCurso('');
    } catch (error) {
      console.error("Erro ao atualizar disciplina", error);
      setError('Erro ao atualizar disciplina. Tente novamente.');
    }
  };

  const handleDeleteDisciplina = async (index) => {
    try {
      const disciplinaId = disciplinas[index].idDisciplina;
      await api.delete(`/disciplinas/${disciplinaId}`);
      const novasDisciplinas = disciplinas.filter((_, i) => i !== index);
      setDisciplinas(novasDisciplinas);
    } catch (error) {
      console.error("Erro ao excluir disciplina", error);
      setError('Erro ao excluir disciplina. Tente novamente.');
    }
  };

  return (
    <Container className="gerenciar-disciplinas-container">
      <h2>Gerenciar Disciplinas</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Form.Group controlId="formCodigo">
          <Form.Label>Código da Disciplina</Form.Label>
          <Form.Control type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formNome">
          <Form.Label>Nome da Disciplina</Form.Label>
          <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formCurso">
          <Form.Label>Curso</Form.Label>
          <Form.Control
            as="select"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            disabled
          >
            {courses.map((course) => (
              <option key={course.idCurso} value={course.idCurso}>{course.nome}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" onClick={handleAddDisciplina}>
          Cadastrar
        </Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.map((disciplina, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <Form.Control
                    type="text"
                    value={editCodigo}
                    onChange={(e) => setEditCodigo(e.target.value)}
                  />
                ) : (
                  disciplina.codigo
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <Form.Control
                    type="text"
                    value={editNome}
                    onChange={(e) => setEditNome(e.target.value)}
                  />
                ) : (
                  disciplina.nome
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <Form.Control
                    as="select"
                    value={editCurso}
                    onChange={(e) => setEditCurso(e.target.value)}
                    disabled
                  >
                    {courses.map((course) => (
                      <option key={course.idCurso} value={course.idCurso}>{course.nome}</option>
                    ))}
                  </Form.Control>
                ) : (
                  disciplina.curso.nome
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <Button variant="success" onClick={() => handleSaveDisciplina(index)}>
                    Salvar
                  </Button>
                ) : (
                  <>
                    <Button variant="warning" className="mr-2" onClick={() => handleEditDisciplina(index)}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteDisciplina(index)}>
                      Excluir
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GerenciarDisciplinas;
