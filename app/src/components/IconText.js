import React from 'react'

export default function IconText(props) {
    return (
        <div className="w-full h-full flex flex-row items-center">
            {props.icon}
            <h2 className="text-xl ml-3">{props.text}</h2>
        </div>
    )
}