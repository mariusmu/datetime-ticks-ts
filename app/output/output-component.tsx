import * as React from "react";
import styled from "styled-components";

export interface IOutputComponent {
    text: number;
    icon: JSX.Element;
    desc: string;
    converter(input: number): string;
}

export class OutputComponent extends React.Component<IOutputComponent, {}> {

    render() {
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

        const text = this.props.converter(this.props.text);
    

        return (
            <CenteredField>
                <OutputField>
                    <TextField>{text}</TextField>
                </OutputField>
                {this.props.icon}
             </CenteredField>
        )
    };
}