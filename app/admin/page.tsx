"use client"
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/Select'
import WorkInterface from '@/interface/work.interface'
import api, { handleAxiosError } from '@/lib/api'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { ScaleLoader } from 'react-spinners'
import { toast } from 'sonner'

type FilterOptions = "all" | "listed" | "unlisted"

const Admin = () => {

	const [works, setWorks] = useState<WorkInterface[]>([])
	const [filter, setFilter] = useState<FilterOptions>("all")
	const [search, setSearch] = useState("")
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let timeout = setTimeout(() => {
			setLoading(true)
			api.get(`/work?filter=${filter}`)
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
				.finally(() => {
					setLoading(false)
				})
		}, 500)
		return () => {
			clearTimeout(timeout)
		}
	}, [filter])

	return (
		<div className='flex flex-col gap-5 h-screen w-screen p-10'>
			<div className='flex gap-5 items-center w-full'>
				<input
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder='Name...'
					type="text"
					className='border-2 border-primary outline-none px-3 py-1 w-full'
				/>
				<div className='flex gap-5 items-center w-full h-full'>
					<FilterSelect selected={filter} onChange={setFilter} />
					<Link href={"/admin/new"} className='flex items-center justify-center bg-primary text-white font-semibold w-full h-full'>
						Create
					</Link>
				</div>
			</div>
			<div className='flex items-center justify-center h-full w-full overflow-y-auto'>
				{

					loading ?
						<ScaleLoader color='#00474b' />
						:
						<div className='grid grid-cols-3 grid-rows-3 gap-5 w-full h-full'>
							{works.map((e, i) => (
								<Link
									href={`/admin/works/${e._id}`}
									key={i}
									className='flex flex-col items-center justify-center p-5 group w-full hover:bg-primary transition-all'
								>
									<img
										src={e.image}
										alt="failed to load image"
										className='size-36'
									/>
									<p className='text-black font-bold group-hover:text-white'>{e.name}</p>
								</Link>
							))}
						</div>
				}
			</div>
		</div>
	)
}

interface FilterPorps {
	selected: FilterOptions,
	onChange: (filter: FilterOptions) => void
}

const FilterSelect: FC<FilterPorps> = ({ selected, onChange }) => {
	return (
		<Select onValueChange={(e) => onChange(e as FilterOptions)}>
			<SelectTrigger className='rounded-none outline-none bg-primary text-white font-bold'>
				{selected}
			</SelectTrigger>
			<SelectContent className='bg-primary text-white rounded-none'>
				{["all", "listed", "unlisted"].map((e, i) => (
					<SelectItem
						key={i}
						value={e}
						className='cursor-pointer'
					>
						{e}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export default Admin
