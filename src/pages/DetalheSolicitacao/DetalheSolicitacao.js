import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import './DetalheSolicitacao.css';

const DetalheSolicitacao = ({ role }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [solicitacao, setSolicitacao] = useState(null);
  const [error, setError] = useState('');
  const [observacao, setObservacao] = useState('');

  useEffect(() => {
    const fetchSolicitacao = async () => {
      try {
        const response = await api.get(`/ajuste-matricula/${id}`);
        setSolicitacao(response.data);
        setObservacao(response.data.observacao || '');
      } catch (error) {
        console.error("Erro ao obter detalhes da solicitação", error);
        setError('Erro ao obter detalhes da solicitação. Tente novamente.');
      }
    };

    fetchSolicitacao();
  }, [id]);

  const handleVoltar = () => {
    navigate('/analise-solicitacoes');
  };

  const handleUpdateStatus = async (status, statusSIGAA = null) => {
    try {
      const updateData = {
        ...solicitacao,
        statusSolicitacao: status,
        observacao: observacao,
        ...(statusSIGAA && { statusSIGAA }), // Update statusSIGAA if provided
      };

      await api.put(`/ajuste-matricula/${id}`, updateData);
      console.log(`${status} atualizado com sucesso`);
      navigate('/analise-solicitacoes');
    } catch (error) {
      console.error(`Erro ao atualizar para ${status}`, error);
      setError(`Erro ao atualizar para ${status}. Tente novamente.`);
    }
  };

  const handleDeferido = () => {
    handleUpdateStatus('Deferido', 'Pendente');
  };

  const handleIndeferido = () => {
    handleUpdateStatus('Indeferido');
  };

  const handleAtualizadoSigaa = () => {
    handleUpdateStatus(solicitacao.statusSolicitacao, 'Efetuado');
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!solicitacao) {
    return <div>Carregando...</div>;
  }

  const isStatusFinal = solicitacao.statusSolicitacao === 'Deferido' || solicitacao.statusSolicitacao === 'Indeferido';
  const isSigaaFinal = solicitacao.statusSIGAA === 'Efetuado';

  return (
    <Container className="detalhe-solicitacao-container">
      <h2>Detalhes da Solicitação</h2>
      <Row>
        <Col md={6}>
          <h5>Dados da Disciplina</h5>
          <p><strong>Nome:</strong> {solicitacao.disciplina.nome}</p>
          <p><strong>Código:</strong> {solicitacao.disciplina.codigo}</p>
          <p><strong>Curso:</strong> {solicitacao.disciplina.curso.nome}</p>
        </Col>
        <Col md={6}>
          <h5>Dados do Estudante</h5>
          <p><strong>Nome:</strong> {solicitacao.estudante.usuario.nome}</p>
          <p><strong>E-mail:</strong> {solicitacao.estudante.usuario.email}</p>
          <p><strong>Matrícula:</strong> {solicitacao.estudante.matricula}</p>
          <p><strong>Curso:</strong> {solicitacao.estudante.curso.nome}</p>
          <p><strong>Ano/Semestre:</strong> {solicitacao.estudante.anoSemestreIngresso}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <h5>Solicitação de Ajuste de Matrícula</h5>
          <p><strong>Tipo de Solicitação:</strong> {solicitacao.tipoSolicitacao}</p>
          <p><strong>Já fez essa solicitação antes?</strong> {solicitacao.solicitacaoFeitaAnteriormente ? 'Sim' : 'Não'}</p>
          <p><strong>Data da Solicitação:</strong> {formatDate(solicitacao.dataSolicitacao)}</p>
          <p><strong>Status da Solicitação:</strong> {solicitacao.statusSolicitacao}</p>
          <p><strong>Status SIGAA:</strong> {solicitacao.statusSIGAA}</p>
        </Col>
      </Row>
      <Form.Group controlId="formObservacaoCoordenador" className="mt-4">
        <Form.Label>Observação do Coordenador</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          readOnly={role === 'RACI' || isStatusFinal || isSigaaFinal}
        />
      </Form.Group>
      <Row className="mt-4">
        {role === 'RACI' ? (
          <>
            <Col md={6}>
              <Button variant="success" onClick={handleAtualizadoSigaa} className="w-100" disabled={isSigaaFinal}>Atualizado no SIGAA</Button>
            </Col>
            <Col md={6}>
              <Button variant="secondary" onClick={handleVoltar} className="w-100">Voltar</Button>
            </Col>
          </>
        ) : (
          <>
            <Col md={4}>
              <Button variant="success" onClick={handleDeferido} className="w-100" disabled={isStatusFinal}>Deferido</Button>
            </Col>
            <Col md={4}>
              <Button variant="danger" onClick={handleIndeferido} className="w-100" disabled={isStatusFinal}>Indeferido</Button>
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
