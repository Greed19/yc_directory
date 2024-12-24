import React from 'react'
import Ping from './Ping'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { writeClient } from '@/sanity/lib/writeClient';
import { after} from 'next/server'

const View = async({id}: {id: string}) => {
    const {views: totalViews} = await client.withConfig({useCdn:false}).fetch(STARTUP_VIEWS_QUERY,{id});

  after( async() => 
    await writeClient
    .patch(id)
    .set({views: totalViews + 1})
    .commit()
  )

  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right2'>
            <Ping />
        </div>
        <p className='view-text'>
            <span className='font-black'>{totalViews} view{totalViews > 1 && 's'}</span>
        </p>
    </div>
  )
}

export default View