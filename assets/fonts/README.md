# Fonts

Self-hosted, subsetted copies of the three brand fonts, loaded with
`next/font/local` in `app/layout.js`.

| File | Font | Notes |
| --- | --- | --- |
| `PlayfairDisplay-var.woff2` | Playfair Display (variable, wght 400–900) | Headings. The variable weight axis drives the "breathing" heading animation. |
| `DMSans-var.woff2` | DM Sans (variable, opsz 9–40, wght 400–800) | Body text. |
| `Satisfy-400.woff2` | Satisfy | Script accents (Basic Latin and curly quotes only). |

Each file keeps Latin, Latin-1, common punctuation, arrows and the rupee sign
(₹), so prices render in the brand font without pulling in extra font files.

Regenerate from the Google Fonts sources (github.com/google/fonts) with
fontTools:

```sh
U="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20B9,U+2122,U+2190-2193,U+2212,U+2215,U+FEFF,U+FFFD"
pyftsubset "PlayfairDisplay[wght].ttf" --unicodes="$U" --layout-features='kern,liga,calt,lnum,tnum,case' \
  --no-hinting --desubroutinize --flavor=woff2 --output-file=PlayfairDisplay-var.woff2
# DM Sans: first limit wght to 400–800 with fontTools.varLib.instancer, then subset the same way.
```

Licenses: SIL Open Font License 1.1 (Playfair Display, DM Sans) and Apache
License 2.0 (Satisfy) — see the license files in this folder.
