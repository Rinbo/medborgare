import { JSX } from "preact/jsx-runtime";

/* App types */
export type SessionState = { email: string; name: string; sessionId: string };
export type OptionalSessionState = SessionState | EmptyObject;

/* Utility types */
export type EmptyObject = Record<string | number | symbol, never>;

/* Simplified JSX types */

export type InputChangeEvent = JSX.TargetedEvent<HTMLInputElement, Event>;
export type InputEvent = JSX.TargetedInputEvent<HTMLInputElement>;
export type KeyboardEvent = JSX.TargetedKeyboardEvent<HTMLFormElement>;
export type FormSubmitEvent = JSX.TargetedSubmitEvent<HTMLFormElement>;
export type TargetedEvent = JSX.TargetedEvent<HTMLFormElement, Event>;
export type FocusEvent = JSX.TargetedFocusEvent<HTMLInputElement>;
export type FocusAreaEvent = JSX.TargetedFocusEvent<HTMLTextAreaElement>;
