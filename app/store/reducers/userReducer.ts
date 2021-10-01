const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      throw new Error(`🔍❌ Action '${action.type}' not found`);
  }
};

export default userReducer;
