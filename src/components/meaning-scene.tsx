"use client";

import { motion } from "framer-motion";

type MeaningSceneProps = {
  launching: boolean;
  launched: boolean;
  reduceMotion: boolean;
  onArrival: () => void;
};

const flightX = [232, 335, 455, 590, 718, 852, 1008];
const flightY = [466, 399, 294, 215, 205, 273, 352];

export function MeaningScene({
  launching,
  launched,
  reduceMotion,
  onArrival,
}: MeaningSceneProps) {
  const lightArrived = launching || launched;

  return (
    <svg
      aria-hidden="true"
      className="meaning-scene-svg"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 1200 620"
    >
      <defs>
        <linearGradient id="meaning-sky" x1="0" x2="1" y1=".15" y2=".75">
          <stop offset="0" stopColor="#061F25" />
          <stop offset=".43" stopColor="#0A3636" />
          <stop offset=".73" stopColor="#45634F" />
          <stop offset="1" stopColor="#D69D62" />
        </linearGradient>
        <linearGradient id="meaning-light" x1=".7" x2="1" y1=".7" y2=".2">
          <stop offset="0" stopColor="#E7B76E" stopOpacity="0" />
          <stop offset="1" stopColor="#F4D496" stopOpacity=".8" />
        </linearGradient>
        <linearGradient id="meaning-hill-back" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#173D39" />
          <stop offset="1" stopColor="#725C43" />
        </linearGradient>
        <linearGradient id="meaning-hill-front" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#0C302F" />
          <stop offset="1" stopColor="#193C35" />
        </linearGradient>
        <radialGradient id="meaning-sun-glow">
          <stop stopColor="#FFE8B7" stopOpacity=".9" />
          <stop offset=".25" stopColor="#F2C878" stopOpacity=".45" />
          <stop offset="1" stopColor="#E7AA62" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="meaning-pad-glow">
          <stop stopColor="#F1CC83" stopOpacity=".6" />
          <stop offset="1" stopColor="#F1CC83" stopOpacity="0" />
        </radialGradient>
        <pattern id="meaning-geometry" width="56" height="56" patternUnits="userSpaceOnUse">
          <path
            d="M28 2 54 28 28 54 2 28 28 2Zm0 10 16 16-16 16-16-16 16-16Z"
            fill="none"
            stroke="#D9B66F"
            strokeOpacity=".12"
          />
        </pattern>
        <filter id="meaning-soft-glow" height="300%" width="300%" x="-100%" y="-100%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      <rect fill="url(#meaning-sky)" height="620" width="1200" />
      <rect fill="url(#meaning-geometry)" height="410" opacity=".27" width="600" />
      <motion.rect
        animate={{ opacity: lightArrived ? 0.48 : 0.08 }}
        fill="url(#meaning-light)"
        height="620"
        width="1200"
        transition={{ duration: reduceMotion ? 0 : launching ? 3 : 0.4, ease: "easeOut" }}
      />

      <g className="meaning-stars" fill="#E8CA8D">
        <circle cx="92" cy="142" r="1.8" />
        <circle cx="162" cy="78" r="1.4" />
        <circle cx="288" cy="172" r="1.7" />
        <circle cx="390" cy="102" r="1.2" />
        <circle cx="477" cy="155" r="1.6" />
        <circle cx="570" cy="92" r="1.3" />
        <path d="M118 207v9m-4.5-4.5h9M358 52v8m-4-4h8M536 237v7m-3.5-3.5h7" />
      </g>

      <circle cx="1002" cy="371" fill="url(#meaning-sun-glow)" r="178" />
      <motion.circle
        animate={{ cy: lightArrived ? 345 : 416, opacity: lightArrived ? 0.95 : 0.66 }}
        cx="1002"
        fill="#F8DBA0"
        r="48"
        transition={{ duration: reduceMotion ? 0 : launching ? 3 : 0.4, ease: "easeOut" }}
      />

      <path
        d="M0 448c140-57 252-72 365-35 106 34 174 8 275-27 118-41 194-35 294 10 89 40 170 46 266 9v215H0V448Z"
        fill="url(#meaning-hill-back)"
      />
      <path
        d="M0 507c156-58 259-44 379-20 116 24 181 2 305-37 113-35 193-10 279 19 88 30 157 39 237 11v140H0V507Z"
        fill="url(#meaning-hill-front)"
      />
      <path
        d="M0 506c156-58 259-44 379-20 116 24 181 2 305-37 113-35 193-10 279 19 88 30 157 39 237 11"
        fill="none"
        stroke="#D9B66F"
        strokeOpacity=".33"
        strokeWidth="1.5"
      />
      <path d="M0 555c174-45 285-19 419-7s212-53 328-63 249 72 453 24v111H0V555Z" fill="#082927" />

      <ellipse cx="232" cy="485" fill="url(#meaning-pad-glow)" rx="132" ry="74" />
      <ellipse cx="232" cy="487" fill="#092A28" fillOpacity=".85" rx="82" ry="19" />
      <ellipse cx="232" cy="483" fill="none" rx="58" ry="11" stroke="#D9B66F" strokeOpacity=".72" />
      <ellipse cx="232" cy="483" fill="none" rx="40" ry="7" stroke="#E8CA8D" strokeOpacity=".45" />
      <path d="M175 486h114" stroke="#E8CA8D" strokeOpacity=".62" />

      <path
        d="M230 465C336 398 455 294 590 215c123-73 257 3 418 137"
        fill="none"
        stroke="#E8CA8D"
        strokeDasharray="2 12"
        strokeLinecap="round"
        strokeOpacity=".58"
        strokeWidth="2"
      />
      <motion.path
        animate={{ pathLength: lightArrived ? 1 : 0, opacity: lightArrived ? 1 : 0 }}
        d="M230 465C336 398 455 294 590 215c123-73 257 3 418 137"
        fill="none"
        initial={false}
        stroke="#FFE5A8"
        strokeDasharray="1"
        strokeLinecap="round"
        strokeWidth="5"
        style={{ filter: "url(#meaning-soft-glow)" }}
        transition={{ duration: reduceMotion ? 0 : launching ? 3 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        animate={{ pathLength: lightArrived ? 1 : 0, opacity: lightArrived ? 0.95 : 0 }}
        d="M230 465C336 398 455 294 590 215c123-73 257 3 418 137"
        fill="none"
        initial={false}
        stroke="#FFE9B9"
        strokeDasharray="1"
        strokeLinecap="round"
        strokeWidth="1.6"
        transition={{ duration: reduceMotion ? 0 : launching ? 3 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.g
        animate={
          launching || launched
            ? { x: flightX, y: flightY }
            : { x: 232, y: 465 }
        }
        initial={false}
        onAnimationComplete={() => {
          if (launching) onArrival();
        }}
        transition={{ duration: reduceMotion ? 0 : launching ? 3 : 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <path d="m-20 5 41-15-16 29-5-11-20-3Z" fill="#F8E8C4" stroke="#B88E4D" strokeWidth="1.5" />
        <path d="m0 8 5-11 16-7" fill="none" stroke="#C49A56" strokeWidth="1" />
      </motion.g>
    </svg>
  );
}
