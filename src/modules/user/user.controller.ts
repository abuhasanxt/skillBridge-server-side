import { Request, Response } from "express";
import { userServices } from "./user.service";
import { UserRole } from "../../middleware/auth";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();
    res.status(200).json({
      success: true,
      message: "All user retrieved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User retrieved fail!",
      details: error,
    });
  }
};
const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllStudent();
    res.status(200).json({
      success: true,
      message: "Student retrieved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Student retrieved fail!",
      details: error,
    });
  }
};

const getAllTutor = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllTutor();
    res.status(200).json({
      success: true,
      message: "Tutor retrieved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Tutor retrieved fail!",
      details: error,
    });
  }
};

const getTutorDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await userServices.getTutorDetails(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tutor get successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Tutor get fail!",
    });
  }
};

const getOwnProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }
    const result = await userServices.getOwnProfile(userId);
    res.status(200).json({
      success: true,
      message: " Profile retrieved successfully!",
      user: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: " Profile getting failed!",
      error: error.message,
      details: error,
    });
  }
};

//update own profile
const updateOwnProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }

    const result = await userServices.updateOwnProfile(userId!, req.body);
    res.status(200).json({
      success: true,
      message: " Profile updated successfully!",
      user: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: " Profile update failed!",
      error: error.message,
      details: error,
    });
  }
};

const isBanned = async (req: Request, res: Response) => {
  try {
    const loggedUser = req.user;

    //  check admin
    if (!loggedUser || loggedUser.role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized! Only admin can perform this action",
      });
    }

    const id = req.params.id;
    const result = await userServices.userIsBanned(id as string);
    res.status(200).json({
      success: true,
      user: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: " isBanned update failed!",
      error: error.message,
      details: error,
    });
  }
};


const changeUserRole = async (req: Request, res: Response) => {
  try {
    const loggedUser = req.user;

    //  admin check
    if (!loggedUser || loggedUser.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Only admin can change roles",
      });
    }

    const id = req.params.id;
    const { role } = req.body;

    // //  validation
    // const validRoles = ["STUDENT", "TUTOR", "ADMIN"];
    // if (!validRoles.includes(role)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid role",
    //   });
    // }

    const result = await userServices.changeUserRole(id as string, role);

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Role update failed",
      error: error.message,
    });
  }
};
export const userController = {
  getAllUser,
  getAllStudent,
  getAllTutor,
  getTutorDetails,
  updateOwnProfile,
  getOwnProfile,
  isBanned,
  changeUserRole
  
};
