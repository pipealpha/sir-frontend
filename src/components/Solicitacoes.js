import React from 'react';
import { Table } from 'react-bootstrap';
import './Solicitacoes.css';

const Solicitacoes = () => {
  // Dados de exemplo
  const solicitacoes = [
    { codigo: 'MAT101', nome: 'Matemática Básica', status: 'Deferido', data: '2024-07-10' },
    { codigo: 'BIO202', nome: 'Biologia Avançada', status: 'Em análise', data: '2024-07-12' },
    { codigo: 'FIS303', nome: 'Física Teórica', status: 'Indeferido', data: '2024-07-11' },
  ];

  // Ordena as solicitações pela data (mais recente primeiro)
  solicitacoes.sort((a, b) => new Date(b.data) - new Date(a.data));

  return (
    <div className="solicitacoes-container">
      <h2 className="text-center">Solicitações de Ajuste de Matrícula</h2>
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
          {solicitacoes.map((solicitacao, index) => (
            <tr key={index}>
              <td>{solicitacao.codigo}</td>
              <td>{solicitacao.nome}</td>
              <td>{solicitacao.status}</td>
              <td>{new Date(solicitacao.data).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Solicitacoes;
