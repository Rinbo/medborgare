import { getStatusClass } from "islands/ServerFlash.tsx";
import { useClientFlash } from "../hooks/useClientFlash.ts";

export default function ClientFlash() {
  const { state } = useClientFlash();

  if (!state.shouldDisplay) return null;

  const { message, status } = state;

  return (
    <div className={"toast-right toast toast-bottom"}>
      <div className={`alert ${getStatusClass(status)}`}>
        <span>{message}</span>
      </div>
    </div>
  );
}
