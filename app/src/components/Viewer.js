import Assignment from './Assignment.js'
import Error from './Error.js'
import IconButton from './IconButton.js'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import React, { useState, useEffect, useContext } from 'react'
import { Context } from './Context.js'
import axios from 'axios'
import dayjs from 'dayjs'

export default function Viewer(props) {
    let [ settings ] = useContext(Context)
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
        if (!props.credentials.username) {
            setAssignments(<Assignment {...{subject: "Credentials not set", description: "Please enter your ViGGO credentials in the settings menu."}} key="No credentials" isMessage={true} />)
            return;
        }
        setAssignments(<Assignment {...{subject: "Loading...", description: "Please wait a moment."}} key="Loading" isMessage={true} />)
        axios.get(`https://api.nangurepo.com/v2/scrape?username=${props.credentials.username}&password=${props.credentials.password}&subdomain=${props.credentials.subdomain}&date=${date}&errorAssignments=1`)
        .then((response) => {
            if (!response.data.length) {
                setAssignments(<Assignment {...{subject: "No assignments found", description: "No assignments were found for this date. You may have entered your credentials incorrectly."}} key="No assignments" isMessage={true} />)
                return;
            }
            if (response.data[0].subject === "Error") {
                setAssignments(<Error {...response.data[0]} key="Error" />)
                return;
            }
            const sortByPreference = (object) => {
                switch(settings.sort) {
                    case 'newest':
                        return object.reverse()
                    case 'oldest':
                        return object
                    default:
                        return object.reverse()
                }
            } 
            let dataMap = sortByPreference(response.data).map((assignment) => (
                <Assignment {...assignment} key={assignment.url} />
            ))
            setAssignments(dataMap)
        })
    }, [props.credentials, date, settings.sort])
    return (
        <div className="flex flex-col">
            <div className="bg-gray-100 dark:bg-gray-700 items-center justify-center text-center rounded w-full md:w-1/3 lg:1/2 md:justify-between h-fit flex flex-row">
                <IconButton icon={<FaAngleLeft size="30" />} className="w-min h-min border-0" onClick={() => travelOneWeek('back')} />
                <h1 className="text-xl md:text-3xl font-mono mr-2 ml-2">{date}</h1>
                <IconButton icon={<FaAngleRight size="30" />} className="w-min h-min border-0" onClick={() => travelOneWeek('forward')} />
            </div>
            <div className="sm:masonry-2-col lg:masonry-3-col before:box-inherit after:box-inherit">
                {assignments}
            </div>
        </div>
    )
}