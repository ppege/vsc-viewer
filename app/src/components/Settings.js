import React, { useState, useContext, useEffect } from 'react'
import { useForm } from '@mantine/form';
import { Drawer, TextInput, Card, Tabs, Switch } from '@mantine/core'
import { FaWrench, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import IconTextButton from './IconTextButton.js'
import { Context } from './Context.js'

export default function Settings(props) {
    const [ settings, setSettings ] = useContext(Context)
    const [ activeTab, setActiveTab ] = useState(props.credentials.username ? 0:1)
    const [ opened, setOpened ] = useState(false)
    const initialValues = {
        ...props.credentials,
        ...settings
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
        form.values[setting] = !form.values[setting]
        const newSettings = Object.keys(form.values).reduce((acc, key) => {
            if (key !== 'username' && key !== 'password' && key !== 'subdomain') {
                acc[key] = form.values[key]
            }
            return acc
        }, {})
        setSettings(newSettings)
    }
    const handleSortChange = () => {
        let values = 'newest'
        if (settings.sort === 'newest') {
            values = 'oldest'
        }
        setSettings({
            ...settings,
            sort: values
        })
    }
    useEffect(() => {
        localStorage.setItem('settings', JSON.stringify(settings))
    }, [settings])
    let switchClass = {
        label: "dark:text-white",
        input: "dark:bg-gray-800/50"
    }
    return (
        <>
            <IconTextButton icon={<FaWrench size="30"/>} text="Settings" imgClass={`${(props.credentials.username) ? null:'animate-bounce'} bg-red-200/50`} onClick={() => {setOpened(true)}} />
            <Drawer
                opened={opened}
                onClose={() => {setOpened(false); props.setOpened(false)}}
                title={<h1 className="font-bold text-xl">Settings</h1>}
                padding="xl"
                size="xl"
                classNames={{drawer: 'dark:bg-gray-800 dark:text-white'}}
            >
                <Tabs active={activeTab} onTabChange={setActiveTab} classNames={{tabLabel: 'dark:text-white'}}>
                    <Tabs.Tab label="Customize" disabled={!props.credentials.username}>
                        <Card shadow="sm" p="lg" className="dark:bg-gray-700 dark:text-white">
                            <h1 className="text-2xl font-bold">Customize</h1>
                            <form>
                                <h1 className="text-xl mt-3">Visibility</h1>
                                <p className="subtitle">
                                    This controls what you can see on each assignment at a glance without opening the details menu.
                                </p>
                                <Switch
                                label="View full assignments"
                                mt="md"
                                onClick={() => {
                                    toggleSetting('viewFull')
                                }}
                                classNames={switchClass}
                                {...form.getInputProps('viewFull', { type: 'checkbox' })}
                                />

                                <Switch
                                label="Show assignment authors"
                                mt="md"
                                onClick={() => {
                                    toggleSetting('showPostDate')
                                }}
                                classNames={switchClass}
                                {...form.getInputProps('showPostDate', { type: 'checkbox' })}
                                />

                                <Switch
                                label="Show assignment times"
                                mt="md"
                                onClick={() => {
                                    toggleSetting('showAssignmentTime')
                                }}
                                classNames={switchClass}
                                {...form.getInputProps('showAssignmentTime', { type: 'checkbox' })}
                                />

                                <Switch
                                label="Highlight overdue assignments"
                                mt="md"
                                onClick={() => {
                                    toggleSetting('highlightOldAssignments')
                                }}
                                classNames={switchClass}
                                {...form.getInputProps('highlightOldAssignments', { type: 'checkbox' })}
                                />

                                <h1 className="text-xl mt-4">Visual preferences</h1>
                                <p className="subtitle">
                                    This controls how you prefer things to be presented.
                                </p>
                                <Switch
                                label="Center assignment headers"
                                mt="md"
                                onClick={() => {
                                    toggleSetting('centerHeader')
                                }}
                                classNames={switchClass}
                                {...form.getInputProps('centerHeader', { type: 'checkbox' })}
                                />

                                
                                    <button onClick={handleSortChange} type="button" className="bg-blue-500 hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-gray-900 text-white font-bold rounded mt-3 px-4 py-2">
                                        <div className="flex flex-row items-center -ml-1 divide-x">
                                            <div className="pr-3">
                                                {settings.sort === 'newest' ? <FaArrowDown />:<FaArrowUp />}
                                            </div>
                                            <div className="pl-3">
                                                <p>Sorting by {settings.sort}</p>
                                            </div>
                                        </div>
                                    </button>
                            </form>
                        </Card>
                    </Tabs.Tab>
                    <Tabs.Tab label="Login">
                        <Card shadow="sm" p="lg" className="dark:bg-gray-700">
                            <h1 className="text-2xl font-bold dark:text-white">Login</h1>
                            <form onSubmit={form.onSubmit(handleSubmit)}>
                                <TextInput
                                required
                                label="Username"
                                placeholder="your@email.com"
                                classNames={{label: "dark:text-white", input: "dark:bg-gray-800 dark:text-white"}}
                                {...form.getInputProps('username')}
                                />

                                <TextInput
                                required
                                label="Password"
                                type="password"
                                placeholder="Your password"
                                classNames={{label: "dark:text-white", input: "dark:bg-gray-800 dark:text-white"}}
                                {...form.getInputProps('password')}
                                />

                                <TextInput
                                required
                                label="Subdomain"
                                placeholder="example-subdomain"
                                classNames={{label: "dark:text-white", input: "dark:bg-gray-800 dark:text-white"}}
                                {...form.getInputProps('subdomain')}
                                />

                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3" type="submit">Login</button>
                                <p className="text-sm text-gray-400 mt-2">You will be shown the customization menu once you login.</p>
                            </form>
                        </Card>
                    </Tabs.Tab>
                </Tabs>
            </Drawer>
        </>
    )
}

