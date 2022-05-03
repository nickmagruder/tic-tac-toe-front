import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function EnterName({ socket, register, handleSocket }) {
  const [name, setName] = useState({
    name: 'Enter Your Name',
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
      <Form.Group>
        <Form.Label>Enter Your Name</Form.Label>
        <Form.Control
          type="text"
          value={name.name}
          onChange={onNameChange}
          placeholder="Your Name"
        />
        <Form.Text className="text-muted">Enter Your Name</Form.Text>
        <Button
          onClick={submitName}
          variant="primary"
          type="button"
        >
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}

export default EnterName;
