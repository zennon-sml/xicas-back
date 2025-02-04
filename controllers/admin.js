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
		console.log(email, password, admin.password_hash);
		
		if (admin) {
			if (admin.password_hash == password) {
				const token = jwt.sign({ email: admin.email }, process.env.SECRET_KEY, { expiresIn: "1h" })
				res.cookie("token", token, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "strict",
				})
				console.log(token);

				res.status(200).json({ message: "Usúario encontrado", token })
			} else {
				res.status(404).json({ message: "Senha incorreta" })
			}
		} else {
			res.status(404).json({ message: "Usúario não encontrado" })
		}
	} catch (error) {
		res.status(404).json({ message: "Usúario não encontrado" })
	}
}
