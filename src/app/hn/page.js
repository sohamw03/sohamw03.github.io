"use client";
import { useEffect, useState } from "react";
import ArticleCard from "@/components/Projects/ArticleCard"; // New component
import styles from "@/app/page.module.css";

export default function HNPage() {
  const [articlesBySource, setArticlesBySource] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hn-articles`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticlesBySource(data);
      } catch (e) {
        console.error("Failed to fetch articles:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading articles...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error loading articles: {error}</div>;
  }

  if (Object.keys(articlesBySource).length === 0) {
    return <div className="flex justify-center items-center h-screen">No articles found. The backend might need to fetch them first.</div>;
  }

  return (
    <main className={styles.main}>
      <div className="px-4 pt-20">
        {Object.entries(articlesBySource).map(([sourceName, articles]) => (
          <section key={sourceName} className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-center">{sourceName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
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
                  sx="mb-4"
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
