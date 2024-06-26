import SnippetEditForm from "@/components/snippet-edit-form";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SnippetEditPageProps {
    params: {
        id: string;
    }
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
    const snippet = await db.snippet.findFirst({
        where: {
            id: parseInt(props.params.id),
        },
    });

    if (!snippet) {
        return notFound();
    }

    return (
        <div>
            <SnippetEditForm snippet={snippet} />
        </div>
    )
}