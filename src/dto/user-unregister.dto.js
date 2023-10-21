import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import AddFormats  from "ajv-formats";
import AddErrors from "ajv-errors";
import { 
    idDTOSchema,
    passwordDTOSchema
} from '#Lib/dto.types.js';

const UnregisterDTOSchema = Type.Object({
    _id: idDTOSchema,
    password: passwordDTOSchema
}, {
    additionalProperties: false
});

const ajv = new Ajv({ allErrors: true}).addKeyword('kind').addKeyword('modiffier');
ajv.addFormat('password', /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*s/);

AddFormats(ajv, ['uuid']);
AddErrors(ajv);

const validateSchema = ajv.compile(UnregisterDTOSchema);

const userUnregisterDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    if(!isDTOValid) 
    return res
        .status(400)
        .send({
            errors: validateSchema.errors.map(error => error.message)
        });

    next();
}

export default userUnregisterDTO;