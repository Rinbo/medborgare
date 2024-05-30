import { useRef } from "preact/hooks";
import { Trash } from "lucide-preact";

type Props = {
  action: string;
  resource: string;
  message?: string;
  iconClass?: string;
};

export default function DeleteModal({ action, resource, message, iconClass }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <li>
        <button onClick={() => modalRef.current?.showModal()}>
          <Trash class={iconClass} />
        </button>
      </li>
      <dialog class="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="text-lg font-bold uppercase">Radera {resource}</h3>
          <p className="py-4">{message ?? `Är du säker på att du vill radera ${resource}?`}</p>
          <form method="post" action={action}>
            <div class="flex justify-between">
              <button class="btn btn-outline" type="button" onClick={() => modalRef.current?.close()}>Avbryt</button>
              <button type="submit" class="btn btn-warning">Radera</button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
