import React from 'react';
import '../App.css';
import { Button , Col, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faCheckSquare, faAd } from '@fortawesome/free-solid-svg-icons'


export  const FormApp = props => { 
     return(
           <div>
              <ul>
                 { props.data.map((item, index) => {
                    return (
                      <li key={index}>
                        <Row>
                            <Col sm={9}>
                            <span style={{ textDecoration : !item.objectStatus ?
                            'none' : 'line-through' }}>
                                {item.str}
                            </span>
                            </Col>    
                                <Col sm={1}>
                                <Button className="button1" onClick={() => props.handleComplete(item.id)}>
                                    {
                                    <FontAwesomeIcon icon={ !props.data[index].objectStatus ? faCheckSquare : faAd }/> 
                                    }    
                                </Button> 
                                </Col>
                                <Col sm={1}>
                                <Button className="button1" onClick={() => props.handleRemove(item.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                </Button>
                                </Col>
                                <Col sm={1}>          
                                <Button className="button1" onClick={() => props.handleEdit(item.id)}>                     
                                    <FontAwesomeIcon icon={faEdit}/>
                                </Button>
                                </Col>            
                                    </Row>
                              </li>
                            );                
                      })}
                 </ul>
           </div>                           
  );         
 }         
    