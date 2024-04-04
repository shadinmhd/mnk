
"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import api, { handleAxiosError } from "@/lib/api"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/Checkbox"
import { CldUploadButton } from "next-cloudinary"
import { FC, useEffect, useState } from "react"
import { ArrowLeft, Image, Router } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ScaleLoader } from "react-spinners"

interface Props {
	params: {
		id: string
	}
}

const NewWork: FC<Props> = ({ params }) => {

	const router = useRouter()
	const [reload, setReload] = useState(0)
	const [image, setImage] = useState("")
	const [loading, setLoading] = useState(true)

	const formSchema = z.object({
		name: z.string().min(1, { message: "this field cannot be empty" }),
		listed: z.boolean().default(false).optional()
	}).superRefine((_, ctx) => {
		if (!image) {
			ctx.addIssue({
				code: "custom",
				message: "image not selecetd",
				path: ["listed"]
			})
		}
	})

	type formType = z.infer<typeof formSchema>

	const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<formType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			listed: false
		},
	})

	useEffect(() => {
		api.get(`/work/${params.id}`)
			.then(({ data }) => {
				if (data.success) {
					setValue("name", data.work.name)
					setValue("listed", data.work.listed)
					setImage(data.work.image)
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
	}, [reload])

	const onSubmit = async (body: formType) => {
		try {
			const { data } = await api.put(`/work/${params.id}`, { ...body, image })
			if (data.success) {
				toast.success(data.message)
				setReload(prev => prev + 1)
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	const deleteWork = async () => {
		try {
			const { data } = await api.delete(`/work/${params.id}`)
			if (data.success) {
				toast.success(data.message)
				router.back()
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	if (loading) {
		return (
			<div className="flex flex-col relative gap-5 items-center justify-center w-screen h-screen">
				<ScaleLoader color="#00474b" />
			</div>
		)
	}

	return (
		<div className="flex flex-col relative gap-5 items-center justify-center w-screen h-screen">
			<Link
				href={"/admin"}
				className="flex items-center justify-center bg-primary text-white absolute z-10 size-10 inset-5"
			>
				<ArrowLeft />
			</Link>
			<CldUploadButton uploadPreset="mzsmbsla" className="flex items-center justify-center size-64 bg-primary" onSuccess={e => {
				//@ts-ignore
				setImage(e.info.url)
			}}>
				<div className="flex items-center justify-center h-full w-full text-white">
					{
						image ?
							<img
								src={image}
								alt="failed to load image"
								className="h-full w-full"
							/> :
							<Image />
					}
				</div>
			</CldUploadButton>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-2 items-center"
			>
				<input
					{...register("name")}
					placeholder="Name"
					type="text"
					className="outline-none border-2 border-primary px-3 py-1 font-semibold text-primary"
				/>
				{errors.name && <p className="text-red-500">{errors.name.message}</p>}
				<div onClick={e => { e.preventDefault(); setValue("listed", !watch("listed")) }} className="flex gap-2 items-center">
					<p className="font-semibold text-primary">Public: </p>
					<Checkbox
						{...register("listed")}
						defaultChecked={false}
						onCheckedChange={e => setValue("listed", e as boolean)}
						className="text-white"
					/>
				</div>
				{errors.listed && <p className="text-red-500">{errors.listed.message}</p>}
				<div className="flex items-center gap-5">
					<button type="submit" className="bg-primary text-white px-3 py-1 font-semibold">
						Save
					</button>
					<button onClick={e => { e.preventDefault(); deleteWork() }} type="submit" className="bg-red-500 text-white px-3 py-1 font-semibold">
						Delete
					</button>
				</div>
			</form>
		</div>
	)
}

export default NewWork

