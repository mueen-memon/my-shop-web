'use client'

import { useCartStore } from '@/store'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Cart from './Cart'
import { AiFillShopping } from 'react-icons/ai'
import { AnimatePresence, motion } from 'framer-motion';
import DarkLight from './DarkLight'

export default function Nav({ user }: Session) {

    const cartStore = useCartStore()

    return (
        <nav className='sticky top-0 flex justify-between items-center py-6 lg:py-12  bg-base-100'>
            <Link className='font-lobster text-2xl' href={'/'} >
                <h1>My Shop</h1>
            </Link>
            <ul className='flex items-center gap-8'>
                <li onClick={() => cartStore.toggleCart()} className='flex items-center text-3xl relative cursor-pointer'>
                    <AiFillShopping />
                    <AnimatePresence>
                        {cartStore.cart.length > 0 && (
                            <motion.span
                                animate={{ scale: 1 }}
                                initial={{ scale: 0 }}
                                exit={{ scale: 0 }}
                                className='bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center'
                            >
                                {cartStore.cart.length}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </li>
                <DarkLight /> 
                {!user && (
                    <li className='bg-primary text-white py-2 px-4 rounded-md'>
                        <button onClick={() => signIn()} >Sign in</button>

                    </li>
                )}
                {user && (

                    <li>
                        <div className='dropdown dropdown-end cursor-pointer'>
                            <Image
                                src={user?.image as string}
                                width={40} height={40}
                                alt="user image"
                                className='rounded-full'
                                tabIndex={0}
                            />
                            <ul tabIndex={0} className='dropdown-content menu p-4 space-y-2 shadow bg-base-100 rounded-box w-72'>
                                <Link className='hover:bg-base-300 p-4 rounded-md' href={'/dashboard'}
                                    onClick={hideDropDown}
                                >
                                    Orders
                                </Link>
                                <li className='hover:bg-base-300 p-4 rounded-md'
                                    onClick={() => {
                                        hideDropDown()
                                        signOut()
                                    }}>
                                    Sign out
                                </li>
                            </ul>
                        </div>
                    </li>

                )}
            </ul>
            <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
        </nav>
    )

}

const hideDropDown = () => {
    if (document.activeElement instanceof (HTMLElement)) {
        document.activeElement.blur()
    }
}