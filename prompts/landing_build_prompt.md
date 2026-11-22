# Build prompt — Pricel landing page (pricel-ai.ru)

> Self-brief for Claude. Distilled 2026-11-22 from: Anthropic "Improving frontend design through Skills", the installed skills (landing-page-design, frontend-design, emil-design-eng, animate, impeccable) and transcripts of 10 YouTube tutorials (Dara Denney, Griffin Wooldridge, Tristen O'Brien, UI Collective, AI LABS, Nate Herk and others). Read this file in full before touching `docs/`.

---

## 0. Role and bar

You are the design lead and the front-end engineer of a small studio whose clients have already rejected every proposal that looked templated or "AI-made". The client (Maxim, founder of Pricel) is paying for a page that a Russian owner of a renovation company opens on his phone, understands in five seconds, trusts, and taps the button. Beauty serves that action; nothing else counts.

All visible copy is **Russian**. Code comments may be Russian. This prompt is English for precision.

## 1. The product (ground everything in it)

- **Brand:** «Прицел» (Pricel). Umbrella brand for AI automation in B2B. Tagline: «ИИ-аналитика для бизнеса».
- **Product on this page:** «Прицел · Замеры». AI listens to a company's recorded sales calls, finds clients who were *promised* a callback or a measurement visit (замер), checks the CRM, and **twice a day** delivers a PDF list: **who to call today** — with the client's quote, the timestamp in the call, the manager's promise, and the CRM status.
- **Audience:** owners and sales heads (РОП) of renovation and construction companies with on-site measurement visits, Moscow and the region: turnkey renovation, private houses, windows, roofing and facades, ceilings, doors, kitchens. Practical, sceptical, short on time, allergic to marketing fluff. Many will read on a phone.
- **Their pain:** every inbound call was already paid for by advertising. A manager says «перезвоню до 13:00», forgets, the client calls a competitor. The owner never sees it.
- **The one action:** «Разобрать 10 звонков бесплатно» → opens Telegram chat with Maxim. Secondary: phone number as selectable text.
- **Offer ladder:** free review of 10 calls → one-month pilot 20 000 ₽ (up to 100 calls) → subscription from 25 000 ₽/month. Read `Obsidian\Проекты\Прицел\03_Цены.md` before writing the price block.
- **Trust facts:** speech recognition runs on our own computer; names, phones, addresses and company names are masked before any text reaches the AI; the report shows evidence (quote + timestamp), not opinions about managers.

## 2. Read before designing (rich context = 85–90% first draft)

1. `CLAUDE.md` (this repo) — hard rules.
2. `Obsidian\Проекты\Прицел\01_Продукт.md`, `03_Цены.md`, `04_Окупаемость.md`.
3. `Obsidian\Проекты\Прицел\05_Рынок_и_спрос\03_Деньги_в_одном_замере.md` — the only allowed source of numbers for the "cost of a lost client" block.
4. `Obsidian\Проекты\Прицел\06_Конкуренты\09_Позиционирование_и_возражения.md` — objections for FAQ and the "what we never promise" list.
5. `Obsidian\Проекты\Прицел\12_Шаблоны_сообщений.md` — voice and phrasing.
6. `Obsidian\Проекты\Прицел\13_Материалы\01_Бренд\Бренд_Прицел.md` — palette, icon, fonts.
7. `Projects\Pricel\src\pricel\templates\report.html.j2` — the real report: its fields, its icon SVG.
8. `refs/style-options.html` — the approved direction (variant A, black-orange).

If something is missing, state the assumption in one line and continue. Ask Maxim only for things you cannot infer: Telegram username, phone number.

## 3. Skill workflow (in this order)

1. **`landing-page-design` — Part A only.** Intake from the files above; lock: one offer → one audience → one action; section list; headline candidates (write 5, pick 1, say why); objections → FAQ.
2. **`frontend-design`.** Write the design plan *into the top of the CSS* as tokens (color 4–6 named values, type roles, one-line layout concept, principles). Then review the plan against the brief: anything that would appear on any SaaS page gets revised before code.
3. **`landing-page-design` — Part B** as the visual floor (spacing scale, radius rules, hero rules, icons, motion limits). Where it conflicts with this prompt, this prompt wins.
4. **`emil-design-eng`** while building components (buttons, the report card, FAQ disclosure, sticky CTA).
5. **`animate`** for the single orchestrated hero sequence and micro-interactions — exact curves and durations from the skill, never invented `cubic-bezier` values.
6. **`impeccable`**: `critique` → fix → `polish` → `audit` (a11y, performance, responsive). The launcher is not installed: follow its "Launcher unavailable" path, read `reference/craft-floor.md` before UI edits, verify with screenshots instead of the script.

## 4. Visual direction

**World:** a night-shift control room for sales calls. Warm black like a powered-down monitor, orange like an indicator lamp and a crosshair reticle, monospaced timestamps like a call log. Precise, calm, confident. Not cyberpunk, not neon, not gaming.

**Palette (dark-first, single look; no light theme on the site):**
| token | hex | role |
|---|---|---|
| `--night` | `#0B0A09` | page ground |
| `--coal` | `#14120F` | raised surfaces |
| `--graphite` | `#201C18` | secondary planes; lines `#2E2924` |
| `--bone` | `#EDE8E1` | primary text |
| `--ash` | `#9A9289` | secondary text (check ≥ 4.5:1 on `--night`) |
| `--flame` | `#FF6B00` | primary accent: CTA, promise highlight, reticle |
| `--ember` | `#FF9A3C` | lighter orange, gradients, timestamps |
| `--amber` | `#FFB547` | gradient end, rare glints |
| `--alarm` | `#FF4A3D` | ONLY the «в CRM пусто» marker |

Orange is a *family*, not a single pop: use the flame→ember→amber ramp for the CTA fill, the reticle glow and one radial light in the hero. Text on orange is `--night`. The black is warm, never `#000`, never blue-black. Background gets depth: a faint radial glow of `--flame` at ~6–8% behind the hero card, a very subtle grain or a sparse dot grid at ≤4% opacity. No purple, no blue, no glassmorphism.

**Type (Cyrillic verified, self-hosted woff2 in `docs/assets/fonts`, subset to Latin + Cyrillic):**
- Display: **Unbounded** 800 (headline), 300 for large numbers. Tight leading 1.04–1.1, slight negative tracking. Headline is the type moment of the page.
- Text: **Onest** 400/500/600, 17–18 px body, line length ≤ 65ch.
- Data: **Martian Mono** 400/500 only for timestamps, call metadata and the report card — justified by the subject (call logs), nowhere decorative.
- Scale jumps ≥ 3× between body and H1 on desktop. Weight contrast 300 vs 800.
- `text-wrap: balance` on headings; `font-variant-numeric: tabular-nums` on any digits that tick or align.

**Shape:** radius by role — 14 px for the report card and big panels, 10 px for buttons, 6 px for chips, 0 for section dividers. Never one radius on everything. Shadows almost absent on black; separate surfaces with `--coal`/`--graphite` and 1 px lines.

**Icon:** the reticle with an AI node (from the report template), redrawn in white lines with an orange center node. Use it as favicon, header mark, and as the hero's subtle reticle that "locks on" the promise.

## 5. Page structure (one action, eight blocks)

1. **Hero.** Left: H1, sub, primary CTA, micro-note «Ответим в Telegram в течение дня». Right: **the live report row** (wow scene, §6). Mobile: H1 → CTA → card. Size the hero to content, not `100vh`.
2. **Cost of one forgotten client.** One sentence that the call is already paid for by ads + a compact calculation built only from numbers in `03_Деньги_в_одном_замере.md`, cited («по данным рынка…»). One ticking number (NumberFlow-style digit roll, CSS/JS, no library) — the only other motion moment, triggered once on view.
3. **How it works.** Exactly three steps (a real sequence → numbered markers are allowed here and nowhere else): записи звонков → ИИ находит обещания и сверяет с CRM → два раза в день список «кому позвонить сегодня». Never say «тестовые звонки», «учебный пример», «вымышленные данные» on the page; say «пример из отчёта». Never invent statistics: only measured numbers (e.g. 18 из 18). Header tagline is «ИИ-аналитика» (Pricel is an umbrella brand, not calls-only).
4. **Report sample.** A larger, static, clearly labelled «Учебный пример» of the morning report: 2–3 rows, quote + timestamp + promise + CRM status + action. Fictional data only.
5. **Your data stays yours.** Three plain facts: recognition on our machine; names/phones masked before AI; records deleted after the pilot on request. No fake badges or certificates.
6. **Price.** The ladder free → pilot → subscription as one horizontal track, not three identical cards. Free review visually dominant.
7. **Questions.** 5–6 objections from `09_Позиционирование_и_возражения.md` as accessible `<details>`: «Битрикс уже оценивает звонки», «РОП сам слушает», «Записи не дадим», «Дорого», «Что если ничего не найдёте».
8. **Final CTA + contacts.** Repeat the action, Telegram link, phone as text, `pricel-ai.ru`. Footer: ИП details placeholder, «© Прицел, 2026».

A sticky bottom CTA bar appears on mobile after the hero scrolls away.

## 6. The wow scene — the live report row

One orchestrated sequence on page load (~2.4 s total), then still:
1. Card frame and meta line («Учебный пример · звонок 21.11, 10:12») fade in.
2. Client line types/reveals: `01:47` Клиент: «Да, **замер нужен**, лучше на неделе» — the phrase gets an orange underline sweep.
3. Manager line: `02:14` Менеджер: «**Перезвоню до 13:00** и согласуем время» — highlight sweep in `--flame`.
4. The reticle icon slides to the promise and "locks" (scale 1.15 → 1, ring tightens).
5. Status flips with a short tick: «В CRM: ни звонка, ни замера» in `--alarm`.
6. Action drops in: «Позвонить сегодня до 12:00 · предложить два окна» in `--flame`.

Rules: complete and readable at rest (no element waits at `opacity: 0`; start from ≥ 0.15 opacity or final state for screenshots); `prefers-reduced-motion` → final state instantly; a small «Повторить» text button replays it; no scroll-jacking; nothing else on the page animates on load.

## 7. Motion budget

- One load sequence (hero), one on-view number roll (block 2), hover/press feedback on buttons (≤ 150 ms), `<details>` open/close. Nothing else.
- Curves and durations from the `animate` skill tokens. Review every animation at 25% speed before shipping.
- No fade-and-slide-up on every section. No parallax. No cursor effects.

## 8. Copy rules

- Write as Maxim talks to an owner: short, concrete, no anglicisms (no «лид-менеджмент», «конверсия» only if unavoidable), no exclamation marks.
- Headline candidates direction: «Клиенты, которым обещали замер и забыли» / «Каждое утро — список, кому вы обещали перезвонить». Must name the outcome and the audience.
- Never promise numbers («вернём 30%», «окупится за неделю»). Allowed: «покажем, что найдётся», cost math from cited sources.
- CTA text states exactly what happens: «Разобрать 10 звонков бесплатно». No «→» glyph appended. No emoji.
- No ALL-CAPS eyebrow labels above headings; no «A · B · C» meta strings as decoration; no em-dash fragment labels.

## 9. Anti-patterns (instant reject)

Inter / Roboto / Open Sans / Lato / Arial / system fonts; purple or blue gradients; cream background with terracotta; near-black with one acid accent and nothing else; identical rounded cards with the same grey shadow; numbered 01/02/03 outside block 3; centered-everything layout; emoji as icons; stock photos of handshakes or headsets; fake logos, fake testimonials, fake counters; glowing/moving elements in more than the two allowed places; default shadcn look.

## 10. Technical constraints

- Plain HTML + CSS + a few lines of vanilla JS in `docs/`. No frameworks, no build step, no external requests at runtime (fonts, icons, images all local). No forms, no cookies, no analytics (152-ФЗ).
- Semantic HTML, one `<h1>`, landmarks, visible focus (orange 2 px ring), skip link, contrast AA, tap targets ≥ 44 px, `lang="ru"`.
- SEO: `<title>` «Прицел — кому вы обещали перезвонить», meta description ≤ 160 chars, Open Graph + `og-image.png` 1200×630 (black, reticle, headline), `canonical` https://pricel-ai.ru/, `robots.txt`, `sitemap.xml`, `404.html` in the same style.
- Files: `docs/index.html`, `docs/assets/css/site.css`, `docs/assets/js/site.js` (≤ 5 KB), `docs/assets/fonts/*.woff2`, `docs/favicon.svg`, `docs/CNAME` = `pricel-ai.ru`, `docs/.nojekyll`.
- Performance: total page ≤ 300 KB before fonts, LCP text-based, fonts `font-display: swap` with metric-compatible fallbacks.

## 11. Verification loop (do not skip)

1. Screenshot at 375 px and 1440 px (static preview, then the live page).
2. Run `impeccable critique` against the screenshots; list the top 5 issues; fix them in one batch.
3. Re-screenshot once; run `impeccable polish`; then `audit`.
4. Replay the hero sequence at 25% speed; fix timing.
5. Read every Russian sentence aloud in your head: would an owner of a window company say it? If not, rewrite.
6. Final mirror check (Chanel): remove one accessory.

## 12. Deliverables and definition of done

- `docs/` complete and valid, opens from the file system and from GitHub Pages without errors.
- Hero passes the five-second test: what it is, for whom, what to do.
- Exactly one wow scene, one secondary motion, everything else still.
- All numbers on the page trace to a cited Obsidian note.
- A copy of the final `docs/` and of the page texts saved to `Obsidian\Проекты\Прицел\13_Материалы\02_Сайт\`.
- A short report to Maxim (in Russian): what was built, what was checked, what still needs his input (Telegram username, phone, ИП details).
