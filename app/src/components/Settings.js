import React, { useState } from 'react'
import { useForm } from '@mantine/form';
import { Modal, TextInput, Checkbox } from '@mantine/core'
import { FaWrench } from 'react-icons/fa'
import IconTextButton from './IconTextButton.js'

export default function Settings(props) {
    let initialValues = {
        username: null,
        password: null,
        subdomain: null,
        viewFull: false,
        ignoreOldAssignments: false
    }
    if (props.settings !== null) {
        initialValues = {
            ...props.settings
        }
    }
    const form = useForm({
        initialValues: initialValues
    })
    const handleSubmit = (values) => {
        localStorage.setItem('values', JSON.stringify(values))
        props.setSettings(values)
        props.setOpened(false)
        setOpened(false)
    }
    const [ opened, setOpened ] = useState(false);
    return (
        <>
            <IconTextButton icon={<FaWrench size="30"/>} text="Settings" imgClass={`${(initialValues.username) ? '':'animate-bounce'} bg-red-200/50`} onClick={() => {setOpened(true)}} />
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title={<h1 className="font-bold text-xl">Settings</h1>}
            >
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                    required
                    label="Username"
                    placeholder="your@email.com"
                    {...form.getInputProps('username')}
                    />

                    <TextInput
                    required
                    label="Password"
                    type="password"
                    placeholder="Your password"
                    {...form.getInputProps('password')}
                    />

                    <TextInput
                    required
                    label="Subdomain"
                    placeholder="example-subdomain"
                    {...form.getInputProps('subdomain')}
                    />

                    <Checkbox
                    label="View full assignments"
                    mt="md"
                    {...form.getInputProps('viewFull', { type: 'checkbox' })}
                    />

                    <Checkbox
                    label="Hide overdue assignments"
                    mt="md"
                    {...form.getInputProps('ignoreOldAssignments', { type: 'checkbox' })}
                    />
                    
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3" type="submit">Apply</button>
                    <p className="text-sm text-gray-400 mt-2">This modal will close once you apply the settings.</p>
                </form>
            </Modal>
        </>
    )
}

