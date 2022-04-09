import * as React from "react";
import {
    Routes,
    Route,
    Link,
    Outlet,
    Router
  } from "react-router-dom";
import { InputComponent } from "./input/input-component";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./styled-bootstrap";
import { BrowserRouter } from "react-router-dom";


interface IWrapperProps {

}

const wrapperStyle = {
    background: "#18181c",
    width: "100%",
    height: "100vh",
    "paddingTop": "50px",
    display: "flex",
    "padding": "0px"
};

const InlineWrapper = styled.div`
    margin: 0 auto;
    overflow: hidden;

`;

export default class WrapperComponent extends React.Component<IWrapperProps, {}> {
    public render() {
        return (
            <ThemeProvider theme={theme}>
                <div style={wrapperStyle}>
                    <BrowserRouter>
                        <InlineWrapper>
                            <Routes>
                                <Route path="/" element={<InputComponent/>} />
                            </Routes>
                        </InlineWrapper>
                    </BrowserRouter>
                </div>
            </ThemeProvider>
        );
    }
}