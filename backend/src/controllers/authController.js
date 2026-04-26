import { rmSync } from "node:fs";
import { registerUserService,loginUserService } from "../services/authService.js";
import prisma from "../config/prismaClient.js";

export const registerUser= async (req,res)=>{
    try{
        const result=await registerUserService(req.body)
        return res.status(201).json(result)

    }catch(error){
        return res.status(400).json({
            message:error.message,
        })

    }
}

export const loginUser= async (req,res) =>{
    try{
        const result= await loginUserService(req.body)
        return res.status(200).json(result);

    }catch(error){
        return res.status(400).json({
            message:error.message,
        })
    }
}

export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};