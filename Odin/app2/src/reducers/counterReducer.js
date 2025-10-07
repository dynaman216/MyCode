const initialState = {
  count: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log('Counter reducer received:', action);
    switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'SET_COUNT':
      return { count: action.payload };
    default:
      return state;
  }
};

export default counterReducer;
