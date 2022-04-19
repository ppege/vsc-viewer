import React from 'react'
import reactStringReplace from 'react-string-replace'

export default function LinkText(props) {
    return (
        <p className={props.className}>
            {
                reactStringReplace(props.text, /(https?:\/\/[^\s]+)/g, (match, i) => (
                    <a className="text-blue-500 dark:text-blue-400 hover:underline" href={match} key={i} target="_blank" rel="noopener noreferrer">{match}</a>
                ))
            }
        </p>
    )
}
