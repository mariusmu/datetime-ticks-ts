import React from "react"
import ReactDOM from "react-dom"
import WrapperComponent from './wrapper';
import 'react-app-polyfill/ie11';
import './additional-styles.css';

ReactDOM.render(
    <WrapperComponent />
, document.getElementById("app"));
