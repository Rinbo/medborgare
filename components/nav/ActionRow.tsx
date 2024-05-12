import { ComponentChildren } from "https://esm.sh/v128/preact@10.19.6/src/index.js";

type Props = {
  children: ComponentChildren;
};

export default function ActionRow(props: Props) {
  return (
    <nav class="rounded-lg border">
      <ul class="menu menu-horizontal menu-xs flex">
        {props.children}
      </ul>
    </nav>
  );
}
