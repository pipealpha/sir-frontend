import React, { useState } from 'react';
import { Form, Button, Table, Container } from 'react-bootstrap';
import './GerenciarDisciplinas.css';

const GerenciarDisciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editCodigo, setEditCodigo] = useState('');
  const [editNome, setEditNome] = useState('');
  const [editCurso, setEditCurso] = useState('');

  const handleAddDisciplina = () => {
    const novaDisciplina = { codigo, nome, curso };
    setDisciplinas([...disciplinas, novaDisciplina]);
    setCodigo('');
    setNome('');
    setCurso('');
  };

  const handleEditDisciplina = (index) => {
    setEditIndex(index);
    setEditCodigo(disciplinas[index].codigo);
    setEditNome(disciplinas[index].nome);
    setEditCurso(disciplinas[index].curso);
  };

  const handleSaveDisciplina = (index) => {
    const updatedDisciplinas = [...disciplinas];
    updatedDisciplinas[index] = { codigo: editCodigo, nome: editNome, curso: editCurso };
    setDisciplinas(updatedDisciplinas);
    setEditIndex(null);
    setEditCodigo('');
    setEditNome('');
    setEditCurso('');
  };

  const handleDeleteDisciplina = (index) => {
    const novasDisciplinas = disciplinas.filter((_, i) => i !== index);
    setDisciplinas(novasDisciplinas);
  };

  return (
    <Container className="gerenciar-disciplinas-container">
      <h2>Gerenciar Disciplinas</h2>
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
          <Form.Control type="text" value={curso} onChange={(e) => setCurso(e.target.value)} />
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
                    type="text"
                    value={editCurso}
                    onChange={(e) => setEditCurso(e.target.value)}
                  />
                ) : (
                  disciplina.curso
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
