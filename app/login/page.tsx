"use client"
import api, { handleAxiosError } from '@/lib/api'
import { stringSpaceValidation } from '@/lib/string'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
	username: z.string().min(1, { message: "this field cannot be empty" }).refine(stringSpaceValidation),
	password: z.string().min(1, { message: "this field cannot be empty" }).refine(stringSpaceValidation)
})

type formType = z.infer<typeof formSchema>

const Login = () => {

	const { register, handleSubmit, formState: { errors } } = useForm<formType>({ resolver: zodResolver(formSchema) })
	const router = useRouter()

	const onSubmit = async (data: formType, e: any) => {
		try {
			e.preventDefault()
			const response = await api.post("/auth", data)
			if (response.data.success) {
				localStorage.setItem("token", response.data.token)
				router.push("/admin")
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<div className='flex flex-col items-center justify-center h-screen w-screen'>
			<div className='flex flex-col gap-4 items-center p-10 bg-white rounded-lg shadow-primary shadow-lg'>
				<p className='text-4xl font-bold text-primary'>Admin login</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-3 items-center justify-center'
				>
					<input
						{...register("username")}
						placeholder='Username'
						type="text"
						className='border-2 border-primarya px-3 py-1 rounded-lg outline-none'
					/>
					{errors.username && <p className='text-red-500'>{errors.username.message}</p>}
					<input
						{...register("password")}
						placeholder='Password'
						type="password"
						className='border-2 border-primarya px-3 py-1 rounded-lg outline-none'
					/>
					{errors.password && <p className='text-red-500'>{errors.password.message}</p>}
					<button type='submit' className='bg-primary text-white px-6 py-2 rounded-lg'>
						login
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login
