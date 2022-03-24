import React from 'react'
import logo from '../logo.png'
import IconText from './IconText.js'

export default function Header(props) {
  return (
    <div className="font-bold">
      <IconText icon={<img src={logo} alt="logo" className="w-10 h-10 rounded" />} text="Viggo Viewer" />
    </div>
    );
  }