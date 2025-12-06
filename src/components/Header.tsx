import React from 'react'
import FroviLogo from './FroviLogo'

type Props = {}

export default function Header ({}: Props) {
  return (
    <header className="-mb-28 flex justify-center py-4">
        <FroviLogo className='h-20 z-10 cursor-pointer text-sky-800'/>
    </header>
  )
}