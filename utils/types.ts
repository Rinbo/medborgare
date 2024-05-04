import { JSX } from "preact/jsx-runtime";

/* App types */
export type SessionState = { email: string; name: string; sessionId: string };

/* Simplified JSX types */

export type InputChangeEvent = JSX.TargetedEvent<HTMLInputElement, Event>;
export type InputEvent = JSX.TargetedInputEvent<HTMLInputElement>;
