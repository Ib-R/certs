const initialState = {
    test: 'Redux is working....',
    data:null
}

const certReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD':
        break;
    case 'EDIT':
        return state = {
            ...state,
            name: action.payload
        };
    case 'SHOW_CERTS':
        return state ={
            ...state,
            data: action.payload
        }
    case 'DELETE':
        break;
  }
  return state;
}

export default certReducer;
