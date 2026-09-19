Storybook (на примере приложения Unidev)

1.Установка 

npx storybook@latest init

везде yes, он создаст много фаилов – удалить все лишнее. Так же в package.json появится скрипты для запуска и сборки

Запуск – npm run storybook

2. Интеграция со Styled components (подтягивание тем и глобальных стилей)

Добавляем еще один пакет 

npx storybook@latest add @storybook/addon-themes

Затем в фаиле preview.ts добавляем декоратор куда прокидываем глобальные стили и темы

import { GlobalStyles, appTheme } from './../src/theme';

import { ThemeProvider } from 'styled-components';

import { withThemeFromJSXProvider } from '@storybook/addon-themes';

export const decorators = [

  withThemeFromJSXProvider({

  themes: {

    light: appTheme.light,

    dark: appTheme.dark,

  },

  defaultTheme: 'light',

  Provider: ThemeProvider,

  GlobalStyles,

})];

3. Использование

Сторибук будет создавать примеры на основании всех фаилов с расширением .stories. – поэтому в папке компоненты создаем фаил componentName.stories.ts – и в нем по образу и подобию меняем название компонент и варианты использования.  Описание пропсов и описание заголовка берутся из закомментированных сообщений в главном tsx фаиле компоненты. Но вариант лучше – в stories поле argTypes – где можно указывать и описание и дефолтное значение и тип контроллера (при визуализации в конце строки -  выбор цвета, строка, радио и т д)  

 argTypes: {

    checkedChildren: { description: 'checkedChildren description', defaultValue: '', control: 'text' },

    unCheckedChildren: { description: 'unCheckedChildren description', control: 'text' },

  },
