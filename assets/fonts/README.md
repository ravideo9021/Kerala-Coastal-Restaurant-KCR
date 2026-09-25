# Fonts

Self-hosted, subsetted copies of the three brand fonts, loaded with
`next/font/local` in `app/layout.js`.

| File | Font | Used for |
| --- | --- | --- |
| `AnekMalayalam-display.woff2` | Anek Malayalam, condensed (width 75), weight 600–800 | Headings, buttons, navigation, prices. A Kerala type family: the same font sets the Malayalam words (സ്വാഗതം, കേരളം). |
| `Manrope-var.woff2` | Manrope (variable, weight 400–800) | Body text. |
| `Yellowtail-400.woff2` | Yellowtail | Script accents (Basic Latin and curly quotes only). |

Anek Malayalam and Manrope keep Latin, Latin-1, common punctuation, arrows and
the rupee sign (₹). Anek Malayalam also keeps the Malayalam letters of the two
words used on the site, with the shaping rules that join them. To use another
Malayalam word, add it to `ML` below and regenerate.

Regenerate from the Google Fonts sources (github.com/google/fonts) with
fontTools (`pip install fonttools brotli`):

```sh
U="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20B9,U+2122,U+2190-2193,U+2212,U+2215,U+FEFF,U+FFFD"
ML="സ്വാഗതം കേരളം"

# 1. Pin / limit the variable axes
fonttools varLib.instancer "AnekMalayalam[wdth,wght].ttf" wdth=75 wght=600:800 -o anek.ttf
fonttools varLib.instancer "Manrope[wght].ttf" wght=400:800 -o manrope.ttf

# 2. Subset
pyftsubset anek.ttf --unicodes="$U" --text="$ML" \
  --layout-features='kern,mark,mkmk,dist,akhn,blws,ccmp,haln,pref,pstf,psts,rvrn,liga,case,tnum,lnum' \
  --no-hinting --desubroutinize --flavor=woff2 --output-file=AnekMalayalam-display.woff2
pyftsubset manrope.ttf --unicodes="$U" --layout-features='kern,liga,calt,case,tnum,lnum,locl' \
  --no-hinting --desubroutinize --flavor=woff2 --output-file=Manrope-var.woff2
pyftsubset Yellowtail-Regular.ttf --unicodes="U+0020-007E,U+00A0,U+00B7,U+00E9,U+2013-2014,U+2018-201D,U+2026" \
  --layout-features='kern,liga' --no-hinting --desubroutinize --flavor=woff2 --output-file=Yellowtail-400.woff2
```

Licenses: SIL Open Font License 1.1 (Anek Malayalam, Manrope) and Apache
License 2.0 (Yellowtail) — see the license files in this folder.
