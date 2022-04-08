import React, { useState, useContext } from 'react'
import { Context } from './Context.js'
import { Card, Button, Modal } from '@mantine/core'

export default function Assignment(props) {
    let [ settings ] = useContext(Context)
    if (props.isMessage) {
        settings = {viewFull: true}
    }
    const [ opened, setOpened ] = useState(false);
    function isBeforeToday() {
        const today = new Date()
        const date = new Date(props.date + ' ' + today.getFullYear())
        return date < today
    }
    const findAllURLs = (element) => {
        let urlRegex = /(https?:\/\/[^\s]+)/g;
        let urls = [];
        let match = null;
        while (match = urlRegex.exec(element)) {
            urls.push(match[1]);
        }
        return urls.map((url) => <a className="text-blue-500" href={url} key={url} target="_blank" rel="noopener noreferrer">{url}</a>)
    }

    const linksElement = (string) => {
        let links = findAllURLs(string).map((link) => link)
        if (!!links.length) {
            return (
                <>
                    <p className="font-bold pt-3">Links</p>
                    <p>{links}</p>
                </>
            )
        }
    }
    const assignment = (
        <div className="h-full w-full">
            <Card shadow="sm" p="lg" className="bg-gray-100 dark:bg-gray-700 dark:text-white h-full">
                    <div className={`flex flex-col mb-4 ${settings.centerHeader ? 'items-center':null}`}>
                        <h1 className="text-2xl font-bold">{props.subject}</h1>
                        <p className={`text-sm text-gray-500 dark:text-gray-400 ${isBeforeToday() ? 'text-red-600 dark:text-red-400':null}`}>{props.date}</p>
                        {settings.showAssignmentTime ? <p className="text-sm text-gray-600 dark:text-gray-300">{props.time}</p>:null}
                    </div>
                <p id="description" className={`text-md  ${settings.viewFull ? 'whitespace-pre-wrap':'truncate'}`}>
                    {props.description}
                </p>
                {settings.viewFull ? linksElement(props.description):null}
                {settings.showPostDate ? <p className="text-gray-400/75 dark:text-gray-500 text-sm">{props.author}</p>:null}
                {settings.viewFull ? null:<Button onClick={() => {setOpened(true)}} variant="light" color="blue" fullWidth style={{ marginTop: 14 }} className="hover:bg-gray-300/50 dark:hover:bg-gray-800/50 dark:text-blue-400 bg-gray-200/50 dark:bg-gray-800/25">
                    Details
                </Button>}
            </Card>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                overlayOpacity={0.80}
                title={
                    <div className="flex flex-col">
                        <h1 className="font-bold text-3xl align-left">{props.subject}</h1>
                        <div className="text-sm flex flex-col text-gray-500 dark:text-gray-400">
                            <p className={isBeforeToday() ? 'text-red-600 dark:text-red-400':null}>{props.date}</p>
                            <p>{props.time}</p>
                        </div>
                    </div>
                }
                classNames={{
                    modal: "dark:bg-gray-800 dark:text-gray-200"
                }}
            >
                <p className="pb-3 whitespace-pre-wrap">{props.description}</p>
                {linksElement(props.description)}
                <p className="pt-6 text-sm text-gray-400">{props.author}</p>
            </Modal>
        </div>
    )
    if (settings.ignoreOldAssignments) {
        return isBeforeToday() ? null:assignment
    }
    return assignment
}