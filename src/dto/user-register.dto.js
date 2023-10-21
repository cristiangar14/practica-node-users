import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import AddFormats  from "ajv-formats";
import AddErrors from "ajv-errors";
import { 
    idDTOSchema, 
    nameDTOSchema, 
    surnameDTOSchema,
    emailDTOSchema,
    passwordDTOSchema
} from '#Lib/dto.types.js';

const RegisterDTOSchema = Type.Object({
    _id: idDTOSchema,
    name: nameDTOSchema,
    surname: surnameDTOSchema,
    email: emailDTOSchema,
    password: passwordDTOSchema
}, {
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'El formato del objeto no es valido'
    }
});

const ajv = new Ajv({ allErrors: true}).addKeyword('kind').addKeyword('modiffier');
ajv.addFormat('password', /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*s/);


AddFormats(ajv, ['email', 'uuid']);
AddErrors(ajv);


const validateSchema = ajv.compile(RegisterDTOSchema);

const userRegisterDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    if(!isDTOValid) 
    return res
        .status(400)
        .send({
            errors: validateSchema.errors.map(error => error.message)
        });

    next();
}

export default userRegisterDTO;