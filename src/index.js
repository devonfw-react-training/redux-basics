const initialState = {
  counter: 0
}
const loggerMiddleware = store => next => action => {
  console.group(action.type)
  console.info("dispatching", action)
  next(action)
  console.log("next state", store.getState())
  console.groupEnd()
}

const reducer = (state = initialState, action) => {
  if (action.type === "INCREMENT") {
    return {
      ...state,
      counter: state.counter + 1
    }
  }
  if (action.type === "DECREMENT") {
    return {
      ...state,
      counter: state.counter - 1
    }
  }
  return state
}

const store = Redux.createStore(
  reducer,
  Redux.applyMiddleware(loggerMiddleware)
)

document.getElementById("inc").addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT" })
})
document.getElementById("dec").addEventListener("click", () => {
  store.dispatch({ type: "DECREMENT" })
})

const updateView = () => {
  document.getElementById("counter").innerHTML = store.getState().counter
}

store.subscribe(updateView)

updateView()
