import * as React from "react";
import styled from "../styled-bootstrap";
import { OutputComponent } from "../output/output-component";
import { getInputAsJsTick, convertToString, convertToJsTick, convertToCsharpTick } from "../helpers/date-converter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { CalendarComponent } from "../calendar/calendar-component";

interface IInputComponentProps {
}

interface IInputComponentState {
    jsTick: number;
    popupOpen: boolean;
    input: string;
}

export class InputComponent extends React.Component<IInputComponentProps, IInputComponentState>{
    constructor(props: IInputComponentProps) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.toggleInputBox = this.toggleInputBox.bind(this);
        this.state = { jsTick: -1, popupOpen: false, input: "" };
        this.handleCalendarInput = this.handleCalendarInput.bind(this);

    }

    public handleInput(event: any) {
        if (event.target.value === undefined) {
            return;
        }
        const getAsJsTick = getInputAsJsTick(event.target.value);
        this.setState({ jsTick: getAsJsTick, input: event.target.value });
        return getAsJsTick;
    }

    public toggleInputBox() {
        this.setState({ popupOpen: !this.state.popupOpen });
    }

    handleCalendarInput(date: string) {
        if (date === undefined) {
            return;
        }
        this.setState({
            jsTick: new Date(date).getTime(),
            popupOpen: false,
            input: date
        })
    }

    render() {
        const CenteredDiv = styled.div`
            display: flex;
            flex-direction: column;`;

        const InputField = styled.input`
        min-width: 300px;
        padding: 10px 15px;
        border-radius: 12px;
        border: none;
        float: none;
        margin: 10px auto;
        border-bottom: 1px solid white;
        color: #18181c;
        font-size: 1.2em`;

        const CalendarButton = styled.button`
        padding: 5px;
        background: none;
        font-size: 1.7em;
        color: cyan;
        margin-left: 0.5em;
        border: none;`;

        const CalendarPopup = styled.div`
        display: ${this.state.popupOpen ? "flex" : "hidden"};
        background: white 90%;    
        padding: 10px;
        max-width: 320px;
        overflow: hiddem;
        position: absolute !important;`;

        return (
            <div>
                {this.state.popupOpen ?
                    <CalendarPopup>
                        <CalendarComponent callbackClose={this.handleCalendarInput} />
                    </CalendarPopup>
                    : ""}

                <CenteredDiv>
                    <h1>Convert between ticks</h1>
                    <div>
                        <InputField onChange={this.handleInput} value={this.state.input} />
                        <CalendarButton onClick={this.toggleInputBox}>
                            <FontAwesomeIcon icon={faCalendar} />
                        </CalendarButton>
                    </div>
                    <OutputComponent icon="" text={this.state.jsTick} desc="To string" converter={convertToString} />
                    <OutputComponent icon="" text={this.state.jsTick} desc="JS-Tick" converter={convertToJsTick} />
                    <OutputComponent icon="" text={this.state.jsTick} desc="dotnet-Tick" converter={convertToCsharpTick} />
                </CenteredDiv>
            </div>
        );
    }
}