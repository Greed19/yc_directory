import { cn, formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button';
import { Author, Startup } from '@/sanity/types'
import { Skeleton } from './ui/skeleton'

export type StartupTypeCard = Omit<Startup, "author"> & {author?: Author}

const StartupCard = ({post}: {post: StartupTypeCard}) => {
    const { _id, _createdAt, views, author, category, image, title , description } = post;
    const profilePath = `/user/${author?._id}`
    const detailPath = `/startup/${_id}`
  
  return (
    <li className='startup-card group'>
        <div className='flex-between'>
            <p>{formatDate(_createdAt)}</p>
            <div className='flex gap-1.5'>
              <EyeIcon className='size-6 text-primary' />
              <span className='text-16-medium'>{views}</span>
            </div>
        </div>
        <div className='flex-between mt-5 gap-5'>
          <div className='flex-1'>
            <Link href={profilePath}>
              <p className='text-16-medium line-clamp-1'>
                {author?.name}
              </p>
            </Link>
            <Link href={detailPath}>
              <h3 className='text-26-semibol line-clamp-1'>{title}</h3>
            </Link>
          </div>
          <Link href={profilePath}>
            <Image src={author?.image!} alt={author?.name!} width={48} height={48} className='rounded-full ' />
          </Link>
        </div>
        <Link href={detailPath}>
          <p className='startup-card_desc'>
            {description}
          </p>
          <img src={image} alt="placeholder" className='startup-card_img' />
        </Link>
        <div className='flex-between gap-3 mt-5'>
          <Link href={`/?query=${category?.toLowerCase()}`}>
            <p className='text-16-medium'>{category}</p>
          </Link>
          <Button className='startup-card_btn' asChild>
            <Link href={detailPath}>
              Details
            </Link>
          </Button>
        </div>

    </li>
  )
}

export const StartupCardSkeleton = () => (
  <>
  {[0,1,2,3,4,5].map((i:number) => (
    <li key={cn('skeleton',i)}>
      <Skeleton className='startup-card_skeleton' />
    </li>
  ))}
  </>
)

export default StartupCard