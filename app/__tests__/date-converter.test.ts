import { convertToCsharpTick, convertToJsTickFromUnixTick, convertToString } from "../helpers/date-converter";
import { convertToJSTickFromCsharpTick, convertToUnixTick } from "../helpers/date-converter";

test("convert to c# tick from js date 2020-04-28 00:00 UTC", () => {
    expect(convertToCsharpTick(1588032000000)).toBe("637236288000000000")
});

test("convert to c# tick from js date 2020-12-15 00:00 UTC", () => {
    expect(convertToCsharpTick(1607990400000)).toBe("637435872000000000")
});

test("convert to js tick from c# date 2020-04-28 00:00 UTC", () => {
    expect(convertToJSTickFromCsharpTick("637236288000000000")).toBe(1588032000000);
});

test("convert to js tick from c# date 2020-12-15 00:00 UTC", () => {
    expect(convertToJSTickFromCsharpTick("637435872000000000")).toBe(1607990400000);
});

test("convert to javascript human readable date string 2020-04-28 UTC", () => {
    expect(convertToString(1588032000000)).toBe("Tue Apr 28 2020 02:00:00 GMT+0200");
});

test("convert to javascript human readable date string 2020-12-15", () => {
    expect(convertToString(1607990400000)).toBe("Tue Dec 15 2020 01:00:00 GMT+0100");
});

test("convert to unix tick from jstick date 2020-12-15 00:00 UTC", () => {
    expect(convertToUnixTick(1607990400000)).toBe(1607990400);
});

test("convert to js tick from unix tick date 2020-12-15 00:00 UTC", () => {
    expect(convertToJsTickFromUnixTick(1607990400)).toBe(1607990400000);
});
