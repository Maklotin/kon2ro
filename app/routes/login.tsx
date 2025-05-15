import { StickyNote } from "~/components/Stickynote";
import {
  StickyNoteTextButton,
  StickyNoteTextInput,
} from "~/components/ui-library";

export default function Login() {
  return (
    <div>
      <StickyNote
        title="Logg inn"
        goBack={false}
        fields={[
          {
            component: (
              <StickyNoteTextInput
                placeholder="Epost"
                name="email"
                type="email"
                required
              />
            ),
            x: 60,
            y: 175,
          },
          {
            component: (
              <StickyNoteTextInput
                placeholder="Passord"
                name="password"
                type="password"
                required
              />
            ),
            x: 60,
            y: 255,
          },
          {
            component: (
              <StickyNoteTextButton
                onClick={() => console.log("Forgot password")}
                type="button"
              >
                Logg inn med epost
              </StickyNoteTextButton>
            ),
            x: 120,
            y: 335,
          },
          {
            component: <p className="text-5xl">eller</p>,
            x: 230,
            y: 415,
          },
          {
            component: (
              <StickyNoteTextButton
                onClick={() => console.log("Login clicked")}
                type="submit"
              >
                Logg inn med Google
              </StickyNoteTextButton>
            ),
            x: 120,
            y: 495,
          },
        ]}
        action="/api/login"
        onSubmit={(e) => {
          console.log("Login form submitted");
        }}
      />
    </div>
  );
}
