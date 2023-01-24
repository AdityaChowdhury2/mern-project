import bcrypt from "bcryptjs";
import UserModal from "../models/user.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import user from "../models/user.js";

dotenv.config();
const secret = process.env.SECRET_KEY || "test";
export const signIn = async (req, res) => {
	const { email, password } = req.body;
	// console.log(req.body);

	try {
		const oldUser = await UserModal.findOne({ email });
		if (!oldUser)
			return res.status(404).json({ message: "User not found" });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			oldUser.password
		);

		if (!isPasswordCorrect)
			return res.status(400).json({ message: "Invalid password" });

		const token = jwt.sign(
			{ email: oldUser.email, id: oldUser.id },
			secret,
			{ expiresIn: "1h" }
		);

		res.status(200).json({ result: oldUser, token });
	} catch (err) {
		// if any errors are encountered in the time of sign in then send a message with errors
		res.status(500).json({ message: "Something went wrong" });
		console.log(err);
	}
};

export const signUp = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	try {
		//first we have to check if the user is already signed up or not
		const oldUser = await UserModal.findOne({ email: email });

		if (oldUser) {
			//if the user is already signed up then send a message
			return res.status(400).json({ message: "User already exists" });
		}

		//we have to encrypt the password with bcrypt.hash
		const hashedPassword = await bcrypt.hash(password, 12);

		//create the user
		const result = await UserModal.create({
			name: `${firstName} ${lastName}`,
			email,
			password: hashedPassword,
		});

		//create jwt token for the user session
		const token = jwt.sign(
			{ email: result.email, id: result._id },
			secret,
			{ expiresIn: "1h" }
		);

		//sending the user and the token to the client side
		res.status(201).json({ result, token });
	} catch (err) {
		// if any errors are encountered then send a message with errors
		res.status(500).json({ message: "Something went wrong" });
		console.log(err);
	}
};

export const googleSignIn = async (req, res) => {
	const { token } = req.body;
	try {
		console.log(req.body);
		res.status(200).json({ token });
	} catch (err) {
		// if any errors are encountered then send a message with errors
		res.status(500).json({ message: "Something went wrong" });
		console.log(err);
	}
	// try {
	// 	const oldUser = await UserModal.findOne({ email: email });
	// 	if (oldUser) {
	// 		const result = { _id: oldUser._id.toString(), email, name };
	// 		return res.status(200).json({ result, token });
	// 	}
	// 	//if user login for first time then the user details should be sent in mongodb
	// 	const result = await UserModal.create({
	// 		name,
	// 		email,
	// 		googleId,
	// 	});
	// 	res.status(200).json({ result, token });
	// } catch (err) {
	// 	// if any errors are encountered then send a message with errors
	// 	res.status(500).json({ message: "Something went wrong" });
	// 	console.log(err);
	// }
};
