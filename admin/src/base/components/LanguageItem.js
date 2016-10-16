import React from 'react'
import classNames from 'classnames'

const LanguageItem = ({ current_locale, name, locale, onClick }) => {
  let link = `?locale=${locale}`
  let className = classNames({
    'active-locale': current_locale == locale
  })
  return (
    <li>
      <a className={className} onClick={onClick} href={link}>{name}</a>
    </li>
  )
}

export default LanguageItem
