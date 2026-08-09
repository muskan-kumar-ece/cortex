"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, FileText, PlayCircle } from "lucide-react";
import { PremiumButton } from "@/components/marketing/PremiumButton";
import { NewsletterForm } from "@/components/layout/Footer/NewsletterForm";

const TypeIconMap: Record<string, React.ElementType> = {
  "Blog": FileText,
  "Guide": BookOpen,
  "Whitepaper": FileText,
  "Video": PlayCircle,
  "Download": Download,
};

export function ResourcesSection({ resources }: { resources: any[] }) {
  // Split resources into articles and downloads just for mock display
  const articles = resources.filter(r => r.contentType !== "Download").slice(0, 3);
  const downloads = resources.filter(r => r.contentType === "Download").slice(0, 3);

  // If there are no explicit downloads in the mock data, fallback to using some articles as downloads for display purposes
  const displayDownloads = downloads.length ? downloads : resources.slice(3, 6);

  return (
    <section className="relative w-full py-24 md:py-32 bg-background border-t border-border-strong overflow-hidden">
      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Knowledge Base
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Engineering <span className="text-primary/80">Insights.</span>
            </h3>
          </div>
          <PremiumButton btnStyle="ghost" render={<Link href="/resources" />} nativeButton={false} className="group shrink-0">
            View All Resources <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </PremiumButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Featured Articles */}
          <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
            <h4 className="text-xl font-bold text-foreground border-b border-border-strong pb-4">Featured Articles</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article, idx) => {
                const Icon = TypeIconMap[article.contentType] || FileText;
                
                return (
                  <motion.div
                    key={article.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Link href={`/resources/${article.slug}`} className="group flex flex-col h-full bg-surface/30 border border-border-strong rounded-2xl p-6 hover:bg-surface hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-primary/10 text-primary uppercase">
                          {article.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Icon className="w-3 h-3" /> {article.contentType}
                        </span>
                      </div>
                      <h5 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{article.title}</h5>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                        <span className="font-mono">{article.readingTime}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Downloads & Newsletter */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-8">
            <div>
              <h4 className="text-xl font-bold text-foreground border-b border-border-strong pb-4 mb-6">Key Downloads</h4>
              <div className="flex flex-col gap-4">
                {displayDownloads.map((doc, idx) => (
                  <motion.div
                    key={doc.slug + idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Link href={`/resources/${doc.slug}`} className="group flex items-start gap-4 p-4 rounded-xl border border-border-strong bg-surface/30 hover:bg-surface hover:border-primary/30 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                        <Download className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <h6 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{doc.title}</h6>
                        <span className="text-xs text-muted-foreground mt-1">PDF Document • 2.4 MB</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-auto p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <h5 className="text-lg font-bold text-foreground mb-2">Engineering Newsletter</h5>
              <p className="text-sm text-muted-foreground mb-4">Architecture patterns, system design, and AI integrations sent monthly.</p>
              <NewsletterForm />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
