import WorkModel from "@/models/work.model"
import { NextApiRequest, NextApiResponse } from "next"
import { map } from "zod"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {

		if (req.method == "OPTIONS") {
			res.status(200).end()
			return
		}

		if (req.method == "GET") {

			const { id } = req.query

			const work = await WorkModel.findById(id)

			if (!work) {
				res.status(400).send({
					success: false,
					message: "work not found"
				})
				return
			}

			res.status(200).send({
				success: true,
				message: "work fetched successfully",
				work
			})

			return
		}

		if (req.method == "PUT") {
			const { id } = req.query
			const { name, listed, image } = req.body

			const workSearch = await WorkModel.findOne({ name, _id: { $ne: id } })

			if (workSearch) {
				res.status(400).send({
					success: false,
					message: "this name is allready in use"
				})
				return
			}

			const response = await WorkModel.updateOne({ _id: id }, {
				$set: { name, listed, image }
			})

			if (response.matchedCount < 1) {
				res.status(400).send({
					success: false,
					message: "work not found"
				})
				return
			}

			if (response.modifiedCount < 1) {
				res.status(400).send({
					success: false,
					message: "failed to edit work"
				})
			}

			res.status(200).send({
				success: true,
				message: "work editod successfully"
			})

			return
		}

		if (req.method == "DELETE") {
			const { id } = req.query

			const response = await WorkModel.deleteOne({ _id: id })

			if (response.deletedCount < 0) {
				res.status(400).send({
					success: false,
					message: "failed to delete work"
				})
				return
			}

			res.status(200).send({
				success: true,
				message: "work deleted successfully"
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
			message: "server error"
		})
	}
}

export default handler
