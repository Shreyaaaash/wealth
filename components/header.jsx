import React from 'react'
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button'
import { PenBox } from 'lucide-react'
import { checkUser } from '@/lib/checkUser';

const Header = async () => {
    await checkUser();
  return (
    <div className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border -b'>
        <nav className='container mx-auto px-4 py-4 flex justify-between items-center'>
            <Link href="/">
                <Image src="/logo.png" alt="wealth logo" height={40} width={200} className="h-13 w-auto object-contain" />
            </Link>
            <div className='flex items-center gap-4'>
                <SignedOut>
                    <SignInButton>
                        <Button variant="outline">Login</Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <Link href="/dashboard">
                        <Button variant="outline">Dashboard</Button>
                    </Link>
                    <Link href="/transaction/create">
                        <Button variant="outline" className=" bg-black text-white flex items-center gap-2">
                            <PenBox size={18} />
                            <span className='hidden md:inline'>Add Transaction</span>
                        </Button>
                    </Link>
                    <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
                </SignedIn>
            </div>
        </nav>
    </div>
  )
}

export default Header