ESLINT (на примере приложения Unidev)

https://www.youtube.com/watch?v=RXaltL8yIlc HYPERLINK "https://www.youtube.com/watch?v=RXaltL8yIlc&ab_channel=%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%D0%9D%D0%B5%D0%BF%D0%BE%D0%BC%D0%BD%D1%8F%D1%89%D0%B8%D0%B9"& HYPERLINK "https://www.youtube.com/watch?v=RXaltL8yIlc&ab_channel=%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%D0%9D%D0%B5%D0%BF%D0%BE%D0%BC%D0%BD%D1%8F%D1%89%D0%B8%D0%B9"ab_channel=%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%D0%9D%D0%B5%D0%BF%D0%BE%D0%BC%D0%BD%D1%8F%D1%89%D0%B8%D0%B9

https://dev.to/eprikhodko/eslint-prettier-vs-code-create-react-app-airbnb-52bc

1. Установка 

У CRA Eslint установлен под капотом. 

Установить утилиту VScode - Eslint

Установка с Airbnb конфигом

Можно создать через 

npx eslint --init  (отвечая на вопросы)

либо добавить конфиг самому:

- ставим eslint

npm install eslint eslint-config-airbnb --save-dev

- в eslintrc в extends прописывает airbnb 

  "extends": "airbnb",

2. Создание конфига 

В корне создаем фаил .eslintrc и переносим туда стандартные настройки из package.json

{

  "extends": [

    "react-app",

    "react-app/jest"

  ]

}

Затем добавляем правила.

Общий вид фаила

{

  "extends": [

    "react-app",

    "react-app/jest"

  ],

  "rules": {

    "react/react-in-jsx-scope": "off", - отключать некоторые правила из extends

    "react/prop-types": "off",- отключать некоторые правила из extends

    "no-console": "warn",  - не использовать консоль

    "quotes": ["error", "single"],  - не использовать двойные ковычки только одинарные

    "jsx-quotes": ["error", "prefer-double"], - ковычки для jsx 

    "prefer-const": "error", - если переменная не изменяется - то const

    "indent": ["warn", 2], - стандартный отступ в 2 пробела

    "semi": ["warn", "always"], - точка с запятой в конце чего-либо

    "max-len": ["warn", 120], - длина строки

    "comma-dangle": ["warn", "always-multiline"], - запятая в у последнего элемента массива/обьекта

    "import/order": ["error", {

      "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],  - настройки импортов - разделять импорты на группы и в этом порядке размещать

      "newlines-between": "always"  - разделять блоки импортов строкой

    }]

  }

}

2. Скрипт для проверки стилей

В package.json в scripts прописываем 

"lint": "eslint -c .eslintrc --ext .js .jsx",  // запустить линт с конфигом .eslintrc и проверять фаилы js jsx

"lint:fix": "npm run lint -- --fix",

РАБОТА PRETTIER

https://www.youtube.com/watch?v=lTeza7Vxo8c HYPERLINK "https://www.youtube.com/watch?v=lTeza7Vxo8c&ab_channel=%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%D0%9D%D0%B5%D0%BF%D0%BE%D0%BC%D0%BD%D1%8F%D1%89%D0%B8%D0%B9"& HYPERLINK "https://www.youtube.com/watch?v=lTeza7Vxo8c&ab_channel=%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%D0%9D%D0%B5%D0%BF%D0%BE%D0%BC%D0%BD%D1%8F%D1%89%D0%B8%D0%B9"ab_channel=%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%D0%9D%D0%B5%D0%BF%D0%BE%D0%BC%D0%BD%D1%8F%D1%89%D0%B8%D0%B9

Устанавливаем и настраиваем Eslint

Создаем конфиг в корне .prettierrc

{

  "semi": true, // точка с запятой в конце

  "trailingComma": "all", // запятые в конце обьекта/массива

  "singleQuote": true, // одинарные ковычки

  "jsxSingleQuote": false, // одинарные ковычки для JSX

  "printWidth": 120, // ширина строки

  "tabWidth": 2, // отступы

  "parser": "typescript",

  "arrowParens": "avoid", // скобки вокруг аргумента в стрелочной функции

  "endOfLine": "auto" // auto, lf, crlf - конец строки для виндовс или линукс 

}

ФОРМАТИРОВАНИЕ ПРИ СОХРАНЕНИИ ФАИЛА

В фаил setting.json (его можно найти в VScode через Settings и в поисковой строке editor.codeActionsOnSave - ЭТО НЕ ФАИЛ ПРОЕКТА ) добавить в него:

{

  "editor.defaultFormatter": "esbenp.prettier-vscode", // форматирование преттиером,

  "editor.codeActionsOnSave": {

    "source.fixAll.eslint": true   - фиксить линтом при сохранении

  }

}

В поиске в настройках VScode по Format On Save должна стоять птичка.

РАБОТА ESLINT и PRETTIER

Устанавливаем плагины

npm i -D eslint-config-prettier eslint-plugin-prettier prettier eslint

В .eslintrc in extends добавить [..., 'plugin:prettier/recommended']

В rules добавить 'prettier/prettier': ['warn', {endOfLine: 'auto'}] - что делать, если правила отличаются друг от друга

--------------------------------------

ФАИЛ .editorconfig

Предназначен для дефолтных настроек при создании фаила

Его содержимое(ОБЯЗАТЕЛЬНО УДАЛИТЬ КОММЕНТАРИИ):

# Editor configuration, see http://editorconfig.org

root = true

[*] // все фаилы

charset = utf-8

indent_style = space

indent_size = 2  // пробелы при табе

end_of_line = lf  // lf или ctlf  - коретка для windows или linux

insert_final_newline = true

trim_trailing_whitespace = true

[*.md]  // md фаилы

max_line_length = off

trim_trailing_whitespace = false

----------------------------------------------------------------------------------------------------------------------------------------

УТСАНОВКА НА ПРОЕКТ ESLINT PRETTIER AIRBNB (пошаговая установка)

  Установить все зависимости

npx eslint --init  (отвечая на вопросы, для eslint выбрать json)

npm i -D eslint prettier eslint-config-prettier eslint-plugin-prettier 

       npm i  @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-config-airbnb-typescript --save-dev

  В корень проекта добавить фаил .prettierrc

  {

    "semi": true,

    "trailingComma": "all",

    "singleQuote": true,

    "jsxSingleQuote": false,

    "printWidth": 120,

    "tabWidth": 2,

    "parser": "typescript",

    "arrowParens": "avoid",

    "endOfLine": "auto"

  }

      3. В корень проекта добавить фаил .eslintrc.json (он уже подфикшен где нужно)

{

    "env": {

        "browser": true,

        "es2021": true

    },

    "settings": {

        "react": {

          "version": "detect"

        }

    },

    "extends": [

        "airbnb-typescript",

        "eslint:recommended",

        "plugin:@typescript-eslint/recommended",

        "plugin:react/recommended",

        "plugin:prettier/recommended"

    ],

    "parser": "@typescript-eslint/parser",

    "parserOptions": {

        "ecmaVersion": "latest",

        "sourceType": "module",

        "project": ["./tsconfig.json"]

    },

    "plugins": [

        "@typescript-eslint",

        "react",

        "react-hooks",

        "simple-import-sort",

        "import"

    ],

    "overrides": [  // ограничивает использование правил для фаилов по расширению

        {

          "files": [

            "*.ts",

            "*.tsx",

            "*.js",

            "*.jsx"

          ],

          "rules": {

            // turned off rules

            "react/react-in-jsx-scope": "off",

            "react/prop-types": "off",

            "react/jsx-props-no-spreading": "off",

            "import/prefer-default-export": "off",

            "import/no-named-as-default": "off",

            "import/no-named-default": "off",

            "consistent-return": "off",

            "no-restricted-exports": "off",

            "no-param-reassign": "off",

            "react/no-array-index-key": "off",

            "react/require-default-props": "off",

            "no-shadow": "off",

            "@typescript-eslint/no-shadow": "off",

            "@typescript-eslint/no-unused-expressions": "off",

            "react/jsx-boolean-value": "off",

            "prefer-regex-literals": "off",

            "@typescript-eslint/no-use-before-define": "off",

            "@typescript-eslint/naming-convention": "off",

            "no-plusplus": "off",

            "no-console": "warn",

            "quotes": ["error", "single"],

            "jsx-quotes": ["error", "prefer-double"],

            "prefer-const": "error",

            "indent": ["warn", 2],

            "semi": ["warn", "always"],

            "max-len": ["warn", 120],

            "comma-dangle": ["warn", "always-multiline"],

            "simple-import-sort/imports": ["error", {

                "groups": [

                  ["^react", "^", "^\\u0000"], // node_modules

                  ["^\\.\\."], // reltive paths(other folders)

                  ["^\\."], // relative paths (current folders)

                  ["^.+\\.?(scss)$", "^.+\\.?(styles)$", "^.+\\.?(css)$"] // styles in scss and ts

                ]

              }],

            "prettier/prettier": ["warn", {"endOfLine": "auto"}]

        }

    }]

}

4. Удалить из package.json дефолтные настройки eslint

5. Проверить автофикс при сохранении фаила из пункта выше (ФОРМАТИРОВАНИЕ ПРИ СОХРАНЕНИИ)
