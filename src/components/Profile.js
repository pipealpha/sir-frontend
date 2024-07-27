import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile({ role }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulação para pegar os dados do usuário logado. Ajuste conforme necessário.
    if (role === 'estudante') {
      setMatricula('202012345');
      setCourse('Engenharia de Software');
      setYear('2020/2');
    }
    setName('João Silva');
    setEmail('joao.silva@example.com');
  }, [role]);

  const handleSave = (e) => {
    e.preventDefault();
    // Implementar lógica para salvar as informações
    console.log('Informações salvas:', { name, email, matricula, course, year, password });
  };

  const handleCancel = () => {
    // Implementar lógica para cancelar as alterações
    navigate('/dashboard');
  };

  return (
    <div className="profile-container">
      <Form className="profile-form">
        <h2>Perfil</h2>
        <Form.Group controlId="formName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
        </Form.Group>

        {role === 'estudante' && (
          <>
            <Form.Group controlId="formMatricula">
              <Form.Label>Matrícula</Form.Label>
              <Form.Control
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="Digite sua matrícula"
              />
            </Form.Group>

            <Form.Group controlId="formCourse">
              <Form.Label>Curso</Form.Label>
              <Form.Control
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Digite seu curso"
              />
            </Form.Group>

            <Form.Group controlId="formYear">
              <Form.Label>Ano/Semestre de Ingresso</Form.Label>
              <Form.Control
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Digite o ano/semestre de ingresso"
              />
            </Form.Group>
          </>
        )}

        <Form.Group controlId="formPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirmação de Senha</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
          />
        </Form.Group>

        <Form.Group controlId="formRole">
          <Form.Label>Perfil</Form.Label>
          <Form.Control
            type="text"
            value={role}
            readOnly
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSave} className="mr-2">
          Salvar
        </Button>
        <Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
      </Form>
    </div>
  );
}

export default Profile;
