import React, { useState } from 'react'
import { FaEye, FaWrench } from 'react-icons/fa'
import IconTextButton from './IconTextButton.js'
import { Modal, TextInput, Checkbox } from '@mantine/core'
import { useForm } from '@mantine/form';

export default function NavLinks(props) {
  const [ opened, setOpened ] = useState(false);
  let credentials = JSON.parse(localStorage.getItem('values'))
  const form = useForm({
    initialValues: {
      username: credentials.username,
      password: credentials.password,
      subdomain: credentials.subdomain,
      viewFull: credentials.viewFull
    }
  });
  const handleSubmit = (values) => {
    localStorage.setItem('values', JSON.stringify(values))
  }
  return (
      <div className="flex flex-col gap-2">
        <IconTextButton icon={<FaEye size="30"/>} text="Viewer" color="blue" active={props.selected} />
        <IconTextButton icon={<FaWrench size="30"/>} text="Settings" color="green" onClick={() => {setOpened(true)}} />
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
              label="View full assignments (buggy)"
              mt="md"
              {...form.getInputProps('viewFull', { type: 'checkbox' })}
            />
            
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3" type="submit">Save</button>
            <p className="text-sm text-gray-400 mt-2">After saving, reload to apply changes.</p>
          </form>
        </Modal>
      </div>
    );
  }