import type { Metadata } from "next";

const SITE_NAME = "CINEMAX";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cinemax.com";
const DEFAULT_DESCRIPTION =
  "แพลตฟอร์มดูซีรีย์จีนออนไลน์ที่ดีที่สุด รับชมซีรีย์จีน ซีรีย์เกาหลี ซีรีย์ไทย คุณภาพ HD พากย์ไทย ซับไทย";

interface SEOConfig {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "video.movie";
  noIndex?: boolean;
}

/**
 * Generate metadata for pages
 */
export function generateSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = "/og-image.jpg",
  url = SITE_URL,
  type = "website",
  noIndex = false,
}: SEOConfig = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullImageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "th_TH",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [fullImageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/**
 * Generate series page metadata
 */
export function generateSeriesSEO(series: {
  title: string;
  description: string;
  thumbnail?: string;
  id: string;
}): Metadata {
  return generateSEO({
    title: series.title,
    description: series.description,
    image: series.thumbnail || "/og-series.jpg",
    url: `${SITE_URL}/series/${series.id}`,
    type: "video.movie",
  });
}

/**
 * Generate episode page metadata
 */
export function generateEpisodeSEO(
  series: { title: string; id: string },
  episode: { number: number; title: string; description?: string }
): Metadata {
  const title = `${series.title} ตอนที่ ${episode.number}: ${episode.title}`;
  return generateSEO({
    title,
    description:
      episode.description || `รับชม ${title} ออนไลน์ คุณภาพ HD พากย์ไทย ซับไทย`,
    url: `${SITE_URL}/series/${series.id}/episode/${episode.number}`,
    type: "video.movie",
  });
}

/**
 * Generate category page metadata
 */
export function generateCategorySEO(category: {
  name: string;
  slug: string;
  description?: string;
}): Metadata {
  return generateSEO({
    title: `ซีรีย์${category.name}`,
    description:
      category.description ||
      `รวมซีรีย์${category.name}ทั้งหมด ดูซีรีย์${category.name}ออนไลน์ คุณภาพ HD`,
    url: `${SITE_URL}/categories/${category.slug}`,
  });
}

/**
 * JSON-LD structured data for series
 */
export function generateSeriesJsonLd(series: {
  title: string;
  description: string;
  thumbnail?: string;
  rating?: number;
  episodeCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: series.title,
    description: series.description,
    image: series.thumbnail,
    aggregateRating: series.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: series.rating,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    numberOfEpisodes: series.episodeCount,
  };
}

/**
 * JSON-LD structured data for organization
 */
export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://facebook.com/cinemax",
      "https://twitter.com/cinemax",
      "https://instagram.com/cinemax",
    ],
  };
}
