import { PageProps } from "$fresh/server.ts";
import { Globe, Landmark } from "lucide-preact";
import { OptionalSessionState } from "types";
import ServerFlash, { FlashMessage } from "../islands/ServerFlash.tsx";
import { LogoutButton } from "./logout.tsx";
import { ROUTES } from "route-utils";
import ClientFlash from "islands/ClientFlash.tsx";
import FlashProvider from "islands/FlashProvider.tsx";

export default function Layout({ Component, state }: PageProps<void, OptionalSessionState>) {
  return (
    <FlashProvider>
      <div class="flex h-screen w-screen flex-col">
        <ServerFlash flash={state.flash} />
        <ClientFlash />
        <NavBar isLoggedIn={!!state?.sessionId} />
        <div class="grow">
          <Component />
        </div>
        <footer className="footer footer-center bg-base-300 p-2 font-mono text-base-content">
          <aside>
            <p>borjessons.dev</p>
          </aside>
        </footer>
      </div>
    </FlashProvider>
  );
}

function NavBar({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <nav className="navbar">
      <div className="flex-1 px-2 lg:flex-none">
        <a className="btn btn-ghost text-lg" href={ROUTES.root}>
          <Landmark /> Medborgare
        </a>
      </div>
      <div className="flex flex-1 justify-end px-2">
        <div className="flex items-stretch">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-circle btn-outline">
              <Globe />
            </div>
            {isLoggedIn ? <SessionLinks /> : <AnonomousLinks />}
          </div>
        </div>
      </div>
    </nav>
  );
}

function SessionLinks() {
  return (
    <ul tabIndex={0} className="menu dropdown-content z-20 mt-4 w-64 rounded-box border border-primary bg-base-100 p-2 shadow">
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
    <ul tabIndex={0} className="menu dropdown-content z-20 mt-4 w-64 rounded-box border border-primary bg-base-100 p-2 shadow">
      <li>
        <a href={ROUTES.login}>Sign In</a>
      </li>
      <li>
        <a>Item 2</a>
      </li>
    </ul>
  );
}
