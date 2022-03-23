import React from 'react'
import IconText from './IconText.js'

export default function IconTextButton(props) {
    return (
        <button className={`h-16 hover:bg-gray-200 rounded ${props.active ? 'bg-gray-200': ''}`}>
            <div className="ml-2"><IconText text={props.text} icon={<div className={`bg-${props.color}-300/50 rounded w-12 h-12 flex justify-center items-center`}>{props.icon}</div>} /></div>
        </button>
    )
}