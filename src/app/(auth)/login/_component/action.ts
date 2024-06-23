"use server";
import { query } from "@/lib/db";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const addSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const UserLogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const [user] = (await query({
      query: "SELECT * FROM admin WHERE username = ? AND password = ?",
      values: [username, password],
    })) as any;
    cookies().set("userDetails", JSON.stringify(user));
    if (user) return { success: true, message: "Login Successfull" };

    return { success: false, message: "Invalid Credentials" };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
