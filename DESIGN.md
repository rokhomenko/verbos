# Verbos — Design System

> Atlas español · Spanish verb atlas
> Source of truth: `app/globals.css`

A slow, bilingual (Ukrainian + Spanish) interface for studying Spanish verb
conjugation, built on a Japanese-inspired visual language. Everything in this
document is derived from — and constrained to — the tokens, components, and
motion declared in `app/globals.css`.

---

## 1. Principles

The interface is designed to disappear. What remains is the word and its
inflection.

| Principle | What it means in practice |
| --- | --- |
| **Slow over fast** | Transitions are 300–700ms, easing is `cubic-bezier(0.2, 0.7, 0.2, 1)`. No spinners, no timers, no streaks. |
| **Hairline over heavy** | All separators are 1px `rgba(sumi, 0.10–0.25)` (10–25% ink on paper). No borders heavier than a hair. |
| **Ink over pixels** | Color names are material, not hue: `washi` (paper), `sumi` (ink), `akane` (deep moss / organic green), `kintsugi` (gold). |
| **Two borders, not one** | Cards carry an inner and an outer hairline (`washi-card::before`). A page is a frame inside a frame. |
| **Bilingual by default** | Latin and Cyrillic share the same vertical rhythm; serif headings, sans body, `palt`+`liga` everywhere. |
| **Punctuation belongs to the line** | `hanging-punctuation: first last` on every paragraph. Quotes and dashes hang in the margin. |
| **Reduced motion is a first-class state** | Every animation collapses to `0.01ms` when `prefers-reduced-motion: reduce`. |
| **Dark mode is not an inversion** | It is a re-pigmentation: paper becomes indigo-washi, ink becomes aged-paper, the deep-moss accent brightens to a moss-gold. |

---

## 2. Tokens

All tokens are declared as CSS custom properties on `:root`. A subset is
re-registered inside `@theme inline` so Tailwind v4 utilities
(`bg-sumi`, `text-muted`, `bg-washi`, etc.) resolve to them. The
`--hairline*` and a few other tokens are **not** Tailwind-registered by
default — see §4.4 for the composition pattern used in their place.

### 2.1 Color — light theme

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#ffffff` | Page background, surface base |
| `--washi` | `#dcebc8` | Card surface (washi paper, pale green) |
| `--washi-deep` | `#c8d8a8` | Card hover, table row hover |
| `--washi-shadow` | `#b0c290` | Reserved for inset shading |
| `--sumi` | `#0a0a0a` | Primary text, headings, ink |
| `--sumi-soft` | `#1f1f1f` | Body text (`<p>`), supporting copy |
| `--kebairo` | `#6f6e54` | Muted text, captions (tea-stained gray) |
| `--nezumi` | `#9a9c84` | Disabled, dividers, scrollbar hover (mouse-gray) |
| `--akane` | `#5d6b30` | Accent, links-on-hover, selection, ink-stamp fill (deep moss / organic green) |
| `--kintsugi` | `#8a7530` | Gold emphasis, "gold-leaf" gradient anchor |
| `--aigami` | `#3d4a3a` | Deep indigo-paper, reserved |
| `--hairline` | `rgba(10,10,10,0.10)` | Default 1px separator |
| `--hairline-strong` | `rgba(10,10,10,0.25)` | Emphasized 1px separator (input underline, button border) |

Semantic aliases (CSS variables, not yet Tailwind utilities):

```
--background      = --paper
--foreground      = --sumi
--muted           = --kebairo
--accent          = --akane
--gold            = --kintsugi
```

#### Tailwind v4 — `@theme inline` registration

Only a subset of the tokens is currently exposed as Tailwind color utilities.
The block in `app/globals.css` registers:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted:      var(--muted);
  --color-accent:     var(--accent);
  --color-gold:       var(--gold);
  --color-washi:      var(--washi);
  --color-sumi:       var(--sumi);
  /* …font tokens… */
}
```

This means `bg-background`, `text-foreground`, `text-muted`, `text-accent`,
`text-gold`, `bg-washi`, and `text-sumi` all work out of the box.

`--akane`, `--kebairo`, `--nezumi`, `--kintsugi`, `--hairline`, and
`--hairline-strong` are **not** yet registered. For these, you must either:

1. Add them to `@theme inline` in `app/globals.css`:

   ```css
   @theme inline {
     /* …existing… */
     --color-akane:          var(--akane);
     --color-kebairo:        var(--kebairo);
     --color-nezumi:         var(--nezumi);
     --color-kintsugi:       var(--kintsugi);
     --color-hairline:       var(--hairline);
     --color-hairline-strong:var(--hairline-strong);
   }
   ```

   After this, `text-akane`, `border-hairline`, etc. resolve correctly.

2. Or use the raw CSS variable in classes (e.g. `text-[var(--akane)]`,
   `border-[var(--hairline)]`) — this works today, no CSS change needed.

> **Rule of thumb:** `text-muted` works; `text-akane` does not, until the
> registration above is added.

### 2.2 Color — dark theme

Triggered by `@media (prefers-color-scheme: dark)`. Pigments shift, semantics
do not — `--background` is still paper, only the paper is indigo.

| Token | Light | Dark | Shift |
| --- | --- | --- | --- |
| `--paper` | `#ffffff` | `#0e0f0a` | page → ink-stained paper |
| `--washi` | `#dcebc8` | `#1c2014` | card → aged washi |
| `--washi-deep` | `#c8d8a8` | `#262a1c` | hover → deeper washi |
| `--washi-shadow` | `#b0c290` | `#11140a` | inset shadow |
| `--sumi` | `#0a0a0a` | `#ece8d4` | text → aged paper |
| `--sumi-soft` | `#1f1f1f` | `#c8c4ae` | body text |
| `--kebairo` | `#6f6e54` | `#9a9884` | muted |
| `--nezumi` | `#9a9c84` | `#6a6852` | disabled |
| `--akane` | `#5d6b30` | `#a8b870` | accent → brightened moss-gold |
| `--kintsugi` | `#8a7530` | `#d4b870` | gold → brighter kintsugi |
| `--aigami` | `#3d4a3a` | `#6a8060` | indigo → soft green |
| `--hairline` | `rgba(10,10,10,0.10)` | `rgba(236,232,212,0.10)` | hairline (ink → paper) |
| `--hairline-strong` | `rgba(10,10,10,0.25)` | `rgba(236,232,212,0.25)` | strong hairline |

### 2.3 Gradient — gold leaf

```
.gold-leaf  →  linear-gradient(135deg,
              #4a5a25 0%,
              #a8b855 45%,
              #6b7a30 100%)
```

Clipped to text (`-webkit-background-clip: text; background-clip: text;
color: transparent`). Use sparingly — one gold-leaf phrase per viewport.

### 2.4 Typography

| Token | Stack | Use |
| --- | --- | --- |
| `--font-sans` | `var(--font-geist-sans)`, `"Hiragino Mincho ProN"`, `"Yu Mincho"`, `ui-serif`, `Georgia`, `serif` | Body, UI, navigation |
| `--font-serif` | `"Cormorant Garamond"`, `"Shippori Mincho"`, `"Hiragino Mincho ProN"`, `"Yu Mincho"`, `ui-serif`, `Georgia`, `serif` | Headings, verb forms, italics |
| `--font-mono` | `var(--font-geist-mono)`, `"Shippori Mincho"`, `ui-monospace`, `monospace` | Code, reserved |

OpenType features enabled on `html`:
`"palt" 1, "liga" 1, "calt" 1` — proportional alternates, ligatures,
contextual alternates. Latin and CJK share the same rhythm.

### 2.5 Shape

| Token | Value | Use |
| --- | --- | --- |
| Card radius | `2px` | `washi-card` — paper has no rounded corners |
| Ink-stamp radius | `2px` | `ink-stamp` — square, with inner border at `inset: 4px` |
| Enso radius | `50%` | `enso` — full circle, with a 14%-wide gap at top-right |
| Scrollbar radius | `999px` | pill-shaped thumb on 8×8 track |
| Focus outline radius | `2px` | 1px akane stroke, 4px offset |

### 2.6 Shadow

| Token | Value | Use |
| --- | --- | --- |
| `washi-card` | `0 1px 0 var(--hairline), 0 30px 60px -40px rgba(0,0,0,0.08)` | top hairline, long soft drop |
| `ink-stamp` | `0 0 0 1px rgba(0,0,0,0.05), 0 1px 0 rgba(255,255,255,0.08) inset` | matte edge, paper highlight |

---

## 3. Typography

### 3.1 Scale

| Element | Family | Size | Weight | Color | Line-height | Letter-spacing |
| --- | --- | --- | --- | --- | --- | --- |
| `h1` | serif | `clamp(2.25rem, 1.6rem + 2.4vw, 3.75rem)` | `300` | `--sumi` | `1.25` | `-0.02em` |
| `h2` | serif | `clamp(1.625rem, 1.2rem + 1.4vw, 2.25rem)` | `400` | `--sumi` | `1.25` | `-0.01em` |
| `h3` | serif | `1.25rem` | `500` | `--sumi` | `1.25` | `-0.01em` |
| `h4–h6` | serif | inherited | `400` | `--sumi` | `1.25` | `-0.01em` |
| `body` | sans | inherited | `400` | `--sumi` | `1.7` | `0.005em` |
| `p` | sans | inherited | `400` | **`--sumi-soft`** | `1.7` | `0.005em` |
| `html` baseline | sans | inherited | `400` | `--sumi` | inherited | `0.005em` |

### 3.2 Rendering

```
text-rendering: optimizeLegibility;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

Note: `body` inherits `--sumi` (`#0a0a0a`), but `<p>` is explicitly set to
`--sumi-soft` (`#1f1f1f`) in `globals.css`. The slight softening is
intentional — it lowers the contrast of long-form copy just enough to read
as ink-on-paper rather than screen-on-screen, without going all the way to
`--kebairo` (which is reserved for muted UI chrome).

### 3.3 Utility classes

| Class | Effect |
| --- | --- |
| `.kanji` | Forces `"Shippori Mincho"`, `"Hiragino Mincho ProN"`, `"Yu Mincho"`, `"MS Mincho"`, `serif` stack with `letter-spacing: 0.02em`. Fallback order matters: macOS → Hiragino, Windows → Yu/MS Mincho, Linux → generic `serif`. For isolated CJK glyphs. |
| `.vertical` | `writing-mode: vertical-rl; text-orientation: mixed;` — right-to-left vertical text. |
| `.vermillion` | `color: var(--akane);` — deep-moss accent on text. (Class is named `.vermillion` for historical reasons; the pigment itself is `--akane` = `#5d6b30`, an organic green, not a red.) |
| `.gold-leaf` | Gradient-clipped text. See §2.3. |
| `.divider-dot` | 4×4 `nezumi` dot, `0.75rem` horizontal margin, vertically centered inline. |

### 3.4 Punctuation

`p { hanging-punctuation: first last; }` — opening quotes and closing
commas/periods hang in the margin, so the left edge of every paragraph is
optically flush. This matters most in tables and indented card bodies.

---

## 4. Components

All components below are defined as plain CSS in `app/globals.css`. They are
composed with Tailwind v4 utilities; no CSS-in-JS, no runtime styling.

### 4.1 `washi-card`

A surface that reads as a sheet of washi paper laid on a desk.

```
background:        var(--washi);
border:            1px solid var(--hairline);
border-radius:     2px;
box-shadow:        0 1px 0 var(--hairline),
                   0 30px 60px -40px rgba(0,0,0,0.08);
position:          relative;
```

The card carries a second border at `inset: 6px` via `::before`, `opacity: 0.6`
— a frame within a frame. Do not replace this with a single `border-2`; the
double line is the component.

Hover state is **not** declared in CSS — it is applied per-instance via
Tailwind utilities on the consuming element:

```
hover:translate-y-[-2px] transition-transform duration-700
```

(equivalent to `-translate-y-0.5` at the default 16px base; the arbitrary
value is used in the canonical implementation to make the intent explicit).
Shifts the card up by 2px over 700ms. See §5.2.

Used for: verb cards, conjugation table, practice panel.

### 4.2 `ink-stamp`

A 40×40 deep-moss square used as a logo / mark / bullet. Always square,
always 2px radius, always with an inner border at `inset: 4px`.

```
width:  2.5rem;
height: 2.5rem;
background: var(--akane);
color:    var(--paper);
font-family: var(--font-serif);
font-size:   1rem;
border-radius: 2px;
box-shadow:  0 0 0 1px rgba(0,0,0,0.05),
             0 1px 0 rgba(255,255,255,0.08) inset;
```

`::after` draws the inner border at `inset: 4px` with `opacity: 0.5`. Children
inherit `color: var(--paper)` and may be SVG icons (e.g. the eye mark).

### 4.3 `enso`

A zen circle (円相) with a deliberate gap at the top-right — the brush did
not close. `border-radius: 50%; border: 1px solid var(--sumi);`. The gap is
produced by `::after`: a 14%-wide, 1px-tall paper-colored bar rotated `-25deg`,
positioned at `top: -1px; right: 18%`. Use as a decorative mark, never as a
button or interactive target.

### 4.4 `hairline` / `hairline-strong`

**Important:** `.hairline` and `.hairline-strong` are **plain CSS classes**
defined directly in `globals.css` (lines 194–200), not Tailwind utilities.
They set `border-color` only — they do **not** add a border on their own.

```css
.hairline        { border-color: var(--hairline); }          /* rgba(10,10,10,0.10) */
.hairline-strong { border-color: var(--hairline-strong); }   /* rgba(10,10,10,0.25) */
```

To actually draw a border, compose them with a Tailwind width/side utility:

| Pattern | Effect |
| --- | --- |
| `border hairline` | 1px border on all sides, hairline color |
| `border-t hairline` | 1px border on top, hairline color |
| `border-b hairline-strong` | 1px border on bottom, strong hairline (input underline) |
| `border-l hairline` | 1px border on left (blockquote rule) |
| `border hairline-strong` | 1px border all sides, strong hairline (primary button) |

> **Do not write** `border-hairline` or `border-hairline-strong` — these
> Tailwind utilities do not exist, because `--hairline` and `--hairline-strong`
> are not registered in `@theme inline` (see §2.1). If you want them as
> Tailwind utilities, add `--color-hairline` and `--color-hairline-strong` to
> `@theme inline` first, or use the `border-[var(--hairline)]` arbitrary-value
> syntax.

Use `hairline` for separators (table rows, card edges, footer top, quote
rules). Use `hairline-strong` for interactive affordances (input underline,
primary button border, focus-adjacent rules). Never use anything thicker
than 1px.

### 4.5 Links

Default `<a>` is decorated by a 1px gradient underline that grows from
`0%` to `100%` width on hover.

```
background-image:  linear-gradient(currentColor, currentColor);
background-size:   0% 1px;
background-repeat: no-repeat;
background-position: 0 100%;
transition:        background-size 0.5s cubic-bezier(0.2,0.7,0.2,1),
                   color 0.3s ease;

a:hover { background-size: 100% 1px; color: var(--akane); }
```

Two transition durations on purpose: the underline takes 500ms, the color
shift takes 300ms. The eye sees the color change first, then the line
follows.

### 4.6 Buttons

Two kinds, both reset to `background: transparent; border: none; cursor:
pointer; font-family: inherit;` in the global rule.

| Kind | Anatomy | Example |
| --- | --- | --- |
| **Primary** | `h-12 px-8 border hairline-strong` → on hover, fills with `bg-sumi text-washi`, `500ms` color transition | "Start" CTA |
| **Tertiary** | `h-12 px-2 text-sm`, deep-moss (`vermillion` class → `--akane`) on hover, `300ms` | "Method →" |

Practice buttons (e.g. "Comprobar") use `bg-sumi text-washi` and transition
to `bg-akane` on hover, again over 500ms.

### 4.7 Inputs

```
border-bottom: 1px solid var(--hairline-strong);
padding-bottom: 0.5rem;
font-family: serif;
font-size: 1.125rem;
```

Placeholder text uses `var(--nezumi)`. On focus, the underline becomes
`var(--akane)` over a `transition-colors` (default 150–300ms). No box, no
ring — only the line changes.

### 4.8 Focus

```
input:focus-visible, textarea:focus-visible,
button:focus-visible, a:focus-visible {
  outline:        1px solid var(--akane);
  outline-offset: 4px;
  border-radius:  2px;
}
```

A 1px akane (deep-moss) outline, 4px away from the element. Never a 2–3px ring.
Never a colored box-shadow.

### 4.9 Scrollbar

8×8 track, transparent. Thumb is `var(--hairline-strong)` at rest, `var(--nezumi)`
on hover, fully pill-shaped (`border-radius: 999px`). Webkit-only — Firefox
inherits the system default.

### 4.10 Selection

```
::selection { background: var(--akane); color: var(--paper); }
```

Selected text becomes a deep-moss highlight on paper. In dark mode,
`--akane` is the moss-gold variant; the contrast is preserved.

### 4.11 Section separator

```
hr {
  border: none;
  height: 1px;
  background: var(--hairline);
  margin: 3rem 0;
}
```

A 1px hairline, 3rem of breath above and below. Use between major sections;
do not stack.

### 4.12 Verb card composition

The atomic unit of the catalog. Composed from utilities and `washi-card`.
This is the canonical instance from `app/page.tsx`:

```jsx
<article
  className="washi-card p-10 flex flex-col gap-6
             hover:translate-y-[-2px] transition-transform duration-700"
>
  <header>  {/* infinitive (h3) + meaning (muted italic) + type tag */}
  <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-sm">
    {forms.map((f, i) => (
      <span key={i} className="font-serif text-base">{f}</span>
    ))}
  </div>
  <p className="text-sm text-sumi-soft border-l hairline pl-4 italic">
    {example}
  </p>
  <footer className="flex items-center justify-between pt-2 mt-auto">
    {/* "Conjugación" link + eye mark */}
  </footer>
</article>
```

Notes on this composition:

- `<quote>` is **not** a valid HTML element. The example sentence uses
  `<p>` with a `border-l hairline` rule, which is the visual treatment
  reserved for quoted material in this system. Use `<blockquote>` only when
  the text is genuinely a quotation from an external source.
- `<header>` and `<footer>` are valid HTML5 sectioning elements; they are
  the correct semantic for the top and bottom bands of the card.
- The hover lift (`-2px`) is the only transform allowed on a card. The card
  itself does not change color on hover — only the row behind it does, in
  the conjugation table (`hover:bg-washi-deep`).

---

## 5. Motion

### 5.1 Curves and durations

| Curve | Used for |
| --- | --- |
| `cubic-bezier(0.2, 0.7, 0.2, 1)` | Link underline growth, primary button color fills |
| `ease` | Color-only transitions on links (`color 0.3s ease`) |
| default (Tailwind) | Generic `transition-colors` on inputs, table rows |

Durations in this system:

| Duration | Used for |
| --- | --- |
| `300ms` | Color shifts on text, link color change |
| `500ms` | Link underline grow, button background fill, practice button hover |
| `700ms` | Card hover lift (`translate-y: -2px`) |

The asymmetry is intentional: a fast color change invites the eye, a slow
movement rewards it.

### 5.2 Hover behaviors

| Element | Rest | Hover | Duration |
| --- | --- | --- | --- |
| `<a>` (default) | 0% underline | 100% underline + `color: akane` | 500ms / 300ms |
| Primary button | transparent on paper | `bg-sumi text-washi` | 500ms |
| Practice button | `bg-sumi text-washi` | `bg-akane` | 500ms |
| Verb card | rest | `translate-y: -2px` (Tailwind utility, see §4.12) | 700ms |
| Table row | `washi` | `washi-deep` | default `transition-colors` |
| Tertiary text link | `muted` | `akane` (`.vermillion`) | default `transition-colors` |
| Scrollbar thumb | `hairline-strong` | `nezumi` | implicit |
| Input underline | `hairline-strong` | `akane` | default `transition-colors` |

### 5.3 Reduced motion

```
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

A single blanket rule, applied with `!important`. There is no fallback
animation — when the user asks the system to be still, it is still. Hover
states still apply, but instantaneously.

### 5.4 What this system does not do

- No bounce, no spring, no overshoot.
- No parallax, no scroll-linked motion.
- No entrance animations (no fade-in, no slide-up on mount).
- No loading spinners — if something takes time, the interface waits
  silently.
- No auto-playing transitions on focus or route change.

Motion in this system is only ever a response to a user action, and it
always takes longer than the user expects. That is the point.

---

## 6. Quick reference

```html
<!-- Page shell -->
<!-- `min-h-dvh` matches the `min-height: 100dvh` rule in globals.css §body. -->
<!-- (The current layout.tsx uses `min-h-full`, which is functionally       -->
<!-- equivalent but depends on `<html class="h-full">` — prefer `min-h-dvh` -->
<!-- for explicit, self-sufficient full-viewport behavior.)                  -->
<body class="min-h-dvh flex flex-col">

<!-- Surface -->
<article class="washi-card p-10 …">…</article>

<!-- Accent text -->
<span class="vermillion">…</span>
<span class="gold-leaf italic">…</span>

<!-- Separator -->
<hr />

<!-- Link (animated underline) -->
<a href="…">…</a>

<!-- Primary button (outline → filled) -->
<!-- `border` (Tailwind) sets 1px width on all sides;          -->
<!-- `hairline-strong` (plain CSS class from globals.css) sets  -->
<!-- the border color. See §4.4.                                -->
<a class="inline-flex h-12 px-8 border hairline-strong
          hover:bg-sumi hover:text-washi
          transition-colors duration-500">…</a>

<!-- Focus ring (auto on :focus-visible) -->
<!-- 1px akane, 4px offset, 2px radius — do not override -->

<!-- Section label -->
<span class="text-xs tracking-[0.3em] uppercase text-muted">…</span>

<!-- Mark / bullet -->
<span class="ink-stamp"><Icon/></span>

<!-- Decorative circle (non-interactive) -->
<div class="enso w-12 h-12">…</div>
```
