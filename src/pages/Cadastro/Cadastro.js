import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import './Cadastro.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [cursoId, setCursoId] = useState('');
  const [cursos, setCursos] = useState([]);
  const [anoSemestre, setAnoSemestre] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Obter a lista de cursos do backend
    const fetchCursos = async () => {
      try {
        const response = await api.get('/cursos');
        setCursos(response.data);
      } catch (error) {
        console.error("Erro ao obter cursos", error);
      }
    };

    fetchCursos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !email || !matricula || !cursoId || !anoSemestre || !senha || !confirmarSenha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      const usuarioResponse = await api.post('/usuarios', { nome, email, senha, perfil: 'Estudante' });
      await api.post('/estudantes', {
        matricula,
        ano_semestre_ingresso: anoSemestre,
        usuario: usuarioResponse.data,
        curso: { id_curso: cursoId }
      });

      setSuccess("Cadastro realizado com sucesso!");
      setError('');
      setTimeout(() => navigate('/'), 2000); // Redirecionar após 2 segundos
    } catch (error) {
      console.error("Erro ao cadastrar usuário", error);
      setError("Erro ao cadastrar usuário. Tente novamente.");
      setSuccess('');
    }
  };

  return (
    <Container className="cadastro-container">
      <div className="cadastro-form">
        <h2>Cadastro</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNome" className="form-group">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formMatricula" className="form-group">
            <Form.Label>Matrícula</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite sua matrícula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formCurso" className="form-group">
            <Form.Label>Curso</Form.Label>
            <Form.Control
              as="select"
              value={cursoId}
              onChange={(e) => setCursoId(e.target.value)}
            >
              <option value="">Selecione um curso</option>
              {cursos.map((curso) => (
                <option key={curso.id_curso} value={curso.id_curso}>
                  {curso.nome}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formAnoSemestre" className="form-group">
            <Form.Label>Ano/Semestre de Ingresso</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu ano/semestre de ingresso"
              value={anoSemestre}
              onChange={(e) => setAnoSemestre(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formSenha" className="form-group">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmarSenha" className="form-group">
            <Form.Label>Confirmar Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
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
