import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBook, FaClipboardList, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar({ isVisible, role }) {
  return (
    <div className={`sidebar ${isVisible ? 'visible' : 'collapsed'}`}>
      <ListGroup variant="flush">
        {role === 'Estudante' && (
          <>
            <ListGroup.Item as={Link} to="/solicitar-ajuste">
              <FaClipboardList className="sidebar-icon" />
              {isVisible && 'Solicitar ajuste de matrícula'}
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="/solicitacoes">
              <FaBook className="sidebar-icon" />
              {isVisible && 'Solicitações'}
            </ListGroup.Item>
          </>
        )}
        {role === 'Coordenador' && (
          <>
            <ListGroup.Item as={Link} to="/gerenciar-disciplinas">
              <FaChalkboardTeacher className="sidebar-icon" />
              {isVisible && 'Gerenciar Disciplinas'}
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="/analise-solicitacoes">
              <FaClipboardList className="sidebar-icon" />
              {isVisible && 'Análise das Solicitações'}
            </ListGroup.Item>
          </>
        )}
        {role === 'RACI' && (
          <>
            <ListGroup.Item as={Link} to="/gerenciar-cursos">
              <FaUserGraduate className="sidebar-icon" />
              {isVisible && 'Gerenciar Cursos'}
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="/gerenciar-disciplinas">
              <FaChalkboardTeacher className="sidebar-icon" />
              {isVisible && 'Gerenciar Disciplinas'}
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="/analise-solicitacoes">
              <FaClipboardList className="sidebar-icon" />
              {isVisible && 'Análise das Solicitações'}
            </ListGroup.Item>
          </>
        )}
      </ListGroup>
    </div>
  );
}

export default Sidebar;
