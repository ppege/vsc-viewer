import React from 'react'
import { Card } from '@mantine/core'

export default function Assignment(props) {
    return (
        <div className="h-full w-full pt-4 break-inside">
            <Card shadow="sm" p="lg" className="bg-red-300 dark:bg-red-500 dark:text-white h-full">
                <div className="flex flex-col mb-4 items-center">
                    <h1 className="text-2xl font-bold">{props.subject}</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{props.date}</p>
                </div>
                <p className="text-md whitespace-pre-wrap">{props.description}</p>
            </Card>
        </div>
    )
}