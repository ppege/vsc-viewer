import { FaEye, FaGithub } from 'react-icons/fa'
import IconTextButton from './IconTextButton.js'
import Settings from './Settings.js'
import { Navbar } from '@mantine/core'

export default function NavLinks(props) {
  return (
    <>
      <Navbar.Section grow mt="md">
        <div className="flex flex-col gap-2">
          <IconTextButton icon={<FaEye size="30"/>} text="Viewer" imgClass="bg-blue-200/50" active={true} />
          <Settings setOpened={props.setOpened} credentials={props.credentials} setCredentials={props.setCredentials} />
        </div>
      </Navbar.Section>
      <Navbar.Section>
        <div className="flex flex-col gap-2">
          <IconTextButton icon={<FaGithub size="30" />} text="View source" imgClass="bg-gray-300/50" onClick={() => {window.open("https://github.com/nangurepo/vsc-viewer", '_blank').focus()}} />
          <IconTextButton icon={<img src="/nangurepo.png" alt="logo" />} imgClass="bg-gray-900/25" text="About me" onClick={() => {window.open("https://nangurepo.com", '_blank').focus()}} />
        </div>
      </Navbar.Section>
    </>
    );
  }