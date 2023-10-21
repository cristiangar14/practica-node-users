import { Type } from "@sinclair/typebox";


export const idDTOSchema = Type.String({
    format: 'uuid',
    errorMessage: {
        type: 'El tipo de _id no es valido, debe ser un string',
        format: 'El formato de _id no es valido, debe ser un uuid4'
    }
});

export const nameDTOSchema = Type.String({
    minLength: 2,
    maxLength: 20,
    errorMessage: {
        minLength: 'name debe tener al menos 2 caracteres de logitud',
        maxLength: 'name debe tener maximo 20 caracteres de longitud'
    }
});

export const surnameDTOSchema =Type.String({
    minLength: 4,
    maxLength: 50,
    errorMessage: {
        minLength: 'surname debe tener al menos 4 caracteres de logitud',
        maxLength: 'surname debe tener maximo 50 caracteres de longitud'
    }
});

export const emailDTOSchema = Type.String({
    format: 'email',
    errorMessage: {
        type: 'El tipo del email no es valido, debe ser un string',
        format: 'El formato del email no es valido, debe cumplir el RFC 5322'
    }
});

export const passwordDTOSchema = Type.String({
    format: 'password',
    minLength: 10,
    maxLength: 25,
    errorMessage: {
        type: 'El tipo del password no es valido, debe ser un string',
        format: 'El formato del password no es valido, debe contener 1 mayuscula, 1 minuscula y 1 numero',
        minLength: 'password debe tener al menos 10 caracteres de logitud',
        maxLength: 'password debe tener maximo 25 caracteres de longitud'
    }
});