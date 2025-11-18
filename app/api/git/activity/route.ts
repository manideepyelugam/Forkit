const token = process.env.GIT_TOKEN;

if (!token) {
  throw new Error("GIT_TOKEN is not defined in environment variables");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const full_name = searchParams.get("full_name")

  // console.log("search params = "+searchParams)

  const response = await fetch(`https://api.github.com/repos/${full_name}/pulls?state=closed&sort=updated&direction=desc&per_page=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
    next: { revalidate: 1800, tags: ["activity"] }
  });

  if (!response.ok) {
    console.error("Error fetching data from GitHub API:", await response.text());
    return new Response("Failed to fetch data from GitHub API", { status: response.status });
  }

  const data = await response.json();
//   console.log("Fetched data:", data);
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });

}
