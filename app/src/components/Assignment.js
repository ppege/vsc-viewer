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
        <div className="w-full h-full">
            <Card shadow="sm" p="lg" className="bg-gray-100 dark:bg-gray-700 dark:text-white h-full">
                    <div className="flex flex-col items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">{props.subject}</h1>
                        <p className={`text-gray-500 dark:text-gray-400 ${isBeforeToday() ? 'text-red-600 dark:text-red-400':null}`}>{props.date}</p>
                        <p className="text-gray-600 dark:text-gray-300">{props.time}</p>
                    </div>
                <p id="description" className={`text-md ${settings.viewFull ? null:'truncate'}`}>
                    {props.description}
                </p>
                {settings.viewFull ? linksElement(props.description):null}
                {settings.viewFull ? null:<Button onClick={() => {setOpened(true)}} variant="light" color="blue" fullWidth style={{ marginTop: 14 }} className="hover:bg-gray-300/50 dark:hover:bg-gray-800/50 dark:text-blue-400">
                    See more
                </Button>}
            </Card>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title={<h1 className="font-bold text-xl">{props.subject}</h1>}
                classNames={{
                    modal: "dark:bg-gray-800 dark:text-gray-200"
                }}
            >
                <div className="divide-y-2">
                    <p className="pb-3">{props.description}</p>
                    <div>
                        {linksElement(props.description)}
                    </div>
                </div>
                <p className="pt-6 text-sm text-gray-400">{props.author}</p>
            </Modal>
        </div>
    )
    if (settings.ignoreOldAssignments) {
        return isBeforeToday() ? null:assignment
    }
    return assignment
}