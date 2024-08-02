import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import './SolicitarAjusteMatricula.css';

function SolicitarAjusteMatricula() {
  const [course, setCourse] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [requestType, setRequestType] = useState('');
  const [previousRequest, setPreviousRequest] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [courses, setCourses] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse = await api.get('/cursos');
        if (Array.isArray(coursesResponse.data)) {
          setCourses(coursesResponse.data);
        } else {
          setError('Erro ao obter cursos: dados recebidos não são uma lista');
        }
      } catch (error) {
        console.error("Erro ao obter cursos", error);
        setError('Erro ao obter cursos. Tente novamente.');
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchDisciplines = async () => {
      if (course) {
        try {
          const disciplinesResponse = await api.get(`/disciplinas/curso/${course}`);
          if (Array.isArray(disciplinesResponse.data)) {
            setDisciplines(disciplinesResponse.data);
          } else {
            setError('Erro ao obter disciplinas: dados recebidos não são uma lista');
          }
        } catch (error) {
          console.error("Erro ao obter disciplinas", error);
          setError('Erro ao obter disciplinas. Tente novamente.');
        }
      }
    };

    fetchDisciplines();
  }, [course]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const estudanteId = localStorage.getItem('estudanteId'); // Obtendo o estudanteId do localStorage

      const ajusteMatriculaDTO = {
        tipoSolicitacao: requestType,
        solicitacaoFeitaAnteriormente: previousRequest === 'sim',
        statusSolicitacao: 'Em análise',
        statusSIGAA: '',
        observacao: '',
        disciplinaId: discipline,
        estudanteId: estudanteId // Incluindo o estudanteId no pedido
      };

      await api.post('/ajuste-matricula', ajusteMatriculaDTO);
      setSuccess('Solicitação de ajuste de matrícula enviada com sucesso!');
      setError('');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      console.error("Erro ao enviar solicitação de ajuste de matrícula", error);
      setError('Erro ao enviar solicitação de ajuste de matrícula. Tente novamente.');
      setSuccess('');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <Container className="solicitar-ajuste-container">
      <Form className="solicitar-ajuste-form" onSubmit={handleSubmit}>
        <h2>Solicitar Ajuste de Matrícula</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form.Group controlId="formCourse">
          <Form.Label>Curso que está ofertando a disciplina cujo ajuste está sendo requerido</Form.Label>
          <Form.Control
            as="select"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">Selecione o curso</option>
            {courses.map((course) => (
              <option key={course.idCurso} value={course.idCurso}>{course.nome}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formDiscipline">
          <Form.Label>Disciplina</Form.Label>
          <Form.Control
            as="select"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
          >
            <option value="">Selecione a disciplina</option>
            {disciplines.map((discipline) => (
              <option key={discipline.idDisciplina} value={discipline.idDisciplina}>{discipline.nome}</option>
            ))}
          </Form.Control>
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
