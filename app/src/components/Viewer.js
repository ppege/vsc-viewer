import Assignment from './Assignment.js'
import React, { useState, useEffect } from 'react'

export default function Viewer() {
    const [ assignments, setAssignments ] = useState(new Map())
    useEffect(() => {
        fetch()
        .then(response => response.json())
        .then((data) => {
        setAssignments(data.map((assignment) => (
            <Assignment subject={assignment.subject} description={assignment.description} date={assignment.date} />
        )))
        })
    }, [])
    return (
        <div className="grid gap-4 grid-cols-3 grid-rows-3">
          {assignments}
        </div>
    )
}