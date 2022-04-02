import Assignment from './Assignment.js'
import IconButton from './IconButton.js'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

export default function Viewer(props) {
    const findStartOfWeek = (Date) => {
        return dayjs(Date).startOf('week').add(1, 'day')
    }
    const dateToString = (dateString) => {
        return findStartOfWeek(dayjs(dateString)).format('YYYY-MM-DD')
    }
    const travelOneWeek = (direction) => {
        switch (direction) {
            case 'back':
                setDate(dateToString(dayjs(date).subtract(7, 'day')))
                break;
            case 'forward':
                setDate(dateToString(dayjs(date).add(7, 'day')))
                break;
            default:
                break;
        }
    }
    const [ date, setDate ] = useState(dateToString(new Date()));
    const [ assignments, setAssignments ] = useState(new Map())
    useEffect(() => {
        if (!props.credentials) {
            setAssignments(<Assignment {...{subject: "Credentials not set", description: "Please enter your ViGGO credentials in the settings menu."}} key="Loading" isMessage={true} />)
            return;
        }
        setAssignments(<Assignment {...{subject: "Loading...", description: "Please wait a moment."}} key="Loading" isMessage={true} />)
        axios.get(`https://api.nangurepo.com/v2/scrape?username=${props.credentials.username}&password=${props.credentials.password}&subdomain=${props.credentials.subdomain}&date=${date}`)
        .then((response) => {
            if (!response.data.length) {
                setAssignments(<Assignment {...{subject: "No assignments found", description: "No assignments were found for this date. You may have entered your credentials incorrectly."}} key="No assignments" isMessage={true} />)
                return;
            }
            let dataMap = response.data.reverse().map((assignment) => (
                <Assignment {...assignment} key={assignment.url} />
            ))
            setAssignments(dataMap)
        })
    }, [props.credentials, date])
    return (
        <div className="flex flex-col">
            <div className="bg-gray-100 dark:bg-gray-700 items-center justify-center text-center rounded w-full md:w-1/3 lg:1/2 md:justify-between h-fit flex flex-row">
                <IconButton icon={<FaAngleLeft size="30" />} className="w-min h-min border-0" onClick={() => travelOneWeek('back')} />
                <h1 className="text-xl md:text-3xl font-mono mr-2 ml-2">{date}</h1>
                <IconButton icon={<FaAngleRight size="30" />} className="w-min h-min border-0" onClick={() => travelOneWeek('forward')} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                {assignments}
            </div>
        </div>
    )
}