export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return new Response(JSON.stringify({ error: "Missing query parameter q" }), { status: 400 });
  }

  const token = process.env.GIT_TOKEN;
  if (!token) {
    throw new Error("GIT_TOKEN is not defined in environment variables");
  }

  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(q)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    console.error("Error fetching data from GitHub API:", await response.text());
    return new Response("Failed to fetch data from GitHub API", { status: response.status });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
