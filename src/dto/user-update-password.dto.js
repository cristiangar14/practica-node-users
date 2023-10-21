import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import AddErrors from "ajv-errors";
import { 
    passwordDTOSchema
} from '#Lib/dto.types.js';

const UpdatePasswordDTOSchema = Type.Object({
    oldPassword: passwordDTOSchema,
    newPassword: passwordDTOSchema
}, {
    additionalProperties: false
})

const ajv = new Ajv({ allErrors: true}).addKeyword('kind').addKeyword('modiffier');
ajv.addFormat('password', /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*s/);
AddErrors(ajv);

const validateSchema = ajv.compile(UpdatePasswordDTOSchema);

const userUpdatePasswordDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    if(!isDTOValid) 
    return res
        .status(400)
        .send({
            errors: validateSchema.errors.map(error => error.message)
        });

    next();
}

export default userUpdatePasswordDTO;