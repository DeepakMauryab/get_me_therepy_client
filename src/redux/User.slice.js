import {createSlice} from '@reduxjs/toolkit';

const User = createSlice({
  name: 'user',
  initialState: {user: null},
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = null;
    },
  },
});

export default User.reducer;
export const {addUser, removeUser} = User.actions;
