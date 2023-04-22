import { genSalt, hashSync, compareSync } from "bcrypt";
import autoPopulateShema from "mongoose-autopopulate";
import { Schema, models } from "mongoose";

export const passwordOptions = function (SchemaBase: Schema) {
	SchemaBase.pre("save", async function () {
		const salt = await genSalt(10);
		this.password = hashSync(this.password, salt);
	});

	SchemaBase.methods.passwordCompare = async function (password: string) {
		return compareSync(password, this.password);
	};
};

export const autoPopulate = function (SchemaBase: Schema) {
	SchemaBase.plugin(autoPopulateShema);
};

export const validateEmail = function (SchemaBase: Schema, name: string) {
	const valid = async (email: any) => {
		let isEmail = await models[name].countDocuments({ email });
		return !isEmail;
	};
	SchemaBase.path("email").validate(valid, "Email already exits");
};
