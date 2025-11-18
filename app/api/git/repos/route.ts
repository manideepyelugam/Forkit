import { unstable_cache } from 'next/cache';

const token = process.env.GIT_TOKEN;

if (!token) {
  throw new Error("GIT_TOKEN is not defined in environment variables");
}

// Cache key generator to include query params
const getCacheKey = (queryString: string) => {
  return `repos-data-${queryString}`;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();

  try {
    // Create a cached function with the query string as part of the cache key
    const fetchGitHubRepos = unstable_cache(
      async () => {
        console.log("🔄 Fetching fresh data from GitHub API...");
        
        const response = await fetch(`https://api.github.com/search/repositories?${queryString}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (!response.ok) {
          console.error("Error fetching data from GitHub API:", await response.text());
          throw new Error("Failed to fetch data from GitHub API");
        }

        const data = await response.json();
        const timestamp = new Date().toISOString();
        
        console.log(`✅ Fresh data fetched at: ${timestamp}`);
        
        return {
          data,
          timestamp
        };
      },
      [getCacheKey(queryString)],
      {
        revalidate: 1800, // 30 minutes
        tags: ['repos']
      }
    );

    // Fetch cached data (or fresh if revalidated)
    const { data, timestamp } = await fetchGitHubRepos();
    
    // Format timestamp for display
    const lastUpdatedAt = new Date(timestamp).toLocaleString("en-IN", {
      dateStyle: "short",
      timeStyle: "short"
    });

    const result = {
      updatedAtFormatted: lastUpdatedAt,
      updatedAtISO: timestamp,
      data,
    };

    console.log(`📦 Serving data (last fetched: ${lastUpdatedAt})`);

    return new Response(JSON.stringify(result), {
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600"
      },
    });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch repositories" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
