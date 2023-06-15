'use client'

import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Nav({ user }: Session) {
    return (
        <nav className='flex justify-between items-center py-8'>
            <Link href={'/'} >
                <h1>My Shop</h1>
            </Link>
            <ul className='flex items-center gap-12'>
                {!user && (
                    <li className='bg-teal-600 text-white py02 px-2 rounded-md'>
                        <button onClick={() => signIn()} >Sign in</button>
                    </li>
                )}
                {user && (
                    <>
                        <li>
                            <Image
                                src={user?.image as string}
                                width={40} height={40}
                                alt="user image"
                                className='rounded-full' />
                        </li>

                    </>
                )}
            </ul>
        </nav>
    )

}