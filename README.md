# vanilla-js-archive

Personal knowledge base for JavaScript/TypeScript interview preparation: algorithms, data structures, design patterns, LeetCode solutions, and company-specific tasks.

## Structure

```
.
├── fundamentals/          # Core CS topics
│   ├── algorithms/
│   ├── data-structures/
│   └── design-patterns/
├── problems/              # Canonical solutions (deduplicated)
├── leetcode/              # LeetCode-style tasks by difficulty
├── interviews/
│   ├── by-company/        # Tasks grouped by employer
│   ├── sessions/          # General interview sessions (2023, 2024)
│   ├── misc/              # Uncategorized interview snippets
│   └── html/              # HTML drafts
├── frontend/
│   ├── react/
│   └── typescript/
├── shared/                # testCase, perf helpers, utilities
├── docs/technologies/     # Technology cheat sheets (.docx)
└── scripts/               # Test runner
```

## Quick start

Run a single file:

```bash
node leetcode/easy/array/twoSum.js
node problems/reverse-string/solution.js
```

Run all files that use the shared test helper:

```bash
npm test
npm run test:leetcode
npm run test:problems
```

TypeScript notes (`frontend/typescript/`):

```bash
cd frontend/typescript && npx tsc
```

## Conventions

| Topic | Location | Notes |
|-------|----------|-------|
| Best version of a recurring task | `problems/<slug>/` | See [problems/README.md](./problems/README.md) |
| LeetCode solutions | `leetcode/easy\|medium/...` | Uses `#shared/testCase` |
| Company interviews | `interviews/by-company/<slug>/` | Latin slug + `meta.json` display name |
| Theory quizzes (event loop, TDZ) | `interviews/sessions/*/tasks/` | Often console output only |
| Design patterns | `fundamentals/design-patterns/` | Self-contained examples |

## Shared imports

Root `package.json` defines subpath imports so depth does not matter:

```js
const testCase = require('#shared/testCase');
```

## Adding new material

1. **Recurring algorithm** — add to `problems/<slug>/`, link from interview copies.
2. **Company task** — `interviews/by-company/<slug>/<year>/` with a descriptive filename (`deep-copy.js`, not `task1.js`).
3. **LeetCode** — prefer `leetcode/<difficulty>/<topic>/` and reuse `#shared/testCase`.

## Migration notes

This layout replaces the former top-level folders:

| Old path | New path |
|----------|----------|
| `Algorithms/` | `fundamentals/algorithms/` |
| `DataStructures/` | `fundamentals/data-structures/` |
| `DesignPatterns/` | `fundamentals/design-patterns/` |
| `Helpers/` | `shared/` |
| `InterviewDraft/` | `interviews/`, `leetcode/`, `frontend/` |
| `Documents/technologies/` | `docs/technologies/` |

Further deduplication into `problems/` is ongoing — see [problems/README.md](./problems/README.md).
