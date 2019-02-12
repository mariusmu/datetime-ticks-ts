import * as React from "react";
import styled from "../styled-bootstrap";
import { OutputComponent } from "../output/output-component";
import {
  getInputAsJsTick,
  convertToString,
  convertToJsTick,
  convertToCsharpTick
} from "../helpers/date-converter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { CalendarComponent } from "../calendar/calendar-component";

interface IInputComponentProps {}

interface IInputComponentState {
  jsTick: number;
  popupOpen: boolean;
  input: string;
}

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  min-width: 300px;
  padding: 10px 15px;
  border-radius: 12px;
  border: none;
  float: none;
  margin: 10px auto;
  border-bottom: 1px solid white;
  color: #18181c;
  font-size: 1.2em;
`;

const CalendarButton = styled.button`
  padding: 5px;
  background: none;
  font-size: 1.7em;
  color: cyan;
  margin-left: 0.5em;
  border: none;
`;

export class InputComponent extends React.Component<
  IInputComponentProps,
  IInputComponentState
> {
  constructor(props: IInputComponentProps) {
    super(props);
    //this.handleInput = this.handleInput.bind(this);
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
    });
  }

  render() {
    const CalendarPopup = styled.div`
      display: ${this.state.popupOpen ? "flex" : "hidden"};
      background: white 90%;
      padding: 10px;
      max-width: 320px;
      overflow: hiddem;
      position: absolute !important;
    `;

    /**
     * SVGs from npm module react-devicon
     */
    const svgJs = (
      <svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z" />
        <path
          fill="#323330"
          d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"
        />
      </svg>
    );
    const svgAtom = (
      <svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#67595D"
          d="M38.622 66.979c-.806 1.674-1.508 3.089-2.175 4.522-3.338 7.177-6.103 14.553-7.53 22.367-.794 4.346-1.228 8.724-.093 13.087.975 3.749 3.004 5.674 6.475 5.833 1.519.071 3.108-.251 4.587-.668 3.916-1.109 7.323-3.251 10.618-5.571.8-.564 1.618-.916 2.616-.545 1.768.658 2.408 3.002.917 4.115-5.381 4.009-11.076 7.466-18.049 7.68-5.711.176-9.845-2.887-11.667-8.331-1.36-4.062-1.44-8.24-.941-12.432 1.482-12.478 6.298-23.815 12.081-34.805.497-.944.527-1.694.175-2.703-1.444-4.147-2.787-8.33-4.106-12.519-.25-.794-.506-1.02-1.368-.831-5.666 1.246-11.248 2.767-16.274 5.744-1.941 1.15-3.803 2.578-5.355 4.208-2.581 2.71-2.63 5.709-.521 8.803 1.84 2.701 4.433 4.548 7.169 6.217.856.524 1.759.97 2.621 1.484 1.253.749 1.682 2.201 1.039 3.409-.645 1.209-2.092 1.688-3.406 1.012-3.844-1.976-7.429-4.321-10.304-7.611-1.762-2.016-3.053-4.282-3.48-6.968-.532-3.35.428-6.302 2.44-8.954 2.075-2.733 4.8-4.683 7.775-6.303 5.276-2.873 10.961-4.589 16.801-5.854.4-.087.796-.195 1.338-.33-.275-1.558-.57-3.07-.806-4.593-.957-6.194-1.398-12.393.123-18.567.602-2.442 1.547-4.75 3.191-6.695 3.356-3.967 7.672-4.85 12.512-3.668 4.784 1.169 8.801 3.818 12.547 6.901 1.06.872 1.089 2.447.224 3.462-.883 1.035-2.256 1.17-3.458.351-1.888-1.285-3.724-2.658-5.686-3.819-2.248-1.329-4.662-2.272-7.352-2.285-2.222-.011-3.949.893-5.215 2.693-1.604 2.283-2.177 4.917-2.48 7.618-.641 5.713.12 11.329 1.233 16.918.119.594.347.804.972.741 4.51-.45 9.021-.899 13.538-1.276.982-.081 1.623-.436 2.232-1.206 5.87-7.415 12.305-14.281 19.875-20.01 4.217-3.191 8.673-5.973 13.8-7.492 3.212-.951 6.463-1.303 9.698-.166 4.04 1.42 6.298 4.49 7.462 8.452 1.234 4.206 1.041 8.494.54 12.781a46.552 46.552 0 0 1-.528 3.277c-.281 1.478-1.377 2.261-2.853 2.089-1.342-.156-2.218-1.235-2.077-2.733.195-2.066.666-4.121.687-6.183.025-2.44-.027-4.943-.535-7.313-1.059-4.928-4.468-6.861-9.511-5.749-3.783.833-7.138 2.613-10.332 4.718-6.561 4.324-12.162 9.731-17.362 15.577-.967 1.087-1.897 2.208-2.837 3.318-.057.066-.053.184-.125.465h1.361c13.391.135 26.585 1.727 39.479 5.438 6.14 1.768 12.067 4.072 17.521 7.465 2.902 1.805 5.566 3.894 7.673 6.62 4.297 5.56 3.936 11.802-1.007 16.781-3.338 3.363-7.449 5.487-11.828 7.137-1.239.465-2.603-.218-3.077-1.405-.521-1.304.044-2.653 1.37-3.296 2.022-.98 4.125-1.829 6.037-2.993a21.078 21.078 0 0 0 4.347-3.499c2.677-2.849 2.776-5.963.506-9.151-1.7-2.388-3.984-4.134-6.44-5.66-6.06-3.766-12.71-6.099-19.557-7.92-7.138-1.899-14.39-3.224-21.755-3.748-5.869-.417-11.759-.537-17.639-.816-.849-.041-1.429.21-1.901.938-3.447 5.316-6.933 10.607-10.362 15.935-.25.388-.356 1.086-.185 1.497 5.805 13.814 13.157 26.708 22.9 38.155 4.102 4.817 8.563 9.272 13.98 12.643 2.542 1.581 5.195 2.9 8.272 3.105 2.788.188 4.822-.979 6.206-3.345 1.304-2.229 1.827-4.695 2.061-7.229.756-8.177-.861-16.064-3.005-23.87-2.196-7.996-5.304-15.654-8.865-23.136-.287-.602-.522-1.317-.491-1.965.057-1.179.987-2.018 2.15-2.2 1.022-.16 2.098.402 2.609 1.498 1.274 2.728 2.567 5.451 3.734 8.226 3.602 8.571 6.502 17.365 8.034 26.563 1.069 6.42 1.58 12.863.096 19.294a22.23 22.23 0 0 1-1.439 4.21c-2.527 5.524-7.651 8.02-13.588 6.722-4.827-1.057-8.901-3.579-12.702-6.592-6.991-5.541-12.663-12.297-17.793-19.535-5.848-8.245-10.787-17.013-14.925-26.234-.155-.343-.333-.676-.637-1.295zm-2.528-21.95l3.196 10.164c2.525-3.854 4.879-7.446 7.411-11.313l-10.607 1.149zm28.374 26.238c-4.017-.005-7.286-3.261-7.278-7.249.007-4.052 3.272-7.281 7.356-7.28 4.014.002 7.276 3.255 7.279 7.255.002 4.047-3.267 7.279-7.357 7.274z"
        />
      </svg>
    );
    const svgVisualStudio = (
      <svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path
          fill="#9B4F96"
          d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"
        />
        <path
          fill="#68217A"
          d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"
        />
        <path
          fill="#fff"
          d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6zM97 66.2l.9-4.3h-4.2v-4.7h5.1L100 51h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.4v-4.7H97zm4.8 0h3.8l.9-4.3h-3.8l-.9 4.3z"
        />
      </svg>
    );
    const windowWidth = window.innerWidth;

    return (
      <div>
        {this.state.popupOpen ? (
          <CalendarPopup>
            <CalendarComponent callbackClose={this.handleCalendarInput} />
          </CalendarPopup>
        ) : (
          ""
        )}

        <CenteredDiv>
          <h1>Convert between ticks</h1>
          <div>
            <InputField
              key="input_tick"
              onChange={this.handleInput.bind(this)}
              placeholder="Enter a tick or a date"
              value={this.state.input}
            />
            <CalendarButton onClick={this.toggleInputBox}>
              <FontAwesomeIcon icon={faCalendar} />
            </CalendarButton>
          </div>
          <OutputComponent
            icon={svgAtom}
            text={this.state.jsTick}
            desc="To string"
            converter={convertToString}
          />
          <OutputComponent
            icon={svgJs}
            text={this.state.jsTick}
            desc="JS-Tick"
            converter={convertToJsTick}
          />
          <OutputComponent
            icon={svgVisualStudio}
            text={this.state.jsTick}
            desc="dotnet-Tick"
            converter={convertToCsharpTick}
          />
        </CenteredDiv>
      </div>
    );
  }
}
