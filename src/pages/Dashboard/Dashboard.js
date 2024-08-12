import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ role }) {
  return (
    <Container className="dashboard">
      <div className="text-center">
        <h1>Bem-vindo(a) ao SIR</h1>
        <p>Sistema de Requerimentos</p>
      </div>
      <Row className="justify-content-center">
        {role === 'Estudante' && (
          <>
            <Col md={4}>
              <Card className="custom-card text-center" as={Link} to="/solicitar-ajuste">
                <Card.Body>
                  <Card.Title>
                    <i className="bi bi-pencil-square"></i> Solicitar ajuste de matrícula
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="custom-card text-center" as={Link} to="/solicitacoes">
                <Card.Body>
                  <Card.Title>
                    <i className="bi bi-file-earmark-text"></i> Solicitações
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
        {role === 'Coordenador' && (
          <>
            <Col md={4}>
              <Card className="custom-card text-center" as={Link} to="/gerenciar-disciplinas">
                <Card.Body>
                  <Card.Title>
                    <i className="bi bi-journal"></i> Gerenciar Disciplinas
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="custom-card text-center" as={Link} to="/analise-solicitacoes">
                <Card.Body>
                  <Card.Title>
                    <i className="bi bi-clipboard-check"></i> Análise das Solicitações
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
        {role === 'RACI' && (
          <>
            <Col md={4}>
              <Card className="custom-card text-center" as={Link} to="/gerenciar-cursos">
                <Card.Body>
                  <Card.Title>
                    <i className="bi bi-layers"></i> Gerenciar Cursos
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="custom-card text-center" as={Link} to="/gerenciar-disciplinas">
                <Card.Body>
                  <Card.Title>
                    <i className="bi bi-journal"></i> Gerenciar Disciplinas
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="custom-card text-center" as={Link} to="/analise-solicitacoes">
                <Card.Body>
                  <Card.Title>
                    <i className="bi bi-clipboard-check"></i> Análise das Solicitações
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export default Dashboard;
