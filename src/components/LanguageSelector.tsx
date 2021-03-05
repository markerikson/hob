import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = () => {
    i18n.changeLanguage('en')
  }

  return (
    <div onChange={changeLanguage}>
      <input type="radio" value="en" name="language" defaultChecked /> English
      <input type="radio" value="zh-hk" name="language"/> Traditional Chinese
    </div>
  )
}

export default LanguageSelector