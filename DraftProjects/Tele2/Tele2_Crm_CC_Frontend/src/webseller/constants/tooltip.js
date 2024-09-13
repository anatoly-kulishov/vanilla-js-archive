import React, { Fragment } from 'react'
import { Title } from 'webseller/components'

export const transferNumberTooltip = (
  <Fragment>
    <Title>Нужно уточнить у клиента, что номер:</Title>
    <ul>
      <li>не заблокирован;</li>
      <li>с положительным балансом (нет задолженности);</li>
      <li>оформлен на клиента;</li>
      <li>переносится в пределах домашнего региона;</li>
      <li>не переносили за последние 60 дней.</li>
    </ul>
  </Fragment>
)
