import Assignment from './Assignment.js'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Viewer(props) {
    const [ assignments, setAssignments ] = useState(new Map())
    useEffect(() => {
        if (props.credentials === null) {
            return;
        }
        if (props.credentials.username === undefined) {
            setAssignments(<Assignment content={{subject: "Loading...", description: "Please wait a moment. This will never finish loading if you haven't set your credentials in the settings."}} key="Loading" fullText={true} />)
            return;
        }
        axios.get(`https://api.nangurepo.com/v2/scrape?username=${props.credentials.username}&password=${props.credentials.password}&subdomain=${props.credentials.subdomain}`)
        .then((response) => {
            let dataMap = response.data.reverse().map((assignment) => (
                <Assignment content={assignment} key={assignment.url} fullText={props.credentials.viewFull} />
            ))
            setAssignments(dataMap)
        })
    }, [props.credentials])
    return (
        <div className="grid gap-4 grid-cols-3 grid-rows-2">
          {assignments}
        </div>
    )
}