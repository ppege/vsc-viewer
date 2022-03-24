import React, { useState } from 'react'
import { Card, Button, Modal } from '@mantine/core'

export default function Assignment(props) {
    const [ opened, setOpened ] = useState(false);
    return (
        <div className="w-full h-full">
            <Card shadow="sm" p="lg" className="bg-gray-100 dark:bg-gray-700 dark:text-white h-full">
                    <div className="flex flex-col  items-center justify-between mb-2">
                        <h1 className="text-2xl font-bold">{props.content.subject}</h1>
                        <p className="text-gray-400">{props.content.date}</p>
                    </div>
                <p id="description" className={`text-md ${props.fullText ? null:'truncate'}`}>{props.content.description}</p>
                {props.fullText ? null:<Button onClick={() => {setOpened(true)}} variant="light" color="blue" fullWidth style={{ marginTop: 14 }} className="hover:bg-gray-300/50 dark:hover:bg-gray-800/50">
                    See more
                </Button>}
            </Card>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title={<h1 className="font-bold text-xl">{props.content.subject}</h1>}
            >
                <p>{props.content.description}</p>
                <p className="pt-6 text-sm text-gray-400">{props.content.author}</p>
            </Modal>
        </div>
    )
}