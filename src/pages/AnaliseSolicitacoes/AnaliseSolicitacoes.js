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

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendente':
      case 'Em análise':
        return 'status-pendente';
      case 'Indeferido':
        return 'status-indeferido';
      case 'Deferido':
      case 'Efetuado':
        return 'status-deferido';
      default:
        return '';
    }
  };

  const getStatusSigaaClass = (statusSigaa) => {
    switch (statusSigaa) {
      case 'Pendente':
        return 'status-pendente';
      case 'Efetuado':
        return 'status-efetuado';
      default:
        return '';
    }
  };

  const renderTableHeader = () => (
    <thead>
      <tr>
        <th>Código da Disciplina</th>
        <th>Nome da Disciplina</th>
        <th>Nome do Estudante</th>
        <th>Tipo de Solicitação</th>
        <th>Status</th>
        {role === 'RACI' && <th>Status SIGAA</th>}
        <th>Data da Solicitação</th>
        <th>Ações</th>
      </tr>
    </thead>
  );

  const renderTableRows = () => (
    solicitacoes
      .filter(solicitacao => role !== 'RACI' || solicitacao.status === 'Deferido')
      .map((solicitacao) => (
        <tr key={solicitacao.id}>
          <td>{solicitacao.codigoDisciplina}</td>
          <td>{solicitacao.nomeDisciplina}</td>
          <td>{solicitacao.nomeEstudante}</td>
          <td>{solicitacao.tipoSolicitacao}</td>
          <td className={getStatusClass(solicitacao.status)}>{solicitacao.status}</td>
          {role === 'RACI' && <td className={getStatusSigaaClass(solicitacao.statusSigaa)}>{solicitacao.statusSigaa}</td>}
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
