import UserModel from "#Schemas/user.schema.js";
import { hash } from "bcrypt";

const userRegisterController = async (req, res) => {
    const {
        _id,
        name,
        surmane,
        email,
        password
    } = req.body;

    const existingUserById = await UserModel.findById(_id).exec();
    if (existingUserById) return res.status(409).send('Ya existe un usuario con ese id registrado');
    
    const existingUserByEmail = await UserModel.findOne({email}).exec();
    if (existingUserByEmail) return res.status(409).send('Ya existe un usuario con ese email registrado');


    const hashedPAssword = await hash(password, 12);

    const user = new UserModel({
        _id,
        name,
        surmane,
        email,
        password: hashedPAssword
    });

    await user.save();

    return res.status(201).send('Usuario registrado con exito')

};

export default userRegisterController;