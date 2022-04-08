import '../App.css';
import React, { useState } from 'react'
import { Context } from '../components/Context.js'
import LogoHeader from '../components/LogoHeader.js'
import Links from '../components/NavLinks.js'
import Viewer from '../components/Viewer.js'
import { AppShell, Navbar, Header, Burger, MediaQuery, useMantineTheme } from '@mantine/core';

export default function WebApp() {
  const [ opened, setOpened ] = useState(false)

  const [ credentials, setCredentials ] = useState(JSON.parse(localStorage.getItem('credentials')) || {
    username: undefined,
    password: undefined,
    subdomain: undefined
  })
  const [ settings, setSettings ] = useState(JSON.parse(localStorage.getItem('settings')) || {
    viewFull: false,
    ignoreOldAssignments: false,
    showPostDate: true,
    showAssignmentTime: true,
    showAssignmentLink: true,
    centerHeader: false,
    sort: 'newest'
  })
  const theme = useMantineTheme();
  return (
    <Context.Provider value={[settings, setSettings]}>
      <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ base: 300 }} className="dark:bg-gray-700">
          <Links credentials={credentials} setCredentials={setCredentials} setOpened={setOpened} />
        </Navbar>
      }
      header={
        <Header height={60} p="xs" className="dark:bg-gray-600">
          <div className="flex flex-row items-center">
            <MediaQuery largerThan="sm" styles={{display: "none"}}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <LogoHeader />
          </div>
        </Header>
      }
      className="dark:bg-gray-800 dark:text-white h-full">
        <Viewer credentials={credentials} />
      </AppShell>
    </Context.Provider>
    
  );
}