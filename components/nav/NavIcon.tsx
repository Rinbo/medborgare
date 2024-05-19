import { VNode } from "https://esm.sh/v128/preact@10.19.6/src/index.js";

type Props = {
  href: string;
  icon?: VNode<LinkStyle>;
  tooltip?: string;
  class?: string;
};

export default function NavIcon(props: Props) {
  return (
    <li class={props.class}>
      <a class="tooltip" data-tip={props.tooltip} href={props.href}>
        {props.icon}
      </a>
    </li>
  );
}
