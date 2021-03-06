import { Button, Form, Row, Col, Alert } from 'react-bootstrap';
import useCategorias from '../hooks/useCategorias';
import useBebidas from '../hooks/useBebidas';
import {useState} from 'react';

const Formulario = () => {
    const {categorias} = useCategorias();
    const {obtenerBebidas} = useBebidas();
    const [alerta, setAlerta] = useState("");
    const [busqueda, setBusqueda] = useState({
        nombre: '',
        categoria: '',
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        if(Object.values(busqueda).includes("")){
           setAlerta("Todos los campos son obligatorios");
           return;
        }
        setAlerta("");
        obtenerBebidas(busqueda);
    }
  return (
    <Form onSubmit={handleSubmit}>
        {alerta && <Alert variant="danger" className="text-center">{alerta}</Alert>}
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nombre">Nombre Bebidas</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder='Ej: Tequila, Vodka, etc'
                        id="nombre"
                        name="nombre"
                        onChange={e => setBusqueda({
                            ...busqueda,
                            [e.target.name] : e.target.value 
                        })}
                        value={busqueda.nombre}
                    />
                    
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="mb-3">
                        <Form.Label htmlFor="categoria">Categoria Bebida</Form.Label>
                        <Form.Select 
                            id="categoria" 
                            name="categoria" 
                            onChange={e => setBusqueda({
                                ...busqueda,
                                [e.target.name] : e.target.value 
                            })}
                            value={busqueda.categoria}
                        > 
                        <option >Seleciona categoria</option>
                        {categorias.map(categoria => <option key={categoria.strCategory} value={categoria.strCategory}>{categoria.strCategory}</option>) }
                    </Form.Select>                
                </Form.Group>
            </Col>
        </Row>
        <Row className='justify-content-end'>
            <Col md={3}>
                <Button
                    variant="danger"
                    className='text-uppercase w-100'
                    type="submit"
                >Buscar Bebidas</Button>
            </Col>
        </Row>
    </Form>
   
  )
}

export default Formulario