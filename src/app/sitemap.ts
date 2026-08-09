import { MetadataRoute } from "next";
import { getAllServiceSlugs } from "@/services/cms/services.service";
import { getAllIndustrySlugs } from "@/services/cms/industries.service";
import { getAllPortfolioSlugs } from "@/services/cms/portfolio.service";
import { getAllSolutionSlugs } from "@/config/solutions";
import { getAllProductSlugs } from "@/config/products";
import { getAllResourceSlugs } from "@/services/cms/resources.service";
import { TECHNOLOGIES_DB } from "@/constants/technologies";
import { CASE_STUDIES_DB } from "@/constants/case-studies";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cortexitsolution.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // 1. Static Hub Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}`, lastModified: currentDate, changeFrequency: "daily", priority: 1.0 },
    { url: `${siteUrl}/services`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/industries`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/solutions`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/technologies`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/products`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/portfolio`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/case-studies`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/resources`, lastModified: currentDate, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/design-system`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/motion-lab`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.4 },
  ];

  // 2. Fetch all dynamic slugs across Knowledge Engine
  const [
    services,
    industries,
    solutions,
    products,
    portfolio,
    resources,
  ] = await Promise.all([
    getAllServiceSlugs(),
    getAllIndustrySlugs(),
    getAllSolutionSlugs(),
    getAllProductSlugs(),
    getAllPortfolioSlugs(),
    getAllResourceSlugs(),
  ]);

  const technologies = Object.keys(TECHNOLOGIES_DB);
  const caseStudies = Object.keys(CASE_STUDIES_DB);

  // 3. Dynamic route mappings
  const serviceRoutes: MetadataRoute.Sitemap = services.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((slug) => ({
    url: `${siteUrl}/industries/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const solutionRoutes: MetadataRoute.Sitemap = solutions.map((slug) => ({
    url: `${siteUrl}/solutions/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const technologyRoutes: MetadataRoute.Sitemap = technologies.map((slug) => ({
    url: `${siteUrl}/technologies/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((slug) => ({
    url: `${siteUrl}/products/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = portfolio.map((slug) => ({
    url: `${siteUrl}/portfolio/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((slug) => ({
    url: `${siteUrl}/case-studies/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const resourceRoutes: MetadataRoute.Sitemap = resources.map((slug) => ({
    url: `${siteUrl}/resources/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...solutionRoutes,
    ...technologyRoutes,
    ...productRoutes,
    ...portfolioRoutes,
    ...caseStudyRoutes,
    ...resourceRoutes,
  ];
}
