import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import './Profile.css';

function Profile({ role }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let response;
        const userId = localStorage.getItem('usuarioId'); // Obtendo o id do usuário
        const token = localStorage.getItem('token'); // Token de autenticação
        const estudanteId = localStorage.getItem('estudanteId');
        
        // Configurar o cabeçalho de autorização
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        if (role === 'Estudante') {
          response = await api.get(`/estudantes/${estudanteId}`, config);
          console.log('Estudante data:', response.data);
          const estudanteData = response.data;
          if (estudanteData && estudanteData.usuario) {
            setName(estudanteData.usuario.nome);
            setEmail(estudanteData.usuario.email);
            setMatricula(estudanteData.matricula);
            setCourse(estudanteData.curso.nome);
            setYear(estudanteData.anoSemestreIngresso);
          } else {
            setError('Dados do estudante estão incompletos.');
          }
        } else {
          response = await api.get(`/usuarios/${userId}`, config);
          console.log('Usuario data:', response.data);
          const usuarioData = response.data;
          if (usuarioData) {
            setName(usuarioData.nome);
            setEmail(usuarioData.email);
          } else {
            setError('Dados do usuário estão incompletos.');
          }
        }
      } catch (error) {
        console.error("Erro ao carregar perfil", error);
        setError('Erro ao carregar perfil. Tente novamente.');
      }
    };

    fetchProfile();
  }, [role]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        nome: name,
        email: email,
        senha: password,
        confirmarSenha: confirmPassword,
      };

      if (role === 'Estudante') {
        updatedData.matricula = matricula;
        updatedData.curso = course;
        updatedData.anoSemestreIngresso = year;
      }

      const userId = localStorage.getItem('usuarioId');
      const token = localStorage.getItem('token'); // Token de autenticação
      const estudanteId = localStorage.getItem('estudanteId');
      
      // Configurar o cabeçalho de autorização
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      if (role === 'Estudante') {
        await api.put(`/estudantes/${estudanteId}`, updatedData, config);
      } else {
        await api.put(`/usuarios/${userId}`, updatedData, config);
      }

      navigate('/dashboard');
    } catch (error) {
      console.error("Erro ao salvar perfil", error);
      setError('Erro ao salvar perfil. Tente novamente.');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="profile-container">
      <Form className="profile-form" onSubmit={handleSave}>
        <h2>Perfil</h2>
        {error && <Alert variant="danger">{error}</Alert>}
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

        {role === 'Estudante' && (
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

        <Button variant="primary" type="submit" className="mr-2">
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
