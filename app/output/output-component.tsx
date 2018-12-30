import * as React from "react";
import styled from "styled-components";

export interface IOutputComponent {
    text: number;
    icon: string;
    desc: string;
    converter(input: number): string;
}

export class OutputComponent extends React.Component<IOutputComponent, {}> {

    render() {

        const CenteredField = styled.div`
            margin: 20px auto;
            border-bottom: 1px dotted white;
            -webkit-app-region: no-drag;`;

        const OutputField = styled.div`
            font-size: 1.2em;
            padding-bottom: 10px;`;

        const text = this.props.converter(this.props.text);

        return (
            <CenteredField>
                <OutputField>
                    {text}
                </OutputField>
                {this.props.icon}
            </CenteredField>
        )
    };
}