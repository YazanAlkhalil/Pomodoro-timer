import reducer from "./redux/reducer";
import { configureStore } from "@reduxjs/toolkit";



const store = configureStore({reducer});

  export default store;