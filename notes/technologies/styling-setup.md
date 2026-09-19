НАСТРОЙКА СТИЛЕЙ НА ПРИМЕРЕ STYLED COMPONENTS (на примере проекта Streamline)

1. Создать папку theme (в нее все складывать) и фаил с цветами

export const COLORS = {

  BLUE_1: '#4b5d7d',

  BLUE_2: '#2e6da4',

}

2. Создать дефолтные шрифты (подключить или через линк или в css прямо в проект)

export const DEFAULT_FONT_SIZE = '14px';

export const RUBIK_FONT_FAMILY = "'Rubik', sans-serif";

3. Создать обьект theme (можно несколько , которые потом можно подменять при переключении светлой темной темы)

export const theme = {

  colors: {

    'green': COLORS.GREEN_1,

    'green-2': COLORS.GREEN_2,

    ...

  },

  fontFamily: {

    rubik: RUBIK_FONT_FAMILY,

  },

  boldText: {

    normal: 400,

    bold: 500,

    dark: 600,

  },

4 Обернуть приложение в ThemeProvider и туда прокинуть темы

<ThemeProvider theme={theme}></ThemeProvider>

      <GlobalStyles />

      <App />

 </ThemeProvider>

5. Создать компоненту с глобальными стилями и подключить их рядома с проектом (пункт 4)

export const GlobalStyles = createGlobalStyle`

  html, body {

    font-family: ${RUBIK_FONT_FAMILY};

    font-size: ${DEFAULT_FONT_SIZE};

  }

`

6. Использование 

В самих компонентах можно прописывать цвет и всю стилистику либо из созданных констант, либо из темы (похорошему из темы так как ее можно будет потом менять светлую-темную)

export const Button = styled.button`

  color: ${COLORS.GREY_3};

  color: ${( props ) => props.theme.colors.green};

`

Свойство theme всегда есть по умолчанию у props

7. По желанию можно добавлять миксины

- создание

export const rowMixin = css`

  padding: 8px 0;

  margin-bottom: 16px;

`;

-использование

export const Header = styled(Row)`

  ${rowMixin};

`;

-------------------------------------------------------------------

Модульность стилей.

Для инкапсуляции стилей в своих компонентах в сборке create-react-app добавлены module. Суть -  при сборке проекта к классу добавляется хэш и если есть классы с одинаковым названием в разных компонентах - они не перебьют друг друга. 

Создание - файл с стилями должен быть вида name.module.[css/scss/sass]  

внутри обычные стили

Подключение в компоненте

import styles from '...'

<Button className={styles.active}></Button>

Что такое normalize ?  Сборка cra предоставляет возможность кроссбраузерного написания стилей, то есть стили пишутся как обычно, но при сборке проекта будут добавлены стили для всех браузеров (-webkit..., -moz-osx ) . Для подключения в любом месте (как правило в глобальном index.css) добавляется строка @import-normalize;
