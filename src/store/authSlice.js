import { createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name:'auth',
  initialState: {
    status: 'not-authenticated',
    uid: null,
    email: null,
    errorMessage: null, 
  },

  reducers: {
    login : (state, action) =>{
      const {uid, email} = action.payload 
      state.status = 'authenticated'
      state.uid = uid
      state.email = email
      state.errorMessage = null

    },
    logout:  (state, action) => {
      state.status = 'not-authenticated'
      state.uid = null
      state.email = null
      state.errorMessage = action.payload?.errorMessage || null
    },
    checkingCredentials: (state) => {
       state.status = 'checking'

    },
  }
})

export const { login, logout,  checkingCredentials} = authSlice.actions;
