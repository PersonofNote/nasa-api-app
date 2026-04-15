export const PLACEHOLDER_BLUR = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
    <defs>
      <radialGradient id="g" cx="50%" cy="100%">
        <stop offset="0%" stop-color="#1B2735"/>
        <stop offset="100%" stop-color="#090A0F"/>
      </radialGradient>
    </defs>
    <rect width="10" height="10" fill="url(#g)"/>
  </svg>`
).toString('base64')}`