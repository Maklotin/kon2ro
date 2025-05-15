import { redirect, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { NavBar } from "~/components/NavBar";
import { session } from "~/cookies";
import { auth as serverAuth } from "~/firebase.server";


export const meta: MetaFunction = () => {
  return [
    { title: "Kon2ro" },
    { name: "beskrivelse...", content: "Velkommen til Kon2ro" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {

  const jwt = await session.parse(request.headers.get("Cookie"));

  if (!jwt) {
    return redirect("/login");
  }
  try {
    const token = serverAuth.verifySessionCookie(jwt);

    // const profile = await getUserProfile(token.uid);  

    return {
      // profile,
    };
  } catch (error) {

    return redirect("/logout");
  }
};

export default function Index() {
  return (
    <div className="flex-col h-screen ">
      <NavBar />
      <div></div>
    </div>
  );
}
