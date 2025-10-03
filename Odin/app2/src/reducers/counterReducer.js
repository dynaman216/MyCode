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
<<<<<<< HEAD
=======
    case 'SET_COUNT':
      return { count: action.payload };
>>>>>>> d58167a232b2b7437ba0378bca6d8cca208a0db6
    default:
      return state;
  }
};

export default counterReducer;
