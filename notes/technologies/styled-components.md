Styled Components

Ссылка видео - https://www.youtube.com/watch?v=cNUTCKq-_-Y HYPERLINK "https://www.youtube.com/watch?v=cNUTCKq-_-Y&ab_channel=UlbiTV"& HYPERLINK "https://www.youtube.com/watch?v=cNUTCKq-_-Y&ab_channel=UlbiTV"ab_channel=UlbiTV

1. Инсталл 

npm i styled-components 

так же установить пакет с типизацией

2. Использование

Создание 

import styled from 'styled-components'

const Wrapper = styled.div`

  \стили  

`

Глобальные стили

import {createGlobalStyle} from 'styled-components'

const Global = createGlobalStyle`

  * {

    \глобальные стили  

  }

`

и затем подключаем компоненту (не оборачиваем) где нибудь в корне <Global \>

Пропсы 

--Подключение 

<Wpapper color='red' back="black" primary={true} \>

--Создание

const Wrapper = styled.div`

  // прокидываение пропса в свойство

  color: ${props => props.color || 'white'};

  background: ${props => props.back || 'black'} либо

  background: ${({back })=> back || 'black'}

  // псевдоклассы

  &: hover {

     ...

  }

  // несколько стилей в зависимости от одного пропса

  ${props => props.primary && css`

     color: yellow; 

     ...

  `}  

`

Унаследование от другого компонента

const Wrapper2 = styled(Wrapper)`

  добавляем новые стили

`

Темы

на верхнем уровне прописываем обьек 

const theme = {

  colors: {

     primary: 'green';

     secondary: 'red'

  }

}

В <ThemeProvider theme={theme}> оборачиваем все наше приложение 

и уже в стилях в любой компоненте можем указывать цвет как 

color: ${props => props.color || props.theme.color};
