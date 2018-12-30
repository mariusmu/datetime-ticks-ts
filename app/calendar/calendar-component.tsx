import * as React from "react";
import * as Flatpickr from 'react-flatpickr';
import styled from "../styled-bootstrap";
import 'flatpickr/dist/themes/material_green.css'
import '../additional-styles.css';
const moment = require("moment");

interface ICalendarProps {
    callbackClose: (date: string) => void
}

interface ICalendarState {
    date: Date;
}

export class CalendarComponent extends React.Component<ICalendarProps, ICalendarState> {

    constructor(props: ICalendarProps) {
        super(props);
        this.state = { date: undefined as any };
    }

    render() {
        const DatePicker = Flatpickr.default;
        const self = this;

        const StyledButton = styled.button `
            float: none;
            padding: 7px 10px;
            margin-top: 20px;
            background: white;
            border-radius: 10px;    
        `;

        return (
            <div>
                <DatePicker data-enable-time onChange={(date) => self.setState({ date: date[0]})} options={{ inline: true, static: true, altInputClass: "input-hidden" }} />
                <StyledButton onClick={() => self.props.callbackClose(moment(this.state.date).toString())}>
                Choose date
                </StyledButton>
            </div>
        );
    }
}