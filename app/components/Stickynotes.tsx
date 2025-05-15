import {
  GoBackButton,
  StickyNoteTextButton,
  StickyNoteTextInput,
} from "./ui-library";

export type StickyNoteButtonProps = {
  className?: string;
  text: string;
  onClick: () => void;
};

export const StickyNote = ({
  className,
  title,
  buttonProps,
  goBack,
}: {
  className?: string;
  title?: string;
  buttonProps?: StickyNoteButtonProps;
  goBack?: boolean;
}) => {
  return (
    <svg
      width="582"
      height="579"
      viewBox="0 0 582 579"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_d_5_238)">
        <rect
          x="0.950562"
          y="67.5704"
          width="525"
          height="504"
          transform="rotate(-4 0.950562 67.5704)"
          fill="#F3F6BB"
        />
      </g>
      <g filter="url(#filter1_d_5_238)">
        <rect
          x="139.835"
          y="15.7842"
          width="242"
          height="64"
          transform="rotate(-2.25417 139.835 15.7842)"
          fill="white"
          fill-opacity="0.47"
          shape-rendering="crispEdges"
        />
      </g>
      <path
        d="M6.07639 137.39L529.745 99.6735"
        stroke="#A80000"
        stroke-width="2"
      />
      <path
        d="M8.84775 177.022L532.502 139.307"
        stroke="#A80000"
        stroke-opacity="0.5"
        stroke-width="2"
      />
      <path
        d="M11.6191 216.654L535.313 178.936"
        stroke="#A80000"
        stroke-opacity="0.5"
        stroke-width="2"
      />
      <path
        d="M14.3904 256.286L538.036 218.572"
        stroke="#A80000"
        stroke-opacity="0.5"
        stroke-width="2"
      />
      <path
        d="M17.1618 295.919L541.593 258.149"
        stroke="#A80000"
        stroke-opacity="0.5"
        stroke-width="2"
      />
      <path
        d="M19.9331 335.551L543.569 297.837"
        stroke="#A80000"
        stroke-opacity="0.5"
        stroke-width="2"
      />
      <path
        d="M22.7045 375.183L546.331 337.469"
        stroke="#A80000"
        stroke-opacity="0.5"
        stroke-width="2"
      />
      <path
        d="M25.4758 414.815L549.086 377.103"
        stroke="#A80000"
        stroke-opacity="0.5"
        stroke-width="2"
      />
      <path
        d="M28.2472 454.447L551.896 416.732"
        stroke="#A80000"
        stroke-opacity="0.5"
        stroke-width="2"
      />
      <path
        d="M31.0186 494.079L554.614 456.368"
        stroke="#A80000"
        stroke-opacity="0.5"
        stroke-width="2"
      />
      <path
        d="M33.7899 533.711L557.44 495.996"
        stroke="#A80000"
        stroke-opacity="0.5"
        stroke-width="2"
      />
      {goBack && (
        <>
          <path
            d="M560 533.968L554.618 457L468.382 540.374L560 533.968Z"
            fill="#BABD8A"
          />
          <foreignObject
            x="470"
            y="520"
            width="450"
            height="70"
            transform="rotate(-4 0 67.3047)"
          >
            <GoBackButton to="/" />
          </foreignObject>
        </>
      )}
      <foreignObject
        x="60"
        y="175"
        width="450"
        height="70"
        transform="rotate(-4 0 67.3047)"
      >
        <StickyNoteTextInput placeholder="Epost" />
      </foreignObject>
      {/* <text
        transform="translate(15 258.59) rotate(-4)"
        fill="#585B19"
        fill-opacity="0.75"
        font-family="Reenie Beanie"
        font-size="48"
        font-weight="500"
        letter-spacing="0em"
      >
        <tspan x="224.02" y="36">
          Navn
        </tspan>
      </text> */}
      <foreignObject
        x="60"
        y="255"
        width="450"
        height="70"
        transform="rotate(-4 0 67.3047)"
      >
        <StickyNoteTextInput placeholder="Navn" />
      </foreignObject>

      {/*foreignObject og hvordan få knapp til å funke er hentet fra Github Copilot / Claude */}
      {buttonProps && (
        <foreignObject
          x="130"
          y="500"
          width="450"
          height="50"
          transform="rotate(-4 0 67.3047)"
        >
          <StickyNoteTextButton
            className={buttonProps.className}
            onClick={buttonProps.onClick}
          >
            {buttonProps.text}
          </StickyNoteTextButton>
        </foreignObject>
      )}
      <foreignObject
        x="60"
        y="335"
        width="450"
        height="70"
        transform="rotate(-4 0 67.3047)"
      >
        <StickyNoteTextInput placeholder="Passord" />
      </foreignObject>
      <foreignObject
        x="60"
        y="415"
        width="450"
        height="70"
        transform="rotate(-4 0 67.3047)"
      >
        <StickyNoteTextInput placeholder="Bekreft passord" />
      </foreignObject>
      <path d="M101.25 565.782L65 63.0776" stroke="#A80000" stroke-width="2" />
      <text
        transform="translate(66.5445 87.946) rotate(-4)"
        fill="black"
        stroke="#A80000"
        stroke-opacity="0.5"
        font-family="Cooper Black"
        font-size="48"
        letter-spacing="0em"
      >
        <tspan x="200" y="44.0352" textAnchor="middle">
          {title}
        </tspan>
      </text>
      <defs>
        <filter
          id="filter0_d_5_238"
          x="0.950562"
          y="30.9482"
          width="566.878"
          height="547.394"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5_238"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5_238"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_5_238"
          x="129.835"
          y="0.265747"
          width="264.33"
          height="93.4689"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5_238"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5_238"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
