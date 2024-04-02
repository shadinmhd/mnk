import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	try {

		if (req.method == "OPTIONS") {
			res.status(200).end()
			return
		}

		if (req.method == "POST") {

			const { username, password } = req.body

			if (!username || !password) {
				res.status(400).send({
					success: false,
					message: "username or password not provided"
				})
				return
			}

			const USERNAME = process.env.NEXT_USERNAME
			const PASSWORD = process.env.NEXT_PASSWORD

			if (!USERNAME || !PASSWORD) {
				res.status(400).send({
					success: false,
					message: "server couldn't find credential"
				})
				return
			}
			console.log(USERNAME, username)
			console.log(PASSWORD, password)

			if (USERNAME != username || PASSWORD != password) {
				res.status(400).send({
					success: false,
					message: "incorrect username or password"
				})
				return
			}

			const JWT = process.env.NEXT_JWT

			if (!JWT) {
				throw new Error("jwt not provided")
			}

			const token = jwt.sign(USERNAME, JWT)

			res.status(200).send({
				success: true,
				message: "admin authenticaiton successfull",
				token
			})

			return
		}

		res.status(404).send({
			success: false,
			message: "page not found"
		})

	} catch (error) {
		res.status(500).send({
			success: false,
			message: "server error"
		})
	}
}

export default handler
