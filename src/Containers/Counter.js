import '../App.css';
import React, { Component } from 'react';
import { FormApp } from '../Components/FormApp';
import {Container , Col, Button, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { showMe } from '../Store/Actions';

class Counter extends Component 
{
  constructor(props) {
    super(props);
    this.state={
      inputval : '',
      editStatus: false,
      id:''
     
    }
  }

  handleChange = (e) => 
  { 
    this.setState({ inputval : e.target.value }) 
  }

  handleEdit = (id) =>
  {  
    let index = this.props.mData.findIndex(t => t.id === id)
    this.setState({inputval: this.props.mData[index].str, editStatus:true, id:id})  
  }


  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.editStatus) {
        this.props.onEdit(this.state.id,this.state.inputval)
        this.setState({
            inputval: '',
            editStatus : false ,
          })
    }  
    else {
      let str=this.state.inputval;
      let newDate = new Date()
      this.props.onAdd({id: newDate.getTime(), str, objectStatus:false})
      this.setState({inputval: ''})
    }
  }

  handleRemove = (id) =>
   { 
    this.props.onDelete(id);  
   }
     

  handleComplete = (id) => 
  {
    this.props.onStatus(id)
    this.setState({inputval:''})
  }


  render()
  {
    console.log("mdata",this.props.mData)
    console.log('render props',this.props)

    return( 
      <div className="header1" >
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <h1 align="center"> Todo </h1>
            <input type="text" value={this.state.inputval} 
             placeholder="what's in your mind"
             onChange={this.handleChange} />
           <Button type="submit" className="button1" align="center"
                disabled={this.state.inputval === ''} >
                  {
                    <FontAwesomeIcon icon={this.props.mData.editStatus ? faCheckCircle : faCheckDouble }/>
                  }
           </Button> 
          </form>
        </div> 
        <Container>
          <Row>
            <Col sm={6}>
              <h2>Uncompleted Task</h2>
              <FormApp data={this.props.mData.filter(t => !t.objectStatus)} 
                handleEdit={this.handleEdit} 
                handleComplete={this.handleComplete}
                handleRemove={this.handleRemove}
                />
            </Col>
            <Col sm={6}>
              <h2>Completed Task</h2>
              <FormApp data={this.props.mData.filter(t => t.objectStatus )}  
                handleEdit={this.handleEdit} 
                handleComplete={this.handleComplete}
                handleRemove={this.handleRemove}
                />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state =>
{   console.log("reducer state",state);
    return {
        mData : state.data
    };
    
};

const dispatchToProps = dispatch =>
{   
 
    return {
             onAdd: (data) => dispatch({type: showMe.ADD, data: data}),
             onDelete : (id) => dispatch({type: showMe.DELETE, id: id}),
             onEdit: (id,inputval) => dispatch({type: showMe.EDIT, id: id, inputval:inputval }),
             onStatus: (id) => dispatch({type: showMe.CHECK_STATUS, id: id})
    };
}


export default connect(mapStateToProps,dispatchToProps) (Counter);
