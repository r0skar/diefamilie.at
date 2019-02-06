import { cssRaw } from 'typestyle'

/**
 * Global CSS reset.
 */
export const resetCss = () => {
  cssRaw(`
    *,
    ::before,
    ::after {
      background-repeat: no-repeat;
      box-sizing: border-box;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-tap-highlight-color: transparent;
    }

    ::before,
    ::after {
      text-decoration: inherit;
      vertical-align: inherit;
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    main, menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
    article, aside, details, figcaption, figure,
    footer, header, hgroup, main, menu, nav, section {
      display: block;
    }
    *[hidden] {
      display: none;
    }
    html,
    body {
      height: 100vh;
    }
    html {
      cursor: default;
      font-size: 16px;
      overflow-y: scroll;
      overflow-x: hidden;
      word-break: break-word;
      /* return the viewport width MINUS the scrollbar */
      /* https://stackoverflow.com/a/34884924 */
      width: calc(100vw - (100vw - 100%));
    }
    body {
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      font-size: 1rem;
      line-height: 1.5;
      text-size-adjust: 100%;
      text-rendering: optimizeLegibility;
      -ms-text-size-adjust: 100%;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      width: 100%;
    }
    ol, ul {
      list-style: none;
    }
    blockquote, q {
      quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
    b,
    strong {
      font-weight: bold;
    }
    i,
    em {
      font-style: italic;
    }
    small {
      font-size: 0.8rem;
    }
    audio,
    canvas,
    iframe,
    img,
    svg,
    video {
      vertical-align: middle;
    }
    input {
      overflow: visible;
    }
    select {
      text-transform: none;
    }
    button,
    input,
    select,
    textarea {
      border: none;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      margin: 0;
      outline: none !important;
      padding: 0;
    }
    button {
      overflow: visible;
      text-transform: none;
    }
    button,
    [type="button"],
    [type="reset"],
    [type="submit"] {
      -webkit-appearance: button;
    }
    ::-webkit-input-placeholder {
      color: inherit;
      opacity: 0.54;
    }
    ::-webkit-search-decoration {
      -webkit-appearance: none;
    }
    ::-webkit-file-upload-button {
      -webkit-appearance: button;
      font: inherit;
    }
    ::-moz-focus-inner {
      border-style: none;
      padding: 0;
    }
    :-moz-focusring {
      outline: 1px dotted ButtonText;
    }
    a,
    area,
    button,
    input,
    label,
    select,
    summary,
    textarea,
    [tabindex] {
      -ms-touch-action: manipulation;
      touch-action: manipulation;
    }
    a {
      color: inherit;
      cursor: pointer;
    }
    img {
      display: inline-block;
      max-width: 100%;
      object-fit: cover;
    }
  `)
}
