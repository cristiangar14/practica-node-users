import UserModel from "#Schemas/user.schema.js";
import { compare, hash } from "bcrypt";
import { SALT } from "#Constants/salt.js";
const userUpdatePasswordController = async (req, res) => {
    const { id } = req;
    const { oldPassword, newPassword } = req.body;
    
    const existingUserById = await UserModel.findById(id).exec();
    if (!existingUserById) 
        return res
            .status(401)
            .send({errors: ['Usuario no autorizado']});

    const checkPassword = await compare(oldPassword, existingUserById.password);

    if (!checkPassword) 
        return res
            .status(401)
            .send({errors: ['Credenciales incorrectas']});

    const hashedPAssword = await hash(newPassword, SALT); 
    existingUserById.password = hashedPAssword;

    await existingUserById.save();

    return res.send('Password del usuario actualizado');
};

export default userUpdatePasswordController;