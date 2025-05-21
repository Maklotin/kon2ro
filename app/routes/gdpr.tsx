import { Link, MetaFunction } from "@remix-run/react";
import { auth as clientAuth } from "~/firebase.client";

export const meta: MetaFunction = () => {
  return [{ title: "Personvernserklæring - Kon2ro" }];
};


export default function Gdpr() {
  const currentUser = clientAuth.currentUser;
  return (
    <div className="flex flex-col items-center h-screen  w-2/3">
      <h1>Lagring av data</h1>
      <h5 className="text-secondary-100 font-cooperblack">
        Informasjon om personvern og databehandling.
      </h5>
      <p className="text-secondary-100 font-cnew mt-4">
        Kon2ro tar personvern på alvor. Vi benytter oss blant annet av Google
        sine påloggingstjenester for å sikre at dataene dine er trygge, og av vi
        ikke får tilgang til noe annet enn eposten din og brukernavn. Ditt
        passord er utilgjengelig for oss uavhengig om du logger på med epost og
        passord eller om du logger på med Google konto.
      </p>
      <h5 className="my-4">Hva lagres?</h5>
      <p className="text-secondary-100 font-cnew mb-4">
        Det eneste som blir lagret og er tilgjengelig i våre databaser er
        følgene:
      </p>
      <ul className="list-decimal ml-4 text-secondary-100">
        <li>
          <p className="text-secondary-100 font-cnew">Bruker informasjon:</p>
          <ul className="list-disc ml-4">
            <li>
              <p className="text-secondary-100 font-cnew">
                Brukernavn / Fullt navn (hvis du bruker Google pålogging)
              </p>
            </li>
            <li>
              <p className="text-secondary-100 font-cnew">E-postadresse</p>
            </li>
            <li>
              <p className="text-secondary-100 font-cnew">
                Egen bruker ID (generert av Google når du registrerer bruker,
                den har ingen nytte utenfor Kon2ro)
              </p>
            </li>
          </ul>

          <li>
            <p className="text-secondary-100 font-cnew">Annet:</p>
            <ul className="list-disc ml-4">
              <li>
                <p className="text-secondary-100 font-cnew">Gruppenavn</p>
              </li>
              <li>
                <p className="text-secondary-100 font-cnew">Kontornavn</p>
              </li>
              <li>
                <p className="text-secondary-100 font-cnew">
                  Medlem av kontor og gruppe
                </p>
              </li>
              <li>
                <p className="text-secondary-100 font-cnew">
                  Tidspunkt i kalender
                </p>
              </li>
            </ul>
          </li>
        </li>
      </ul>
      <p className="text-secondary-100 font-cnew mt-4">
        Denne dataen er nødvendig for at Kon2ro skal funke som den skal. Om du
        ikke ønsker at denne dataen skal lagres så kan du ikke lage en bruker.
        Hvis du allerede har en bruker så kan du slette brukeren og sende epost
        til <a href="mailto:maklotin@gmail.com">maklotin@gmail.com</a> og be om
        at all data skal bli slettet.
      </p>
      <Link
        to={currentUser ? "/" : "/register"}
        className="bg-secondary-100 flex items-center p-2 rounded-md mt-12 hover:bg-secondary-hover-100 transition duration-200 hover:scale-105"
      >
        <i className="ri-arrow-left-long-line text-secondary-300 text-4xl mr-2"></i>
        <p className="font-cooperblack">Tilbake</p>
      </Link>
    </div>
  );
}
