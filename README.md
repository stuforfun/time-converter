# Time Converter

A clean, self-contained timezone converter. No dependencies, no server, no install — just open and use.

**Live:** [stuforfun.github.io/time-converter](https://stuforfun.github.io/time-converter)

---

## What it does

Enter a date, time, and origin city — instantly see the equivalent local time in any destination city around the world. Add multiple destinations at once.

---

## Features

- **1,055 cities** across every IANA timezone (1,039 unique city names; 16 appear in multiple countries)
- **DST-aware** — handles daylight saving transitions correctly via browser's built-in IANA database
- **Half & quarter-hour offsets** — India (UTC+5:30), Nepal (UTC+5:45), Iran (UTC+3:30), and all other non-whole-hour zones
- **Fuzzy city search** — scored ranking so the best match always comes first; accents and diacritics normalised (type "Medellin" to find "Medellín")
- **44 city aliases** — historical and colloquial names: Bombay → Mumbai, Peking → Beijing, Saigon → Ho Chi Minh City, NYC, HK, KL, BKK, and more
- **Multiple destinations** — add as many target cities as you need; first card is permanent, additional cards are removable
- **12h / 24h toggle** per card, defaulting to 24h
- **Coherent color system** — origin card in blue, destination cards in burgundy red
- **Persistent state** — localStorage auto-saves your last session; reopening the app restores your cities, date, time, and format settings
- **Mobile-friendly** — stacked single-column layout on small screens, side-by-side grid on desktop
- **Accessible** — full ARIA attributes, keyboard navigation in dropdowns, screen reader announcements on result updates

---

## How to use

1. **Origin** — type your reference city and select it from the dropdown
2. **Date & Time** — pick a date and enter a time, or click **set now** to use the current moment
3. **Destination** — type the city you want to convert to and select it
4. **Read the result** — date, local time, and UTC offset appear instantly
5. **Add more** — click **+ Add destination** for additional cities

---

## Technical notes

| Detail | Value |
|---|---|
| Architecture | Single self-contained HTML file |
| Dependencies | No npm · Google Fonts loaded from CDN at runtime |
| Fonts | Google Fonts (Playfair Display + DM Mono) |
| Cities | 1,055 entries · 1,039 unique names · 44 aliases |
| Algorithm | `Intl.DateTimeFormat` + iterative `wallToUTC` for DST correctness |
| Storage | `localStorage` key `tc-v2` |
| Browser support | Any modern browser (Chrome, Firefox, Safari, Edge) |

---

## Running locally

No build step. Just open the file:

```bash
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

Or serve with any static server:

```bash
npx serve .
python3 -m http.server 8080
```

---

## Updating

1. Edit `index.html`
2. Commit and push to `main`
3. GitHub Pages deploys automatically within ~60 seconds

---

## License

MIT — do whatever you want with it.
