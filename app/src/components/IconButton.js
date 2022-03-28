import React from 'react'

export default function IconButton(props) {
    return (
        <button type="button" onClick={props.onClick} className={`bg-transparent items-center justify-center text-black font-light hover:text-white hover:bg-black py-3 px-4 dark:text-white dark:hover:bg-white dark:hover:text-black rounded ${props.className}`}>
            <div>{props.icon}</div>
        </button>
    )
}