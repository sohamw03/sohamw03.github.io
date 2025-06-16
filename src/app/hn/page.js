import ArticleCard from "@/components/Projects/ArticleCard"; // New component
import styles from "@/app/page.module.css";

async function fetchArticles() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hn-articles`, {
      cache: 'no-store' // Ensures fresh data on each request
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Failed to fetch articles:", e);
    throw e;
  }
}

export default async function HNPage() {
  let articlesBySource = {};
  let error = null;

  try {
    articlesBySource = await fetchArticles();
  } catch (e) {
    error = e.message;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error loading articles: {error}</div>;
  }

  if (Object.keys(articlesBySource).length === 0) {
    return <div className="flex justify-center items-center h-screen">No articles found. The backend might need to fetch them first.</div>;
  }

  return (
    <main className={styles.main} style={{ padding: "0.2rem" }}>
      <div className="px-1">
        {Object.entries(articlesBySource).map(([sourceName, articles]) => (
          <section key={sourceName} className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 mt-6 text-center">{sourceName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[0.5rem] sm:gap-4">
              {articles.map((article, index) => (
                <ArticleCard
                  key={index}
                  project={{
                    name: article.title,
                    href: article.link,
                    mediaSrcs: article.screenshotBase64 ? [`data:image/jpeg;base64,${article.screenshotBase64}`] : [],
                    techStack: [],
                    lang: [],
                  }}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
