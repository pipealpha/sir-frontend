import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import SolicitarAjusteMatricula from './components/SolicitarAjusteMatricula';
import Solicitacoes from './components/Solicitacoes';
import GerenciarDisciplinas from './components/GerenciarDisciplinas';
import AnaliseSolicitacoes from './components/AnaliseSolicitacoes';
import DetalheSolicitacao from './components/DetalheSolicitacao';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import RecuperarSenha from './components/RecuperarSenha';
import GerenciarCursos from './components/GerenciarCursos';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [role, setRole] = useState(null);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  function Layout() {
    const location = useLocation();
    const isAuthPage = location.pathname === '/' || location.pathname === '/cadastro' || location.pathname === '/recuperar-senha';

    return (
      <>
        {!isAuthPage && <Header toggleSidebar={toggleSidebar} />}
        <Container fluid className="main-container">
          <Row>
            {!isAuthPage && (
              <Col xs={sidebarVisible ? 2 : 1} id="sidebar-wrapper">
                <Sidebar isVisible={sidebarVisible} role={role} />
              </Col>
            )}
            <Col xs={isAuthPage ? 12 : sidebarVisible ? 10 : 11} id="page-content-wrapper">
              <Routes>
                <Route path="/" element={<Login setRole={setRole} />} />
                <Route path="/dashboard" element={<Dashboard role={role} />} />
                <Route path="/profile" element={<Profile role={role} />} />
                <Route path="/solicitar-ajuste" element={<SolicitarAjusteMatricula />} />
                <Route path="/solicitacoes" element={<Solicitacoes />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/recuperar-senha" element={<RecuperarSenha />} />
                <Route path="/gerenciar-disciplinas" element={<GerenciarDisciplinas />} />
                <Route path="/analise-solicitacoes" element={<AnaliseSolicitacoes role={role} />} />
                <Route path="/detalhe-solicitacao/:id" element={<DetalheSolicitacao role={role} />} />
                <Route path="/gerenciar-cursos" element={<GerenciarCursos />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
