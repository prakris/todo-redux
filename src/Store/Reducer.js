import { showMe } from './Actions';

const initialState={
    data: []
}


const reducer= ( state= initialState , action) =>
{
  switch(action.type)
  {
      case showMe.ADD :
              let newData= Object.assign(state.data);
                  newData =  newData.concat(action.data);
                  return Object.assign({}, state, {
                    data: newData,
                  })
              
      case showMe.DELETE :
                    let newArr=Object.assign(state.data);
                        newArr=newArr.filter(t => t.id !== action.id ) 
                        return Object.assign({},state, {
                          data: newArr
                        })  

      case showMe.EDIT :
              let newData1= Object.assign(state.data);
              let editData= newData1.find(cd=>cd.id === action.id)
              editData.str= action.inputval;
              return Object.assign({}, state, {
                data : newData1
              })
      
      case showMe.CHECK_STATUS : 
              let newCom=Object.assign(state.data)
              let changeStatus= newCom.find(cd=> cd.id === action.id)
              changeStatus.objectStatus = !changeStatus.objectStatus;
              return Object.assign({}, state, {
                data: newCom
              })
       
  }
  return state
}

export default reducer;