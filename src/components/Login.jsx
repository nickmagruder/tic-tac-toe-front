import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css';

function Login({ socket, register }) {
  const [name, setName] = useState({
    name: '',
  });

  useEffect(() => {
    socket.on('userNameResponse', (payload) => {
      register(payload);
    });
  });

  const submitName = () => {
    socket.emit('checkUserName', {
      name: name.name,
    });
  };
  const onNameChange = (e) => {
    setName({ name: e.target.value });
  };

  return (
    <Form>
      <Form.Group className="login-form">
        <Form.Label>Enter Your Name to Begin!</Form.Label>
        <Form.Control
          type="text"
          value={name.name}
          onChange={onNameChange}
        />
        <Form.Text className="text-muted"></Form.Text>
        <Button onClick={submitName} variant="primary" type="button">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}

export default Login;
