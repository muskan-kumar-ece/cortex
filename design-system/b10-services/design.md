---
version: alpha
name: Halo
description: A modern, minimal, and scalable dark design system that treats the interface as deep-space substrate and information as the source of light.
theme: dark
colors:
  background: "#0A0B0F"
  surface: "#14151C"
  elevated: "#1E2029"
  border: "#2A2D38"
  border-strong: "#3A3D4A"
  on-surface: "#F2F4F8"
  on-surface-muted: "#9AA0AE"
  on-surface-faint: "#5C6170"
  primary: "#5B6BFF"
  primary-hover: "#7886FF"
  primary-pressed: "#4A59E6"
  secondary: "#3DD7E5"
  tertiary: "#F5D547"
  success: "#2BE08C"
  warning: "#F5D547"
  info: "#3DD7E5"
  error: "#FF3A5C"
  focus: "rgba(91, 107, 255, 0.35)"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "4.5rem"
    fontWeight: 600
    letterSpacing: "-0.03em"
    lineHeight: 1.04
  headline-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    letterSpacing: "-0.02em"
    lineHeight: 1.12
  headline-md:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    letterSpacing: "-0.015em"
    lineHeight: 1.2
  title-md:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    letterSpacing: "-0.01em"
    lineHeight: 1.3
  body-md:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    letterSpacing: "-0.005em"
    lineHeight: 1.55
  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    letterSpacing: "0"
    lineHeight: 1.5
  label-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.08em"
    lineHeight: 1.2
    textTransform: "uppercase"
  mono-sm:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0"
    lineHeight: 1.4
  metric:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "2.5rem"
    fontWeight: 600
    letterSpacing: "-0.02em"
    lineHeight: 1
rounded:
  none: "0px"
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "24px"
  full: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  xxl: "64px"
  gutter: "24px"
border:
  width: "1px"
  width-thick: "1.5px"
elevation:
  sm: "0 1px 0 rgba(255,255,255,0.02) inset, 0 1px 2px rgba(0,0,0,0.4)"
  md: "0 8px 24px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.03) inset"
  lg: "0 24px 60px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.04) inset"
  focus: "0 0 0 3px rgba(91, 107, 255, 0.35)"
motion:
  duration-fast: "120ms"
  duration-base: "150ms"
  duration-slow: "240ms"
  easing-standard: "cubic-bezier(0.2, 0.6, 0.2, 1)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "0px 18px"
    typography: "{typography.body-sm}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "#FFFFFF"
  button-primary-pressed:
    backgroundColor: "{colors.primary-pressed}"
    textColor: "#FFFFFF"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "0px 18px"
    border: "1px solid {colors.border-strong}"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface-muted}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "0px 18px"
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "0px 18px"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "0px 14px"
    border: "1px solid {colors.border}"
  input-field-focus:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.primary}"
    shadow: "{elevation.focus}"
  input-field-error:
    border: "1px solid {colors.error}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "24px"
    border: "1px solid {colors.border}"
  card-elevated:
    backgroundColor: "{colors.elevated}"
    rounded: "{rounded.lg}"
    padding: "24px"
    border: "1px solid {colors.border-strong}"
    shadow: "{elevation.md}"
  checkbox:
    backgroundColor: "{colors.surface}"
    rounded: "6px"
    size: "18px"
    border: "1px solid {colors.border-strong}"
  checkbox-checked:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    border: "1px solid {colors.primary}"
  radio:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.full}"
    size: "18px"
    border: "1px solid {colors.border-strong}"
  radio-checked:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    border: "1px solid {colors.primary}"
  switch-track:
    backgroundColor: "{colors.elevated}"
    rounded: "{rounded.full}"
    width: "36px"
    height: "20px"
    border: "1px solid {colors.border-strong}"
  switch-track-on:
    backgroundColor: "{colors.primary}"
    border: "1px solid {colors.primary}"
  tabs-container:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.full}"
    padding: "4px"
    border: "1px solid {colors.border}"
  tabs-active:
    backgroundColor: "{colors.elevated}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    height: "32px"
    padding: "0px 14px"
    border: "1px solid {colors.primary}"
  tabs-inactive:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface-muted}"
    rounded: "{rounded.full}"
    height: "32px"
    padding: "0px 14px"
  chip:
    backgroundColor: "rgba(91, 107, 255, 0.12)"
    textColor: "{colors.primary-hover}"
    rounded: "{rounded.full}"
    height: "24px"
    padding: "0px 10px"
    typography: "{typography.mono-sm}"
  stat-tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "20px"
    border: "1px solid {colors.border}"
  stat-tile-accent:
    backgroundColor: "{colors.primary}"
    height: "2px"
---

## Overview

Halo is a dark, architectural design system built around the idea that the interface should fade and the data should glow. Surfaces stack in three quiet charcoal tiers, hairline 1px borders draw the geometry, and a single electric indigo carries every action. Saturated signal colors — lime, amber, cyan, magenta — are reserved for status, trends, and points of focus, so the screen reads as a calm dashboard with bright, intentional flares of information.

The system is framework-agnostic. It is delivered as plain CSS custom properties and reusable class selectors, paired with semantic HTML elements (`<button>`, `<input>`, `<label>`, `<section>`, `<article>`). It is designed for product surfaces — dashboards, console screens, settings panels, marketing pages — where density and clarity matter more than ornament.

## Colors

Halo's palette is intentionally tight. The neutral spine is a single near-black canvas split into three surface tiers, separated by hairline borders rather than shadows. Color is then introduced as light: one brand indigo for actions and focus, and four signal hues that each map to a single, predictable meaning.

| Token | Hex | Role |
| --- | --- | --- |
| `background` | `#0A0B0F` | Page canvas, viewport, and outer layout |
| `surface` | `#14151C` | Cards, panels, inputs, and component fills |
| `elevated` | `#1E2029` | Modals, popovers, active tabs, hovered controls |
| `border` | `#2A2D38` | Hairline dividers and default component outlines |
| `border-strong` | `#3A3D4A` | Inputs, secondary buttons, emphasised dividers |
| `on-surface` | `#F2F4F8` | Headlines, body, and primary foreground |
| `on-surface-muted` | `#9AA0AE` | Secondary text, labels, inactive controls |
| `on-surface-faint` | `#5C6170` | Helper text, placeholders, captions |
| `primary` | `#5B6BFF` | Primary action, focus ring base, brand accent |
| `success` | `#2BE08C` | Positive metrics, confirmation, "up" trends |
| `warning` | `#F5D547` | Caution, attention, editorial highlight |
| `info` | `#3DD7E5` | Information, data accent, decorative |
| `error` | `#FF3A5C` | Destructive actions, "down" trends, critical alerts |

Accessibility: primary text on `background` meets WCAG AA at all body sizes. Use `on-surface-muted` for supporting text only; never for primary copy below 14px. Signal colors are always paired with an icon or label — never used as the only signal.

## Typography

Halo uses a modern grotesque typographic system with a tabular monospace companion for numbers, hex tokens, and dense data. Inter is the primary face for UI, headlines, and body; JetBrains Mono carries every metric, code sample, and token value so numerics align cleanly in tables and stat tiles.

| Level | Family | Size / Weight / Tracking |
| --- | --- | --- |
| `display` | Inter | clamp(2.75rem, 6vw, 4.5rem) / 600 / -0.03em |
| `headline-lg` | Inter | 2.25rem / 600 / -0.02em |
| `headline-md` | Inter | 1.5rem / 600 / -0.015em |
| `title-md` | Inter | 1.125rem / 600 / -0.01em |
| `body-md` | Inter | 0.9375rem / 400 / -0.005em |
| `body-sm` | Inter | 0.8125rem / 400 / 0 |
| `label-sm` | Inter | 0.75rem / 500 / 0.08em UPPERCASE |
| `mono-sm` | JetBrains Mono | 0.8125rem / 500 / 0 |
| `metric` | JetBrains Mono | 2.5rem / 600 / -0.02em |

Display sizes carry tight negative tracking and are used sparingly, typically once per page for hero headlines. Eyebrow labels use `label-sm` with wide tracking to act as quiet section dividers. Numerics always use `mono-sm` or `metric` to preserve column alignment.

## Layout

The layout follows a 4px base spacing scale. Containers cap at 1200px with a responsive horizontal padding via `clamp(20px, 4vw, 48px)`. Internal density is medium: components allow generous breathing room, with 24px section gutters and 16px inline gutters as the default.

- Spacing: `xs 4px`, `sm 8px`, `md 16px`, `lg 24px`, `xl 40px`, `xxl 64px`.
- Container: `max-width: 1200px` with responsive side padding.
- Grids: 2, 3, and 4 column responsive grids collapse to single column below 720px.
- Section rhythm: every major section is separated by 64–80px of vertical space; cards inside a section by 24px.
- Top navigation is a 64px bar with a hairline bottom border; the brand mark sits on the left and a control cluster sits on the right.

## Elevation & Depth

Depth in Halo is created by stacking material, not by blurring shadows. Three surface tiers (background → surface → elevated) communicate hierarchy, and 1px borders carry the geometry that shadow would carry in a light system. A single ambient shadow is reserved for floating elevated surfaces such as modals and popovers; focus and hover use saturated color, not blur.

| Token | Value | Use |
| --- | --- | --- |
| `elevation.sm` | inset + 1px shadow | Pressed buttons, subtle inner depth |
| `elevation.md` | 0 8px 24px black 45% | Elevated cards, popovers |
| `elevation.lg` | 0 24px 60px black 55% | Modals, command palettes, drawers |
| `elevation.focus` | 0 0 0 3px indigo 35% | All focus rings |

Focus is the only state allowed to glow. Hover lifts a control by one tier (e.g. `surface → elevated`) rather than adding a shadow.

## Shapes

The shape language is soft, architectural rectangle. Corners are never sharp; ornament is achieved with hairline borders and color, never chrome or gradients.

- `none` 0px — used only for full-bleed dividers.
- `sm` 6px — checkboxes and small inline pills.
- `md` 10px — buttons, inputs, selects, segmented controls.
- `lg` 16px — cards, stat tiles, panels.
- `xl` 24px — hero sections, large feature surfaces.
- `full` 999px — tabs container, switch tracks, dot badges, signal chips.

Border weight is uniformly `1px`. A `1.5px` thick variant is reserved for emphasized strokes on hero cards or callout banners.

## Components

### Button
Three variants and three sizes share one anatomy: 10px radius, single-line label, optional leading or trailing icon. Primary is a solid indigo fill with a faint top inset highlight. Secondary is a surface tile with a 1px strong border. Tertiary is text-only with a surface hover tint. Danger swaps primary indigo for the magenta error token. Sizes are 32px (sm), 40px (default), and 48px (lg).

### Input and form field
Inputs sit on the `surface` tier with a 1px `border`. A `label-sm` uppercase label sits above with widened tracking. Placeholder uses `on-surface-faint`. Focus state switches the border to `primary` and adds the standard 3px focus ring. Optional leading icon and helper text are supported. Error state replaces the border with `error` and the focus ring with a soft `error` glow. Selects and textareas inherit the same anatomy.

### Card
Cards use 16px radius, 1px border, and 20–24px internal padding. Variants include base card, elevated card (uses `elevated` surface and `md` shadow), media card (top media block with hairline bottom border), and accent card (a colored 2px top hairline drawn from any signal token via `data-accent`).

### Checkbox and radio
18px square with 6px radius (checkboxes) or full radius (radio). Default state is `surface` fill with a strong border; checked fills with `primary` and shows a white check glyph. Radio adds an inner 8px white dot. Both share the standard 3px focus ring.

### Tabs (segmented control)
A pill-style container on the `surface` tier with 4px internal padding and full radius. Active tab is an `elevated` tile with a 1px `primary` border. Inactive tabs are transparent with `on-surface-muted` text; hover lifts to elevated.

### Stat Tile (signature)
The system's hero pattern. A compact metric tile pairs a `label-sm` eyebrow, a large monospaced numeric value, a trend chip (lime for positive, magenta for negative) with a directional arrow glyph, and a 32px-tall inline sparkline rendered as a polyline. The tile lives on `surface`, uses 16px radius and a hairline border, and carries a 2px colored top hairline that picks up the relevant signal tone. Three sizes (`sm`, `md`, `lg`) cover dashboard, list, and hero contexts.

### Icons
The system uses Lucide (https://lucide.dev, ISC license) as its single icon library. Icons are rendered at a 1.5–1.75px stroke weight to match the hairline border language and inherit `currentColor` so they tint with their containing component. Do not mix icon libraries or invent custom paths.

## Do's and Don'ts

**Do**
- Use the three surface tiers in order: `background` for page, `surface` for components, `elevated` for floating or active states.
- Reserve `primary` indigo for action and focus; never use it for purely decorative fills.
- Use `mono-sm` or `metric` for every number that needs to align in a column.
- Pair signal colors with an icon or text label, never color alone.
- Keep one icon library — Lucide — and one stroke weight across the entire surface.

**Don't**
- Don't introduce drop shadows on flat components; depth comes from tier and border.
- Don't combine more than one signal color per stat tile or chip.
- Don't lower body text below 13px or set primary text in `on-surface-muted`.
- Don't sharpen corners to 0; the system has no square components.
- Don't gradient-fill buttons or surfaces; brand color is delivered as a single, solid tone.
import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="button">
        Button
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    position: relative;
    width: 120px;
    height: 40px;
    background-color: #000;
    display: flex;
    align-items: center;
    color: white;
    flex-direction: column;
    justify-content: center;
    border: none;
    padding: 12px;
    gap: 12px;
    border-radius: 8px;
    cursor: pointer;
  }

  .button::before {
    content: '';
    position: absolute;
    inset: 0;
    left: -4px;
    top: -1px;
    margin: auto;
    width: 128px;
    height: 48px;
    border-radius: 10px;
    background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100% );
    z-index: -10;
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .button::after {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100% );
    transform: translate3d(0, 0, 0) scale(0.95);
    filter: blur(20px);
  }

  .button:hover::after {
    filter: blur(30px);
  }

  .button:hover::before {
    transform: rotate(-180deg);
  }

  .button:active::before {
    scale: 0.7;
  }`;

export default Button;


.button:active::before {
  scale: 0.7;
}

import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <div className="button-container">
        <button className="button-3d">
          <div className="button-top">
            <span className="material-icons">❮</span>
          </div>
          <div className="button-bottom" />
          <div className="button-base" />
        </button>
        <button className="button-3d">
          <div className="button-top">
            <span className="material-icons">❯</span>
          </div>
          <div className="button-bottom" />
          <div className="button-base" />
        </button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button-container {
    display: flex;
    justify-content: center;
    margin: 20px;
  }

  .button-3d {
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    border-width: 0;
    padding: 0 8px;
    min-width: 4em;
    min-height: 4em;
    box-sizing: border-box;
    background: transparent;
    font: inherit;
    cursor: pointer;
    margin: 10px;
    border-radius: 20px;
  }

  .button-top {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    padding: 8px 16px;
    transform: translateY(0);
    color: #fff;
    background-image: linear-gradient(145deg, #6a11cb, #2575fc);
    text-shadow: 0 -1px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    transition: transform 0.3s, border-radius 0.3s, background 10s;
  }

  .button-3d:active .button-top {
    border-radius: 10px 10px 8px 8px / 8px;
    transform: translateY(2px);
    background-image: linear-gradient(145deg, #2575fc, #6a11cb);
  }

  .button-bottom {
    position: absolute;
    z-index: 1;
    bottom: 4px;
    left: 4px;
    border-radius: 20px;
    padding-top: 6px;
    width: calc(100% - 8px);
    height: calc(100% - 10px);
    background-image: linear-gradient(145deg, #2575fc, #6a11cb);
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5);
    transition: border-radius 0.2s, padding-top 0.2s;
  }

  .button-base {
    position: absolute;
    z-index: 0;
    top: 4px;
    left: 0;
    border-radius: 20px;
    width: 100%;
    height: calc(100% - 4px);
    background-color: rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 1px 0 rgba(255, 255, 255, 0.75),
      inset 0 2px 2px rgba(0, 0, 0, 0.25);
    transition: border-radius 0.2s, padding-top 0.2s;
  }

  .button-3d:active .button-bottom {
    border-radius: 10px 10px 8px 8px / 8px;
    padding-top: 0;
  }

  .button-3d:active .button-base {
    border-radius: 10px 10px 8px 8px / 8px;
  }`;

export default Button;


import React from 'react';
import styled from 'styled-components';

const Input = () => {
  return (
    <StyledWrapper>
      <div>
        <div className="grid" />
        <div id="poda">
          <div className="glow" />
          <div className="darkBorderBg" />
          <div className="darkBorderBg" />
          <div className="darkBorderBg" />
          <div className="white" />
          <div className="border" />
          <div id="main">
            <input placeholder="Search..." type="text" name="text" className="input" />
            <div id="input-mask" />
            <div id="pink-mask" />
            <div className="filterBorder" />
            <div id="filter-icon">
              <svg preserveAspectRatio="none" height={27} width={27} viewBox="4.8 4.56 14.832 15.408" fill="none">
                <path d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z" stroke="#d6d6e6" strokeWidth={1} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div id="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" height={24} fill="none" className="feather feather-search">
                <circle stroke="url(#search)" r={8} cy={11} cx={11} />
                <line stroke="url(#searchl)" y2="16.65" y1={22} x2="16.65" x1={22} />
                <defs>
                  <linearGradient gradientTransform="rotate(50)" id="search">
                    <stop stopColor="#f8e7f8" offset="0%" />
                    <stop stopColor="#b6a9b7" offset="50%" />
                  </linearGradient>
                  <linearGradient id="searchl">
                    <stop stopColor="#b6a9b7" offset="0%" />
                    <stop stopColor="#837484" offset="50%" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .grid {
    height: 800px;
    width: 800px;
    background-image: linear-gradient(to right, #0f0f10 1px, transparent 1px),
      linear-gradient(to bottom, #0f0f10 1px, transparent 1px);
    background-size: 1rem 1rem;
    background-position: center center;
    position: absolute;
    z-index: -1;
    filter: blur(1px);
  }
  .white,
  .border,
  .darkBorderBg,
  .glow {
    max-height: 70px;
    max-width: 314px;
    height: 100%;
    width: 100%;
    position: absolute;
    overflow: hidden;
    z-index: -1;
    /* Border Radius */
    border-radius: 12px;
    filter: blur(3px);
  }
  .input {
    background-color: #010201;
    border: none;
    /* padding:7px; */
    width: 301px;
    height: 56px;
    border-radius: 10px;
    color: white;
    padding-inline: 59px;
    font-size: 18px;
  }
  #poda {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .input::placeholder {
    color: #c0b9c0;
  }

  .input:focus {
    outline: none;
  }

  #main:focus-within > #input-mask {
    display: none;
  }

  #input-mask {
    pointer-events: none;
    width: 100px;
    height: 20px;
    position: absolute;
    background: linear-gradient(90deg, transparent, black);
    top: 18px;
    left: 70px;
  }
  #pink-mask {
    pointer-events: none;
    width: 30px;
    height: 20px;
    position: absolute;
    background: #cf30aa;
    top: 10px;
    left: 5px;
    filter: blur(20px);
    opacity: 0.8;
    //animation:leftright 4s ease-in infinite;
    transition: all 2s;
  }
  #main:hover > #pink-mask {
    //animation: rotate 4s linear infinite;
    opacity: 0;
  }

  .white {
    max-height: 63px;
    max-width: 307px;
    border-radius: 10px;
    filter: blur(2px);
  }

  .white::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(83deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    filter: brightness(1.4);
    background-image: conic-gradient(
      rgba(0, 0, 0, 0) 0%,
      #a099d8,
      rgba(0, 0, 0, 0) 8%,
      rgba(0, 0, 0, 0) 50%,
      #dfa2da,
      rgba(0, 0, 0, 0) 58%
    );
    //  animation: rotate 4s linear infinite;
    transition: all 2s;
  }
  .border {
    max-height: 59px;
    max-width: 303px;
    border-radius: 11px;
    filter: blur(0.5px);
  }
  .border::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(70deg);
    position: absolute;
    width: 600px;
    height: 600px;
    filter: brightness(1.3);
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      #1c191c,
      #402fb5 5%,
      #1c191c 14%,
      #1c191c 50%,
      #cf30aa 60%,
      #1c191c 64%
    );
    // animation: rotate 4s 0.1s linear infinite;
    transition: all 2s;
  }
  .darkBorderBg {
    max-height: 65px;
    max-width: 312px;
  }
  .darkBorderBg::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(82deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      rgba(0, 0, 0, 0),
      #18116a,
      rgba(0, 0, 0, 0) 10%,
      rgba(0, 0, 0, 0) 50%,
      #6e1b60,
      rgba(0, 0, 0, 0) 60%
    );
    transition: all 2s;
  }
  #poda:hover > .darkBorderBg::before {
    transform: translate(-50%, -50%) rotate(262deg);
  }
  #poda:hover > .glow::before {
    transform: translate(-50%, -50%) rotate(240deg);
  }
  #poda:hover > .white::before {
    transform: translate(-50%, -50%) rotate(263deg);
  }
  #poda:hover > .border::before {
    transform: translate(-50%, -50%) rotate(250deg);
  }

  #poda:hover > .darkBorderBg::before {
    transform: translate(-50%, -50%) rotate(-98deg);
  }
  #poda:hover > .glow::before {
    transform: translate(-50%, -50%) rotate(-120deg);
  }
  #poda:hover > .white::before {
    transform: translate(-50%, -50%) rotate(-97deg);
  }
  #poda:hover > .border::before {
    transform: translate(-50%, -50%) rotate(-110deg);
  }

  #poda:focus-within > .darkBorderBg::before {
    transform: translate(-50%, -50%) rotate(442deg);
    transition: all 4s;
  }
  #poda:focus-within > .glow::before {
    transform: translate(-50%, -50%) rotate(420deg);
    transition: all 4s;
  }
  #poda:focus-within > .white::before {
    transform: translate(-50%, -50%) rotate(443deg);
    transition: all 4s;
  }
  #poda:focus-within > .border::before {
    transform: translate(-50%, -50%) rotate(430deg);
    transition: all 4s;
  }

  .glow {
    overflow: hidden;
    filter: blur(30px);
    opacity: 0.4;
    max-height: 130px;
    max-width: 354px;
  }
  .glow:before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(60deg);
    position: absolute;
    width: 999px;
    height: 999px;
    background-repeat: no-repeat;
    background-position: 0 0;
    /*border color, change middle color*/
    background-image: conic-gradient(
      #000,
      #402fb5 5%,
      #000 38%,
      #000 50%,
      #cf30aa 60%,
      #000 87%
    );
    /* change speed here */
    //animation: rotate 4s 0.3s linear infinite;
    transition: all 2s;
  }

  @keyframes rotate {
    100% {
      transform: translate(-50%, -50%) rotate(450deg);
    }
  }
  @keyframes leftright {
    0% {
      transform: translate(0px, 0px);
      opacity: 1;
    }

    49% {
      transform: translate(250px, 0px);
      opacity: 0;
    }
    80% {
      transform: translate(-40px, 0px);
      opacity: 0;
    }

    100% {
      transform: translate(0px, 0px);
      opacity: 1;
    }
  }

  #filter-icon {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    max-height: 40px;
    max-width: 38px;
    height: 100%;
    width: 100%;

    isolation: isolate;
    overflow: hidden;
    /* Border Radius */
    border-radius: 10px;
    background: linear-gradient(180deg, #161329, black, #1d1b4b);
    border: 1px solid transparent;
  }
  .filterBorder {
    height: 42px;
    width: 40px;
    position: absolute;
    overflow: hidden;
    top: 7px;
    right: 7px;
    border-radius: 10px;
  }

  .filterBorder::before {
    content: "";

    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    filter: brightness(1.35);
    background-image: conic-gradient(
      rgba(0, 0, 0, 0),
      #3d3a4f,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0) 50%,
      #3d3a4f,
      rgba(0, 0, 0, 0) 100%
    );
    animation: rotate 4s linear infinite;
  }
  #main {
    position: relative;
  }
  #search-icon {
    position: absolute;
    left: 20px;
    top: 15px;
  }`;

export default Input;
