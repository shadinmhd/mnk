import connectDb from "@/lib/database";
import WorkModel from "@/models/work.model";
import { NextApiRequest, NextApiResponse } from "next";

connectDb()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == "OPTIONS") {
			res.status(200).end()
			return
		}

		if (req.method == "GET") {
			const { filter } = req.query

			let query = {}
			if (filter == "all")
				query = {}
			if (filter == "listed")
				query = { listed: true }
			if (filter == "unlisted")
				query = { listed: false }

			const works = await WorkModel.find(query)

			res.status(200).send({
				success: true,
				message: "works fetched successfully",
				works
			})
			return
		}

		if (req.method == "POST") {
			const { image, name, listed } = req.body

			if (!image || !name) {
				res.status(400).send({
					success: false,
					message: "image or name not provided"
				})
				return
			}

			const workSearch = await WorkModel.findOne({ name })

			if (workSearch) {
				res.status(400).send({
					success: false,
					message: "this name is allready in use"
				})
				return
			}

			const work = await new WorkModel({
				name,
				image,
				listed
			}).save()

			res.status(200).send({
				success: true,
				message: "work uploaded successfully",
				work
			})

			return
		}

		res.status(404).send({
			success: false,
			message: "page not found"
		})
	} catch (error) {
		console.log(error)
		res.status(500).send({
			success: false,
			message: "servere error"
		})
	}
}

export default handler
