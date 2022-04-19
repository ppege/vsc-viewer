import React, { useState, useContext } from 'react'
import { Context } from './Context.js'
import { Card, Button, Modal } from '@mantine/core'
import LinkText from './LinkText.js'

export default function Assignment(props) {
    let [ settings ] = useContext(Context)
    if (props.isMessage) {
        settings = {viewFull: true}
    }
    const showButton = !(settings.viewFull && settings.showAssignmentTime && settings.showPostDate) && !props.isMessage
    const [ opened, setOpened ] = useState(false);
    function isBeforeToday() {
        const today = new Date()
        const date = new Date(props.date + ' ' + today.getFullYear())
        return date < today
    }

    return (
        <div className="h-full w-full pt-4 break-inside">
            <Card shadow="sm" p="lg" className="bg-gray-100 dark:bg-gray-700 dark:text-white h-full">
                    <div className={`flex flex-col mb-4 ${settings.centerHeader ? 'items-center':null}`}>
                        <h1 className="text-2xl font-bold">{props.subject}</h1>
                        <p className={`text-sm text-gray-500 dark:text-gray-400 ${isBeforeToday() && settings.highlightOldAssignments ? 'text-red-600 dark:text-red-400':null}`}>{props.date}</p>
                        {settings.showAssignmentTime ? <p className="text-sm text-gray-600 dark:text-gray-300">{props.time}</p>:null}
                    </div>
                <div className={showButton ? "mb-4":null}>
                    <LinkText className={`text-md  ${settings.viewFull ? 'whitespace-pre-wrap':'truncate'}`} text={props.description} />
                    {settings.showPostDate ? <p className="text-gray-400/75 dark:text-gray-500 text-sm">{props.author}</p>:null}
                </div>
                
                {showButton ? 
                    <Button onClick={() => {setOpened(true)}} variant="light" color="blue" className="w-full hover:bg-gray-300/50 dark:hover:bg-gray-800/50 dark:text-blue-400 bg-gray-200/50 dark:bg-gray-800/25">
                        Details
                    </Button>
                    :null
                }
            </Card>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                overlayOpacity={0.80}
                title={
                    <div className="flex flex-col">
                        <h1 className="font-bold text-3xl align-left">{props.subject}</h1>
                        <div className="text-sm flex flex-col text-gray-500 dark:text-gray-400">
                            <p className={isBeforeToday() && settings.highlightOldAssignments ? 'text-red-600 dark:text-red-400':null}>{props.date}</p>
                            <p>{props.time}</p>
                        </div>
                    </div>
                }
                classNames={{
                    modal: "dark:bg-gray-800 dark:text-gray-200"
                }}
            >
                <LinkText className={`text-md  ${settings.viewFull ? 'whitespace-pre-wrap':'truncate'}`} text={props.description} />
                <p className="pt-6 text-sm text-gray-400">{props.author}</p>
            </Modal>
        </div>
    )
}