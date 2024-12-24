import { auth } from '@/auth';
import { StartupCardSkeleton } from '@/components/StartupCard';
import UserStartups from '@/components/UserStartups';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

const Page = async({params}: {params: Promise<{id: string}>}) => {
    const id = (await params).id;
    const session = await auth()
    // if(!session) 
    const user = await client.fetch(AUTHOR_BY_ID_QUERY,{id})
    if(!user) notFound()
    const {name, image, username, bio} = user
  return (
    <>
        <section className='profile_container'>
            <div className='profile_card'>
                <div className='profile_title'>
                    <h3 className='text-24-black uppercase text-center line-clamp-1'>
                        {name}
                    </h3>
                </div>
                <Image src={image}  alt='name'  width={220} height={220} className='profile_image'/>
                <p className='text-30-extrabold m-7 text-center'>
                    @{username}
                </p>
                <p className='text-13-normal mt-1 text-center'>{bio}</p>
            </div>
            <div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
                <p className='text-30-bold'>
                    {
                        session?.id === id ? "Your" : "all"
                    } Startups
                </p>
                <ul className='card_grid-sm'>
                    <Suspense fallback={<StartupCardSkeleton />}>
                        <UserStartups id={id} />
                    </Suspense>
                </ul>
            </div>
        </section>  
    </>
  )
}

export default Page