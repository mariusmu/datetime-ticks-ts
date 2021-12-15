

import moment from "moment";


enum DateFormat {
    Uknown,
    JsTick,
    CSTick,
    Raw
};

const csharpEpoch = 621355968000000000;

function isRawString(input: string): boolean {
    return input.match(/([.])|([:])|([A-Za-z])/) !== null;
}

function isCsharpTick(input: string): boolean {
    if (input.length > 14) return true;
    return false;
}

export function convertToJSTickFromCsharpTick(input: string): number {
    return ((+input - csharpEpoch) / 10000);
}

function determineType(input: string): DateFormat {
    if (isRawString(input)) return DateFormat.Raw;
    if (moment(+input).isValid()) return DateFormat.JsTick;
    if (isCsharpTick(input)) return DateFormat.CSTick;
    return DateFormat.Uknown;
}

export function getInputAsJsTick(input: string): number {
    const type = determineType(input);
    switch (type) {
        case DateFormat.JsTick:
            return moment(+input).valueOf();
        case DateFormat.Raw:
            return moment(input).valueOf();
        case DateFormat.CSTick:
            return convertToJSTickFromCsharpTick(input);
        default:
            return -1;
    }
}

export function convertToCsharpTick(jsTick: number) {
    if (jsTick > -1) {
        return ((jsTick.valueOf() * 10000) + csharpEpoch).toString();
    }
    return "NaN";
   
}

export function convertToJsTick(jsTick: number) {
    if (jsTick > -1) {
        return jsTick.toString();
    }
    return "NaN";
    
}

export function convertToString(jsTick: number): string {
    return moment(jsTick).toString();
}