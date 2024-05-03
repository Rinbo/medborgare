import { PageProps } from "$fresh/server.ts";
import { Globe } from "lucide-preact";
import { SessionState } from "../utils/types.ts";
import Flash, { FlashMessage } from "../islands/Flash.tsx";

type Data = { flash: FlashMessage } | undefined;

export default function Layout({ Component, state, data }: PageProps<Data, SessionState | undefined>) {
  console.info("Layout state", state);
  const flash = data?.flash;

  return (
    <div class="h-screen w-screen flex flex-col">
      {flash && <Flash flash={flash} />}
      <NavBar isLoggedIn={!!state} />
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
        <a>Item 1</a>
      </li>
      <li>
        <a>Item 2</a>
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

function NavGlobe() {
  return (
    <nav class="dropdown dropdown-hover dropdown-top fixed bottom-6 right-2 md:bottom-[10%] md:left-[50%] w-fit h-fit">
      <div
        tabIndex={0}
        role="button"
        class="btn btn-primary btn-outline btn-circle"
      >
        <Globe />
      </div>
      <ul
        tabIndex={0}
        class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content border bg-base-200 border-primary rounded-box w-52"
      >
        <li>
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </nav>
  );
}
