import {db} from "@/db";

export default async function Snippets() {
  const snippets = await db.snippet.findMany();

  const renderdSnippets = snippets.map((snippet) => {
    return (
      <div key={snippet.id}>
        <h3 className="text-xl">{snippet.title}</h3>
        <pre>{snippet.code}</pre>
        <br />
      </div>
    );
  });
  return (
    <div>
      <h1>Snippets</h1>
      <div>
        <a className="text-blue-300 border rounded p-1" href="/snippets/new">Create a Snippet</a>
      </div>
      <br />
      <div>{renderdSnippets}</div>
    </div>
    
  );
}
