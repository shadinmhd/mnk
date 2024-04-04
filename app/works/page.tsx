"use client"
import Navbar from '@/components/Navbar'
import WorkInterface from '@/interface/work.interface'
import api, { handleAxiosError } from '@/lib/api'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const Works = () => {

	const [works, setWorks] = useState<WorkInterface[]>([])

	useEffect(() => {
		api.get("/work?filter=listed")
			.then(({ data }) => {
				if (data.success) {
					setWorks(data.works)
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				handleAxiosError(error)
			})
	}, [])

	return (
		<div className='h-screen w-screen'>
			<Navbar />
			<div className='grid grid-cols-3 grid-rows-3 gap-5 w-full h-full'>
				{works.map((e, i) => (
					<div
						key={i}
						className='flex flex-col items-center justify-center p-5 group w-full hover:bg-primary transition-all'
					>
						<img
							src={e.image}
							alt="failed to load image"
							className='size-fit'
						/>
						<p className='text-black font-bold group-hover:text-white'>{e.name}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Works
