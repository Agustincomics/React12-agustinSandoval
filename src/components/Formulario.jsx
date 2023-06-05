import React from 'react';
import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
const Formulario = () => {
    const [ciudad, setCiudad] = useState('');
    const [pais, setPais] = useState('');
    const [tiempo, setTiempo] = useState(null);
    const [error, setError] = useState('');

    const apiKey = 'cec11ffcf0c3427597ccb2e69e679114';

    const handleCiudadChange = (e) => {
        setCiudad(e.target.value);
    };

    const handlePaisChange = (e) => {
        setPais(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (ciudad.trim() === '' || pais.trim() === '') {
        setError('Debes ingresar una ciudad y un país');
        setTiempo(null);
        return;
        }
        setError('');
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&lang=sp&appid=${apiKey}&units=metric`).then((respuesta) => respuesta.json())
            .then((dato) => {
              if (dato.error) {
                setError('No se encontraron datos de la ubicación ingresada');
                setTiempo(null);
              } else {
                setTiempo(dato);
                setError('');
              }
            })
            .catch((error) => {
              console.log(error);
              setError('Ocurrió un error al consultar el clima');
              setTiempo(null);
            });
        };

    return (
        <Container className="App">
        <h1>API de Clima</h1>
        <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3 d-flex">
                <Form.Control type="text" placeholder='Ingrese la ciudad'
                id="ciudad"
                value={ciudad}
                onChange={handleCiudadChange}>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3 d-flex">
                <Form.Control type="text" placeholder='Ingrese el pais'
                id="pais"
                value={pais}
                onChange={handlePaisChange}>
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='danger'>Buscar</Button>
        </Form>
        {error && <p>{error}</p>}
        {tiempo && (
            <div>
            <h2>Resultado:</h2>
            <p>Ubicación: {tiempo.name}, {tiempo.country}</p>
            <p>Temperatura: {tiempo.main.temp} °C</p>
            <p>Humedad: {tiempo.main.humidity}%</p>
            <p>Descripción: {tiempo.weather.description}</p>
            </div>
        )}
        </Container>
    );
    };


export default Formulario;