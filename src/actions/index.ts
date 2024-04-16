'use server';

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string) {
    await db.snippet.update({
        where: {
            id,
        },
        data: {
            code,
        },
    });

    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: {
            id,
        },
    });

    redirect(`/`);
}

export async function createSnippet(formState: {message: String}, formData: FormData) {
    // Check the user's inputs and make sure they're valid
    const title = formData.get('title');
    const code = formData.get('code');

    // Check if title and code are present
    if (!title || !code) {
        return { message: 'Title and code are required' };
    }

    // Title validation must be string and at least 3 characters
    if (typeof title !== 'string' || title.length < 3) {
        return { message: 'Title must be longer' };
    }

    // Code validation must be string and at least 10 characters
    if (typeof code !== 'string' || title.length < 10)
    {
        return { message: 'Code must be long'};
    }

    // Create a new record in the database
    const snippet = await db.snippet.create({
        data: {
            title,
            code,
        },
    });
    
    // Redirect the user back to the root route
    redirect('/');
}