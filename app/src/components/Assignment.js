import React, { useState } from 'react'
import { Card, Button, Modal } from '@mantine/core'
import Linkify from 'react-linkify'

export default function Assignment(props) {
    const [ opened, setOpened ] = useState(false);
    function isBeforeToday() {
        const today = new Date()
        const date = new Date(props.content.date + ' ' + today.getFullYear())
        return date < today
    }
    return (
        <div className="w-full h-full">
            <Card shadow="sm" p="lg" className="bg-gray-100 dark:bg-gray-700 dark:text-white h-full">
                    <div className="flex flex-col items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">{props.content.subject}</h1>
                        <p className={`text-gray-500 dark:text-gray-400 ${isBeforeToday() ? 'text-red-600 dark:text-red-400':null}`}>{props.content.date}</p>
                        <p className="text-gray-600 dark:text-gray-300">{props.content.time}</p>
                    </div>
                <p id="description" className={`text-md ${props.fullText ? null:'truncate'}`}><Linkify properties={{ target: '_blank', style: { color: '#0000FF' }}}>{props.content.description}</Linkify></p>
                {props.fullText ? null:<Button onClick={() => {setOpened(true)}} variant="light" color="blue" fullWidth style={{ marginTop: 14 }} className="hover:bg-gray-300/50 dark:hover:bg-gray-800/50 dark:text-blue-400">
                    See more
                </Button>}
            </Card>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title={<h1 className="font-bold text-xl">{props.content.subject}</h1>}
            >
                <p><Linkify properties={{ target: '_blank' }}>{props.content.description}</Linkify></p>
                <p className="pt-6 text-sm text-gray-400">{props.content.author}</p>
            </Modal>
        </div>
    )
}