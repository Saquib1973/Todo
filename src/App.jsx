import Todo from "./pages/Todo";
import React from "react";
import { Provider } from "react-redux";
import store from "./Redux/store";

const App = () => {
    return (
        <Provider store={store}>
            <Todo />
        </Provider>
    )
}

export default App;