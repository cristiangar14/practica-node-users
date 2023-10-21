import { Router } from "express";
import userRegisterDTO from "#Dto/user-register.dto.js";
import userLoginDTO from "#Dto/user-login.dto.js";
import userUpdateDataDTO from "#Dto/user-update-data.dto.js";
import userUpdateEmailDTO from "#Dto/user-update-email.dto.js";
import userUpdatePasswordDTO from "#Dto/user-update-password.dto.js";
import userUnregisterDTO from "#Dto/user-unregister.dto.js";
import userJWTDTO from "#Dto/user.jwt.dto.js";

const userRouter = Router();


userRouter.post('/register', userRegisterDTO);

userRouter.post('/login', userLoginDTO);

userRouter.get('/profile', userJWTDTO);

userRouter.patch('/update-data', userJWTDTO, userUpdateDataDTO);

userRouter.patch('/update-email', userJWTDTO, userUpdateEmailDTO);

userRouter.patch('/update-password', userJWTDTO, userUpdatePasswordDTO);

userRouter.delete('/unregister', userJWTDTO, userUnregisterDTO);

export default userRouter;
