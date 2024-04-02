import { NextApiRequest, NextApiResponse } from "next"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	try {

		if (req.method == "OPTIONS") {
			res.status(200).end()
			return
		}

		if (req.method == "GET") {

			const { id } = req.query

			console.log(id)

			return
		}

		if (req.method == "PUT") {

			const { id } = req.query

			console.log(id)

			return
		}

		if (req.method == "DELETE") {

			const { id } = req.query

			console.log(id)

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
