import { useRef } from "preact/hooks";
import { Trash } from "lucide-preact";
import { useSignal } from "@preact/signals";
import Spinner from "components/Spinner.tsx";

type Props = {
  action: string;
  resource: string;
  message?: string;
  iconClass?: string;
};

export default function DeleteModal({ action, resource, message, iconClass }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const loading = useSignal(false);

  function onSubmit() {
    loading.value = true;
  }

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
          <form method="post" action={action} onSubmit={onSubmit}>
            <div class="flex justify-between">
              <button class="btn btn-outline" type="button" onClick={() => modalRef.current?.close()}>Avbryt</button>
              <button disabled={loading.value} type="submit" class="btn btn-warning">Radera</button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
        {loading.value && <Spinner />}
      </dialog>
    </>
  );
}
