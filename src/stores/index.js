import createStore from "./create";

const store = createStore({preloadedState: window.__PRELOADED_STATE__.store})

export default store