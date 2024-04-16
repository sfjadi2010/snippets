"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });

  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: {
      id,
    },
  });
  revalidatePath(`/`);
  redirect(`/`);
}

export async function createSnippet(
  formState: { message: String },
  formData: FormData
) {
  try {
    // Check the user's inputs and make sure they're valid
    const title = formData.get("title");
    const code = formData.get("code");

    // Check if title and code are present
    if (!title || !code) {
      return { message: "Title and code are required" };
    }

    // Title validation must be string and at least 3 characters
    if (typeof title !== "string" || title.length < 3) {
      return { message: "Title must be longer" };
    }

    // Code validation must be string and at least 10 characters
    if (typeof code !== "string" || code.length < 10) {
      return { message: "Code must be long" };
    }

    // Create a new record in the database
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    
  } catch (error: unknown) {
        if (error instanceof Error) {
            return { message: error.message };
        } else {
            return { message: "Something went wrong..." };
        }
  }

  // Redirect the user back to the root route
  revalidatePath("/");
  redirect("/");
}
