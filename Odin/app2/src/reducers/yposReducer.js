const initialState = {
  ypos: 0.0,
};

const yposReducer = (state = initialState, action) => {
  console.log('Ypos reducer received:', action);
    switch (action.type) {
    case 'SET_YPOS':
      return { ypos: action.payload };
    default:
      return state;
  }
};

export default yposReducer;
