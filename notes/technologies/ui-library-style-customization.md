Customize Styles

ANTD

Можно кастомизировать через обертку либо всего приложения либо в частности компоненты

https://ant.design/docs/react/customize-theme

import { Button, ConfigProvider, Space } from 'antd';

import React from 'react';

const App: React.FC = () => (

  <ConfigProvider

    theme={{

      token: {

        // Seed Token

        colorPrimary: '#00b96b',

        borderRadius: 2,

        // Alias Token

        colorBgContainer: '#f6ffed',

      },

    }}

  >

    <Space>

      <Button type="primary">Primary</Button>

      <Button>Default</Button>

    </Space>

  </ConfigProvider>

);

Можно кастомизировать через переопределение стилей библиотек. (в консоли разработчика посмотреть классы и переопределить их)

Особенности – если использовать module css – иметь ввиду что он добавляет к классу хэш, поэтому либо определять глобольные стили , либо по схеме Армана искать стили по части названия 

    div[class*="Modal__FlexWrapperColumn"] {

      max-width: 460px;

    }

Material UI.

https://mui.com/material-ui/customization/how-to-customize/#2-reusable-component

Либо через задание стилей через sx пропс

<Slider

  defaultValue={30}

  sx={{

    width: 300,

    color: 'success.main',

  }}

/>

Либо так же через переопределение классов самой библиотеки

.MenuItem.Mui-selected {

  color: blue;

}
