import React from "react"
import ReactDOM from "react-dom/client"
import WrapperComponent from './wrapper';
import './additional-styles.css';

const root = ReactDOM.createRoot(document.getElementById("app") as any);
root.render(<WrapperComponent/>);