import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import './DetalheSolicitacao.css';

const DetalheSolicitacao = ({ role }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const solicitacao = {
    id,
    codigoDisciplina: 'MAT101',
    nomeDisciplina: 'Matemática Básica',
    cursoDisciplina: 'Engenharia',
    nomeEstudante: 'João Silva',
    emailEstudante: 'joao.silva@example.com',
    matriculaEstudante: '202012345',
    cursoEstudante: 'Engenharia',
    anoSemestre: '2020/2',
    tipoSolicitacao: 'Inclusão',
    solicitacaoAnterior: 'Sim',
    observacaoCoordenador: 'Aprovo esta solicitação.',
  };

  const handleVoltar = () => {
    navigate('/analise-solicitacoes');
  };

  const handleAtualizadoSigaa = () => {
    console.log('Atualizado no SIGAA');
  };

  const handleDeferido = () => {
    console.log('Deferido');
  };

  const handleIndeferido = () => {
    console.log('Indeferido');
  };

  return (
    <Container className="detalhe-solicitacao-container">
      <h2>Detalhes da Solicitação</h2>
      <Row>
        <Col md={6}>
          <h5>Dados da Disciplina</h5>
          <p><strong>Nome:</strong> {solicitacao.nomeDisciplina}</p>
          <p><strong>Código:</strong> {solicitacao.codigoDisciplina}</p>
          <p><strong>Curso:</strong> {solicitacao.cursoDisciplina}</p>
        </Col>
        <Col md={6}>
          <h5>Dados do Estudante</h5>
          <p><strong>Nome:</strong> {solicitacao.nomeEstudante}</p>
          <p><strong>E-mail:</strong> {solicitacao.emailEstudante}</p>
          <p><strong>Matrícula:</strong> {solicitacao.matriculaEstudante}</p>
          <p><strong>Curso:</strong> {solicitacao.cursoEstudante}</p>
          <p><strong>Ano/Semestre:</strong> {solicitacao.anoSemestre}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <h5>Solicitação de Ajuste de Matrícula</h5>
          <p><strong>Tipo de Solicitação:</strong> {solicitacao.tipoSolicitacao}</p>
          <p><strong>Já fez essa solicitação antes?</strong> {solicitacao.solicitacaoAnterior}</p>
        </Col>
      </Row>
      <Form.Group controlId="formObservacaoCoordenador" className="mt-4">
        <Form.Label>Observação do Coordenador</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          readOnly={role === 'RACI'}
          defaultValue={solicitacao.observacaoCoordenador}
        />
      </Form.Group>
      <Row className="mt-4">
        {role === 'RACI' ? (
          <>
            <Col md={6}>
              <Button variant="success" onClick={handleAtualizadoSigaa} className="w-100">Atualizado no SIGAA</Button>
            </Col>
            <Col md={6}>
              <Button variant="secondary" onClick={handleVoltar} className="w-100">Voltar</Button>
            </Col>
          </>
        ) : (
          <>
            <Col md={4}>
              <Button variant="success" onClick={handleDeferido} className="w-100">Deferido</Button>
            </Col>
            <Col md={4}>
              <Button variant="danger" onClick={handleIndeferido} className="w-100">Indeferido</Button>
            </Col>
            <Col md={4}>
              <Button variant="secondary" onClick={handleVoltar} className="w-100">Voltar</Button>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default DetalheSolicitacao;
