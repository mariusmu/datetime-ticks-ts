import * as React from "react";
import styled from "styled-components";
import { icon } from "@fortawesome/fontawesome-svg-core";

export interface IOutputComponent {
    text: number;
    icon: JSX.Element;
    desc: string;
    converter(input: number, windowWidth: number): string;
}

export class OutputComponent extends React.Component<IOutputComponent, {}> {

    render() {
        const windowWidth = window.innerWidth;
        const TextField = styled.div`margin-top: 6px;`;

        const CenteredField = styled.div`
            margin: 20px auto;
            border-bottom: 1px dotted white;
            -webkit-app-region: no-drag;`;

        const OutputField = styled.div`
            font-size: 1.2em;
            float: left;
            margin-right: 20px;
            padding-bottom: 10px;`;

        const text = this.props.converter(this.props.text, windowWidth);
    
        const shouldRemoveIcon = (windowWidth < 600 && this.props.desc === "To string");
        return (
            <CenteredField>
                <OutputField>
                    <TextField>{text}</TextField>
                </OutputField>
                {shouldRemoveIcon ? "" : this.props.icon}
             </CenteredField>
        )
    };
}