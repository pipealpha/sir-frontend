import React, { useState, useEffect } from 'react';
import { Table, Alert } from 'react-bootstrap';
import api from '../../api';
import './Solicitacoes.css';

const Solicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const estudanteId = localStorage.getItem('estudanteId');
        // Comentado o código real para simular dados
        // const response = await api.get(`/ajuste-matricula/estudante/${estudanteId}`);
        // const data = response.data;

        // Log para verificar o formato dos dados recebidos
        //console.log("Dados recebidos:", data);

        // Simulação de dados fixos
        const data = [
          {
            idAjusteMatricula: 1,
            disciplina: {
              codigo: 'CPB1463',
              nome: 'ANÁLISE E PROJETO DE ALGORITMOS'
            },
            statusSolicitacao: 'Em análise',
            dataSolicitacao: '2024-08-02T16:30:04.008+00:00'
          },
        ];

        // Verificação mais robusta do formato dos dados recebidos
        if (Array.isArray(data)) {
          // Ordena as solicitações pela data (mais recente primeiro)
          data.sort((a, b) => new Date(b.dataSolicitacao) - new Date(a.dataSolicitacao));
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

  return (
    <div className="solicitacoes-container">
      <h2 className="text-center">Solicitações de Ajuste de Matrícula</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código da Disciplina</th>
            <th>Nome da Disciplina</th>
            <th>Status da Solicitação</th>
            <th>Data da Solicitação</th>
          </tr>
        </thead>
        <tbody>
          {solicitacoes.map((solicitacao) => (
            <tr key={solicitacao.idAjusteMatricula}>
              <td>{solicitacao.disciplina.codigo}</td>
              <td>{solicitacao.disciplina.nome}</td>
              <td className={getStatusClass(solicitacao.statusSolicitacao)}>{solicitacao.statusSolicitacao}</td>
              <td>{new Date(solicitacao.dataSolicitacao).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Solicitacoes;
