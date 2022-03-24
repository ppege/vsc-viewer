import '../App.css';
import React, { useState, useEffect } from 'react'
import LogoHeader from '../components/LogoHeader.js'
import Links from '../components/NavLinks.js'
import Viewer from '../components/Viewer.js'
import { AppShell, Navbar, Header } from '@mantine/core';

export default function Home() {

  const [ credentials, setCredentials ] = useState({})
  useEffect(() => {
    setCredentials(JSON.parse(localStorage.getItem('values')))
  }, [])
  let viewer = <Viewer credentials={credentials} />
  return (
    <AppShell
      padding="md"
      navbar={
        <div className="w-1/4">
          <Navbar height={600} p="xs" width={{ base: 300 }}>
            <Navbar.Section>{}</Navbar.Section>
            <Navbar.Section grow mt="md">{<Links selected="Viewer"/>}</Navbar.Section>
            <Navbar.Section>{/* Footer with user */}</Navbar.Section>
          </Navbar>
        </div>
      }
      header={
        <Header height={60} p="xs">{<LogoHeader />}</Header>
      }
      className="dark:bg-gray-800 dark:text-white">
        {viewer}
    </AppShell>
  );
}