import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
  try {
    const adminData = {
      name: "Admin Hasan ",
      email: "admin123@gmail.com",
      role: UserRole.ADMIN,
      password: "admin123",
    };
    //check user exist on database or not
    const exitingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (exitingUser) {
      throw new Error("User already exists !!");
    
    }
    const signUpAdmin = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(adminData),
      },
    );
    console.log(signUpAdmin);
    if (signUpAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

seedAdmin();
