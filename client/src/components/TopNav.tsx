import React from 'react'
import { GiSlaveryWhip } from 'react-icons/gi'
import { Link } from 'react-router-dom'

export const TopNav: React.FunctionComponent<{}> = () => (
  <>
    <Link to="/">
      <GiSlaveryWhip size={'5em'} />
    </Link>
  </>
)
