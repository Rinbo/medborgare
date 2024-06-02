import { useEffect, useState } from "preact/hooks";

export type FlashMessage = { message: string; status: FlashStatus };
export type FlashStatus = "error" | "info" | "success";

type Props = { flash?: FlashMessage; duration?: number };

export function getStatusClass(status: FlashStatus) {
  switch (status) {
    case "error":
      return "alert-error";
    case "info":
      return "alert-info";
    case "success":
      return "alert-success";
    default:
      return "alert-success";
  }
}

export default function ServerFlash({ flash, duration }: Props) {
  const [show, setShow] = useState(!!flash);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), duration ?? 3500);
    return () => clearTimeout(timeout);
  }, []);

  if (!flash) return null;

  return (
    <div className={`toast toast-bottom toast-right ${!show && "hidden"}`}>
      <div className={`alert ${getStatusClass(flash?.status)}`}>
        <span>{flash.message}</span>
      </div>
    </div>
  );
}
