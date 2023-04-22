import Joi from "joi";

const str = () => Joi.string().trim().lowercase();
const str_length = (min: Number, max: Number, joi: any) => joi.min(min).max(max);

export const rules = {
	login: Joi.object().keys({
		password: str_length(8, 16, str()).required(),
		email: str().email().required(),
	}),
	register: Joi.object().keys({
		password: str_length(8, 16, str()).required(),
		email: str().email().required(),
		fullname: str().required(),
	}),
};
