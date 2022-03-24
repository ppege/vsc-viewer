import React from 'react'
import IconText from './IconText.js'

export default function IconTextButton(props) {
    return (
        <button className={`h-16 hover:bg-gray-200 dark:hover:bg-gray-800 rounded ${props.active ? 'bg-gray-200 dark:bg-gray-800':null} ${props.className}`} onClick={props.onClick}>
            <div className="ml-2"><IconText text={props.text} icon={<div className={`${props.imgClass} rounded w-12 h-12 flex justify-center items-center`}>{props.icon}</div>} /></div>
        </button>
    )
}