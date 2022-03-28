import Assignment from './Assignment.js'
import IconButton from './IconButton.js'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

export default function Viewer(props) {
    const findStartOfWeek = (Date) => {
        return dayjs(Date).startOf('week')
    }
    const dateToString = (dateString) => {
        return findStartOfWeek(dayjs(dateString)).format('YYYY-MM-DD')
    }
    const backOneWeek = () => {
        setDate(dateToString(dayjs(date).subtract(7, 'day')))
    }
    const forwardOneWeek = () => {
        setDate(dateToString(dayjs(date).add(7, 'day')))
    }
    const [ date, setDate ] = useState(dateToString(new Date()));
    const [ assignments, setAssignments ] = useState(new Map())
    useEffect(() => {
        function isBeforeToday(dateString) {
            if (props.settings.ignoreOldAssignments) {
                const today = new Date()
                const assignmentDate = new Date(dateString + ' ' + today.getFullYear())
                return assignmentDate < today
            }
            return false
        }
        if (!props.settings) {
            setAssignments(<Assignment {...{subject: "Credentials not set", description: "Please enter your ViGGO credentials in the settings menu."}} key="Loading" fullText={true} />)
            return;
        }
        setAssignments(<Assignment {...{subject: "Loading...", description: "Please wait a moment. This will never finish loading if you haven't set your credentials correctly in the settings."}} key="Loading" fullText={true} />)
        axios.get(`https://api.nangurepo.com/v2/scrape?username=${props.settings.username}&password=${props.settings.password}&subdomain=${props.settings.subdomain}&date=${date}`)
        .then((response) => {
            if (!response.data.length) {
                setAssignments(<Assignment {...{subject: "No assignments found", description: "No assignments were found for this date. You may have entered your credentials incorrectly."}} key="No assignments" fullText={true} />)
                return;
            }
            let dataMap = response.data.reverse().map((assignment) => (
                isBeforeToday(assignment.date) ? null:<Assignment {...assignment} key={assignment.url} fullText={props.settings.viewFull} />
            ))
            setAssignments(dataMap)
        })
    }, [props.settings, date])
    return (
        <div className="flex flex-col">
            <div className="bg-gray-100 dark:bg-gray-700 items-center justify-center text-center rounded w-fit h-fit flex flex-row">
                <IconButton icon={<FaAngleLeft size="30" />} className="w-min h-min border-0" onClick={backOneWeek} />
                <h1 className="text-xl md:text-3xl font-mono mr-2 ml-2">{date}</h1>
                <IconButton icon={<FaAngleRight size="30" />} className="w-min h-min border-0" onClick={forwardOneWeek} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                {assignments}
            </div>
        </div>
    )
}