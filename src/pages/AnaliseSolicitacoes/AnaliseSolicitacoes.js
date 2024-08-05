import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import './AnaliseSolicitacoes.css';

const AnaliseSolicitacoes = ({ role }) => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const cursoId = localStorage.getItem('cursoId'); // Assuming you store the course ID in localStorage
        const response = await api.get(`/ajuste-matricula/curso/${cursoId}`);
        const data = response.data;

        console.log("Dados recebidos:", response.data);

        if (Array.isArray(data)) {
          // Ordenar por status "Em análise" primeiro e depois por data mais recente
          data.sort((a, b) => {
            if (a.statusSolicitacao === 'Em análise' && b.statusSolicitacao !== 'Em análise') return -1;
            if (a.statusSolicitacao !== 'Em análise' && b.statusSolicitacao === 'Em análise') return 1;
            return new Date(b.dataSolicitacao) - new Date(a.dataSolicitacao);
          });
          setSolicitacoes(data);
        } else {
          throw new Error('Dados recebidos não são uma lista');
        }
      } catch (error) {
        console.error("Erro ao obter solicitações", error);
        setError('Erro ao obter solicitações. Tente novamente.');
      }
    };

    fetchSolicitacoes();
  }, []);

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
      .filter(solicitacao => role !== 'RACI' || solicitacao.statusSolicitacao === 'Deferido')
      .map((solicitacao) => (
        <tr key={solicitacao.idAjusteMatricula}>
          <td>{solicitacao.disciplina.codigo}</td>
          <td>{solicitacao.disciplina.nome}</td>
          <td>{solicitacao.estudante?.usuario?.nome}</td>
          <td>{solicitacao.tipoSolicitacao}</td>
          <td className={getStatusClass(solicitacao.statusSolicitacao)}>{solicitacao.statusSolicitacao}</td>
          {role === 'RACI' && <td className={getStatusSigaaClass(solicitacao.statusSIGAA)}>{solicitacao.statusSIGAA}</td>}
          <td>{new Date(solicitacao.dataSolicitacao).toLocaleDateString()}</td>
          <td>
            <Button
              variant="primary"
              onClick={() => handleAnalisarSolicitacao(solicitacao.idAjusteMatricula)}
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
      {error && <Alert variant="danger">{error}</Alert>}
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
