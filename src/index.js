import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";
import { DataProvider } from "./Layouts/dataContext";

const store = configureStore({ reducer: rootReducer, devTools: true });

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <DataProvider>
      <React.Fragment>
        <BrowserRouter basename={"/"}>
          <App />
        </BrowserRouter>
      </React.Fragment>
    </DataProvider>
  </Provider>
);
