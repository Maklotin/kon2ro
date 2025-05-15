import type { MetaFunction } from "@remix-run/node";
import { NavBar } from "~/components/NavBar";
import { StickyNote } from "~/components/Stickynote";

export const meta: MetaFunction = () => {
  return [
    { title: "Kon2ro" },
    { name: "beskrivelse...", content: "Velkommen til Kon2ro" },
  ];
};

export default function Index() {
  return (
    <div className="flex-col h-screen ">
      <NavBar />
      <div className="flex flex-col items-center justify-center w-full">
      </div>
    </div>
  );
}
