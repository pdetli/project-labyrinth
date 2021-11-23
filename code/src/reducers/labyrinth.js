import { createSlice } from "@reduxjs/toolkit"
import { ui } from "./ui"

export const labyrinth = createSlice({
  name: "labyrinth",
  initialState: {
    username: "",
    response: {},
  },
  reducers: {
    // get username input from the player as payload and set it here.
    setusername: (state, action) => {
      state.username = action.payload
    },

    setResponse: (state, action) => {
      state.response = action.payload
    },
  },
})

export const fetchInitialData = (username) => {
  console.log("hello")
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    fetch("https://wk16-backend.herokuapp.com/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(labyrinth.actions.setResponse(json))
        dispatch(ui.actions.setLoading(false))
      })
  }
}

export const continueLabyrinth = (type, direction) => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true))
    fetch(`https://wk16-backend.herokuapp.com/action`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: getState().labyrinth.username,
        type: type,
        direction: direction,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(labyrinth.actions.setResponse(data))
        dispatch(ui.actions.setLoading(false))
      })
  }
}
