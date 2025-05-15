import type { MetaFunction } from "@remix-run/node";
import { NavBar } from "~/components/NavBar";
import { StickyNoteForm } from "~/components/StickyNoteForm";
import { StickyNote } from "~/components/Stickynotes";
import {
  StickyNoteTextButton,
  StickyNoteTextInput,
} from "~/components/ui-library";

export const meta: MetaFunction = () => {
  return [
    { title: "Kon2ro" },
    { name: "beskrivelse...", content: "Velkommen til Kon2ro" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen">
      <NavBar />
      <div className="flex flex-col items-center justify-center w-full">
        <StickyNote
          title="Registrer deg"
          goBack={true}
          buttonProps={{
            text: "Registrer deg her",
            onClick: () => console.log("FUNKER"),
          }}
        />
      </div>
    </div>
  );
}
