# Interviews

Interview tasks are split by source instead of mixing companies and generic sessions.

## Layout

```
interviews/
├── by-company/<slug>/     # Employer-specific tasks
│   ├── meta.json          # slug + displayName
│   └── <year>/            # Optional: livecoding/, tech/, tasks/
├── sessions/<year>/       # General sessions not tied to one company
│   ├── algorithms/
│   └── tasks/
├── misc/                  # Snippets without clear metadata
└── html/                  # HTML drafts
```

## Company slugs

| Slug | Display name |
|------|--------------|
| `yandex` | Yandex |
| `tinkoff` | Тинькофф |
| `alfa-bank` | Альфа-банк |
| `mts` | МТС |
| `sber-riski` | Сбер Риски |
| `aston` | Aston |
| `avito` | Avito |
| `epam` | EPAM |
| `revolut` | Revolut |
| `x5` | X5 |
| `vk` | VK |
| `hh` | HeadHunter |
| `tele2` | Tele2 |
| `wildberries` | Wildberries |

Recommended folder template for new entries:

```
interviews/by-company/<slug>/<year>/
  livecoding/
  theory/
  take-home/
  README.md
```

Monolithic year files (`2024.js`) were split into `/<year>/theory/` for MTS, Альфа-банк, and Сбер Риски.

When a task already exists in `problems/`, keep a thin reference file or link in comments instead of copying the full solution.
