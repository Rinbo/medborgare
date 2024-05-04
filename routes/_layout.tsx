import { PageProps } from "$fresh/server.ts";
import { Globe } from "lucide-preact";
import { SessionState } from "../utils/types.ts";
import Flash, { FlashMessage } from "../islands/Flash.tsx";
import { LogoutButton } from "./logout.tsx";

type Data = { flash: FlashMessage } | undefined;

export default function Layout({ Component, state, data }: PageProps<Data, SessionState | undefined>) {
  console.info("Layout state", state);

  return (
    <div class="h-screen w-screen flex flex-col">
      {data?.flash && <Flash flash={data.flash} />}
      <NavBar isLoggedIn={!!state?.sessionId} />
      <div class="grow">
        <Component />
      </div>
      <footer className="footer footer-center p-2 bg-base-300 text-base-content font-mono">
        <aside>
          <p>Copyright © 2024 - borjessons.dev</p>
        </aside>
      </footer>
    </div>
  );
}

function NavBar({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="navbar bg-base-300 rounded-box">
      <div className="flex-1 px-2 lg:flex-none">
        <a className="text-lg font-bold" href="/">Medborgare</a>
      </div>
      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-primary btn-circle">
              <Globe />
            </div>
            {isLoggedIn ? <SessionLinks /> : <AnonomousLinks />}
          </div>
        </div>
      </div>
    </div>
  );
}

function SessionLinks() {
  return (
    <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-200 border border-primary rounded-box w-52 mt-4">
      <li>
        <LogoutButton />
      </li>
      <li>
        <a href="/test/Göteborg">Göteborg</a>
      </li>
    </ul>
  );
}

function AnonomousLinks() {
  return (
    <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-200 border border-primary rounded-box w-52 mt-4">
      <li>
        <a href="/signin">Signin</a>
      </li>
      <li>
        <a>Item 2</a>
      </li>
    </ul>
  );
}
