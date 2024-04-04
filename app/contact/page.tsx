"use client"
import Navbar from '@/components/Navbar'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string().min(1, { message: "this field cannnot be empty" }),
	email: z.string().email({ message: "Enter a valid email" }),
	message: z.string().min(1, { message: "this field cannot be empty" })
})

type formType = z.infer<typeof formSchema>

const Contact = () => {

	const { register, handleSubmit, formState: { errors } } = useForm<formType>({ resolver: zodResolver(formSchema) })

	return (
		<div className='h-screen w-screen'>
			<Navbar />
			<div className='flex flex-col w-full h-full'>
				<div className='flex items-end justify-start w-full h-full px-10 sm:px-16'>
					<div className='flex text-4xl sm:text-6xl font-extrabold gap-5 items-center py-5'>
						<p>CONTACT</p>
						<p className='text-secondary'>ME</p>
					</div>
				</div>
				<div className='flex items-start  bg-primary w-full h-full p-10 sm:p-16'>
					<div className='flex text-white text-xl flex-col justify-center gap-1 w-full'>
						<p>Muhammed Nasal kk</p>
						<p>+91 8086 263 948</p>
						<p>mnkmediaworks@gmail.com</p>
						<p>mnk_media_works_</p>
						<div className='flex text-base flex-col'>
							<p>Ekarool, Balussery,</p>
							<p>Kozhikode,</p>
							<p>kerala - 673574</p>
						</div>
					</div>
					<div className='flex flex-col justify-center w-full gap-2'>
						<p className='text-4xl font-bold text-white'>Say hi</p>
						<input
							{...register("name")}
							placeholder='Name'
							type="text"
							className='outline-none px-3 py-1 border-2 border-primary font-semibold text-primary'
						/>
						{errors.name && <p className='text-red-500'>{errors.name.message}</p>}
						<input
							{...register("email")}
							placeholder='Email'
							type="text"
							className='outline-none px-3 py-1 border-2 border-primary font-semibold text-primary'
						/>
						{errors.email && <p className='text-red-500'>{errors.email.message}</p>}
						<textarea
							{...register("message")}
							placeholder='Message'
							className='outline-none px-3 py-1 border-2 border-primary font-semibold text-primary'
						/>
						{errors.message && <p className='text-red-500'>{errors.message.message}</p>}
					</div>
				</div>
			</div>
		</div >
	)
}

export default Contact
