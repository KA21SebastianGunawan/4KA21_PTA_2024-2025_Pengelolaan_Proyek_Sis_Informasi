import Users from "../models/UsersModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    const users = await Users.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!users) return res.status(404).json({msg: "User tidak ditemukan"});
    const match = await argon2.verify(users.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Password salah"});
    req.session.userId = users.uuid;
    const uuid = users.uuid;
    const name = users.name;
    const email = users.email;
    const role = users.role;
    res.status(200).json({uuid, name, email, role});
} 

export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda"});
    }
    const users = await Users.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!users) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(users)
}

export const logOut = (req, res) =>
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah berhasil logout"});
    });