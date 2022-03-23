import React from 'react'
import { FaEye } from 'react-icons/fa'
import IconTextButton from './IconTextButton.js'

export default function NavLinks(props) {
  return (
      <div className="flex flex-col">
        <IconTextButton icon={<FaEye size="30"/>} text="Viewer" color="blue" active={(props.active === "viewer")} />
      </div>
    );
  }