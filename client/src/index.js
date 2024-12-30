import React from "react";
import ReactDOM from "react-dom";
import StudentManagement from "./StudentManagement";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider } from "react-redux"; // Thêm import Provider
import store from "./redux/store"; // Đảm bảo đường dẫn tới store chính xác

ReactDOM.render(
    <Provider store={store}>
        <StudentManagement />
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
