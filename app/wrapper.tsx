import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { InputComponent } from "./input/input-component";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./styled-bootstrap";

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
                    <InlineWrapper>
                        <BrowserRouter>
                            <Route path="/" component={InputComponent} />
                        </BrowserRouter>
                    </InlineWrapper>
                </div>
            </ThemeProvider>
        );
    }
}