# Frontend Interview Prep (JavaScript / TypeScript)

Personal handbook for **frontend coding interviews**: algorithms, data structures, GoF design patterns, LeetCode-style tasks, React / TypeScript drills, and solutions from real company screens (Yandex, Avito, Revolut, and others).

No build step - open any `.js` / `.ts` file and run it with Node or in the browser console.

## Contents

| Path | What is inside |
| --- | --- |
| [`algorithms/`](algorithms/) | Search, sorts, misc algorithms |
| [`data-structures/`](data-structures/) | Array, linked list, stack, queue, hash table, tree, graph |
| [`design-patterns/`](design-patterns/) | Creational, structural, behavioral (GoF) in vanilla JS |
| [`helpers/`](helpers/) | Small utilities (timing, test helpers, hashing) |
| [`interview/`](interview/) | Company tasks, LeetCode, React, TypeScript, session notes |
| [`notes/technologies/`](notes/technologies/) | Short tech notes (Node, Next.js, Redux, Webpack, …) |

### Interview layout

```text
interview/
├── companies/     # aston, avito, yandex, revolut, tinkoff, …
├── leetcode/      # easy | medium by topic
├── react/
├── typescript/
├── html/
└── sessions/      # year-based practice dumps
```

## Companies covered

[alfa-bank](interview/companies/alfa-bank/) ·
[aston](interview/companies/aston/) ·
[avito](interview/companies/avito/) ·
[epam](interview/companies/epam/) ·
[hh](interview/companies/hh/) ·
[mts](interview/companies/mts/) ·
[okko](interview/companies/okko/) ·
[revolut](interview/companies/revolut/) ·
[sber-risks](interview/companies/sber-risks/) ·
[tele2](interview/companies/tele2/) ·
[tinkoff](interview/companies/tinkoff/) ·
[vk](interview/companies/vk/) ·
[wildberries](interview/companies/wildberries/) ·
[x5](interview/companies/x5/) ·
[yandex](interview/companies/yandex/)

## Naming conventions

- Paths and filenames: **kebab-case**, ASCII only
- Prefer the **problem name** in the filename (`memoize.js`, `solo-keyboard-game.js`)
- Company folders: lowercase English / transliteration (`tinkoff`, not `Тинькофф`)

## Quick start

```bash
git clone https://github.com/anatoly-kulishov/frontend-interview-prep.git
cd frontend-interview-prep
node interview/companies/yandex/2026/coderun/memoize.js
```

## License

Personal learning material. Use at your own risk; not an official dump of any company's private tasks.
