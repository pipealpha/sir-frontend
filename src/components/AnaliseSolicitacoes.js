import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AnaliseSolicitacoes.css';

const AnaliseSolicitacoes = ({ role }) => {
  const navigate = useNavigate();

  const solicitacoes = [
    {
      id: 1,
      codigoDisciplina: 'MAT101',
      nomeDisciplina: 'Matemática Básica',
      nomeEstudante: 'João Silva',
      tipoSolicitacao: 'Inclusão',
      status: 'Deferido',
      statusSigaa: 'Pendente',
      dataSolicitacao: '2023-07-01',
    },
    {
      id: 2,
      codigoDisciplina: 'INF101',
      nomeDisciplina: 'Informática',
      nomeEstudante: 'Maria Alves',
      tipoSolicitacao: 'Inclusão',
      status: 'Indeferido',
      statusSigaa: 'Pendente',
      dataSolicitacao: '2023-07-01',
    },
  ];

  const handleAnalisarSolicitacao = (id) => {
    navigate(`/detalhe-solicitacao/${id}`);
  };

  const renderTableHeader = () => (
    <thead>
      <tr>
        <th>Código da Disciplina</th>
        <th>Nome da Disciplina</th>
        <th>Nome do Estudante</th>
        <th>Tipo de Solicitação</th>
        <th>Status</th>
        {role === 'raci' && <th>Status SIGAA</th>}
        <th>Data da Solicitação</th>
        <th>Ações</th>
      </tr>
    </thead>
  );

  const renderTableRows = () => (
    solicitacoes
      .filter(solicitacao => role !== 'raci' || solicitacao.status === 'Deferido')
      .map((solicitacao) => (
        <tr key={solicitacao.id}>
          <td>{solicitacao.codigoDisciplina}</td>
          <td>{solicitacao.nomeDisciplina}</td>
          <td>{solicitacao.nomeEstudante}</td>
          <td>{solicitacao.tipoSolicitacao}</td>
          <td>{solicitacao.status}</td>
          {role === 'raci' && <td>{solicitacao.statusSigaa}</td>}
          <td>{solicitacao.dataSolicitacao}</td>
          <td>
            <Button
              variant="primary"
              onClick={() => handleAnalisarSolicitacao(solicitacao.id)}
            >
              Analisar
            </Button>
          </td>
        </tr>
      ))
  );

  return (
    <Container className="analise-solicitacoes-container">
      <h2>Análise das Solicitações</h2>
      <Table striped bordered hover className="mt-4">
        {renderTableHeader()}
        <tbody>
          {renderTableRows()}
        </tbody>
      </Table>
    </Container>
  );
};

export default AnaliseSolicitacoes;
