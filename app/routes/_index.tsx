import {
  type MetaFunction,
} from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Kon2ro" },
    { name: "beskrivelse...", content: "Velkommen til Kon2ro" },
  ];
};


export default function Index() {
  return (
    <div className="flex-col h-screen">
      <h2>Velkommen til Kon2ro!</h2>
    </div>
  );
}
