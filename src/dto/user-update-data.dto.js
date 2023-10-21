import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import AddErrors from "ajv-errors";
import { nameDTOSchema, surnameDTOSchema } from '#Lib/dto.types.js';

const UpdateDataDTOSchema = Type.Object({
    name: nameDTOSchema,
    surname: surnameDTOSchema,
}, {
    additionalProperties: false
});

const ajv = new Ajv({ allErrors: true}).addKeyword('kind').addKeyword('modiffier');
AddErrors(ajv);


const validateSchema = ajv.compile(UpdateDataDTOSchema);

const userUpdateDataDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    if(!isDTOValid) 
    return res
        .status(400)
        .send({
            errors: validateSchema.errors.map(error => error.message)
        });

    next();
}

export default userUpdateDataDTO;