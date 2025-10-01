const initialState = {
  xpos: 0.0,
};

const xposReducer = (state = initialState, action) => {
  console.log('Xpos reducer received:', action);
    switch (action.type) {
    case 'SET_XPOS':
      return { xpos: action.payload };
    default:
      return state;
  }
};

export default xposReducer;
