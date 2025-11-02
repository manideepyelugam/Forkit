const token = process.env.GIT_TOKEN;

if (!token) {
  throw new Error("GIT_TOKEN is not defined in environment variables");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // console.log("search params = "+searchParams)

  const response = await fetch(`https://api.github.com/search/repositories?${searchParams}`, {
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
  // console.log("Fetched data:", data);
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });

}
