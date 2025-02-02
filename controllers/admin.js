import Admin from "../models/admin.js"
import jwt from "jsonwebtoken"

export const createAdmin = async (req, res) => {
	const { name, email, password_hash } = req.body;
	try {
		const admin = await Admin.create({ name, email, password_hash });
		res.status(201).json(admin);
	} catch (error) {
		res.status(400).json({ error: error.message || "Erro ao criar admin" });
	}
}

export const loginAdminWithEmail = async (req, res) => {
	try {
		const { email, password } = req.body
		const admin = await Admin.findOne({
			where: { email: email.trim().toLowerCase() }
		})
		if (admin) {
			const token = jwt.sign( { email: admin.email }, process.env.SECRET_KEY, { expiresIn: "1h" })
			console.log(admin.email, token)
			res.status(200).json({ messagem: "Usúario encontrado" })
		} else {
			res.status(404).json({ message: "Usúario não encontrado" })
		}
	} catch (error) {
		res.status(500).json({ error: error.message || "Erro ao logar" })
	}
}
