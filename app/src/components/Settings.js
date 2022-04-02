import React, { useState, useContext } from 'react'
import { useForm } from '@mantine/form';
import { Drawer, TextInput, Checkbox, Card, Tabs } from '@mantine/core'
import { FaWrench } from 'react-icons/fa'
import IconTextButton from './IconTextButton.js'
import { Context } from './Context.js'

export default function Settings(props) {
    const [ settings, setSettings ] = useContext(Context)
    const [ activeTab, setActiveTab ] = useState(props.credentials.username ? 0:1);
    const [ opened, setOpened ] = useState(false);
    const initialValues = {
        username: props.credentials.username,
        password: props.credentials.password,
        subdomain: props.credentials.subdomain,
        viewFull: settings.viewFull,
        ignoreOldAssignments: settings.ignoreOldAssignments
    }
    const form = useForm({
        initialValues: initialValues
    })
    const handleSubmit = (values) => {
        localStorage.setItem('credentials', JSON.stringify({
            username: values.username,
            password: values.password,
            subdomain: values.subdomain
        }))
        props.setCredentials({
            username: values.username,
            password: values.password,
            subdomain: values.subdomain
        })
        setActiveTab(0)
    }

    const toggleSetting = (setting) => {
        const values = setting ? {
            viewFull: !form.values.viewFull,
            ignoreOldAssignments: form.values.ignoreOldAssignments
        } : {
            viewFull: form.values.viewFull,
            ignoreOldAssignments: !form.values.ignoreOldAssignments
        }

        localStorage.setItem('settings', JSON.stringify(values))
        
        setSettings({
            viewFull: values.viewFull, 
            ignoreOldAssignments: values.ignoreOldAssignments
        })
    }
    return (
        <>
            <IconTextButton icon={<FaWrench size="30"/>} text="Settings" imgClass={`${(props.credentials) ? '':'animate-bounce'} bg-red-200/50`} onClick={() => {setOpened(true)}} />
            <Drawer
                opened={opened}
                onClose={() => {setOpened(false); props.setOpened(false)}}
                title={<h1 className="font-bold text-xl">Settings</h1>}
                padding="xl"
                size="xl"
            >
                <Tabs active={activeTab} onTabChange={setActiveTab}>
                    <Tabs.Tab label="Customize">
                        <Card shadow="sm" p="lg">
                            <h1 className="text-2xl font-bold">Customize</h1>
                            <form>
                                <Checkbox
                                label="View full assignments"
                                mt="md"
                                onClick={() => {
                                    toggleSetting(true)
                                }}
                                {...form.getInputProps('viewFull', { type: 'checkbox' })}
                                />

                                <Checkbox
                                label="Hide overdue assignments"
                                mt="md"
                                onClick={() => {
                                    toggleSetting(false)
                                }}
                                {...form.getInputProps('ignoreOldAssignments', { type: 'checkbox' })}
                                />
                            </form>
                        </Card>
                    </Tabs.Tab>
                    <Tabs.Tab label="Login">
                        <Card shadow="sm" p="lg">
                            <h1 className="text-2xl font-bold">Login</h1>
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

                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3" type="submit">Login</button>
                                <p className="text-sm text-gray-400 mt-2">This menu will close once you login.</p>
                            </form>
                        </Card>
                    </Tabs.Tab>
                </Tabs>
            </Drawer>
        </>
    )
}

