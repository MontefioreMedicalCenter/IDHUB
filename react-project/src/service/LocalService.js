//TODO: handle prefenrance persistance outside grid
import { merge } from "loadsh";

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

const isString = (value) => ({}.toString.call(value) === "[object String]");
// Dates are serialized in TZ format, example: '1981-12-20T04:00:14.000Z'
const isSerializedDate = (value) => isString(value) && ISO_DATE_RE.test(value);

const reviveSerializedData = (key, value) => {
  if (isSerializedDate(value)) {
    return new Date(value);
  }
  return value;
};

export const saveState = (state = {}, overriddenState = {}) => {
  try {
    state = merge(state, overriddenState);
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    return;
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState)
      return JSON.parse(serializedState, reviveSerializedData);
    else return {};
  } catch (err) {
    return {};
  }
};

export const clearState = () => {
  try {
    localStorage.removeItem("state");
  } catch (err) {
    return;
  }
};
