// reducers/stringReducer.js
const initialState = {
  text: '',
};

const stringReducer = (state = initialState, action) => {
  console.log('String reducer received:', action);
    switch (action.type) {
    case 'SET_TEXT':
      return { text: action.payload };
    case 'CLEAR_TEXT':
      return { text: '' };
    default:
      return state;
  }
};

export default stringReducer;
