import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  // Generate JSON-LD for breadcrumbs
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://cortexitsolution.com/"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href ? { "item": `https://cortexitsolution.com${item.href}` } : {})
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm", className)}>
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="text-on-surface-muted hover:text-foreground transition-colors flex items-center">
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            
            return (
              <li key={item.label} className="flex items-center">
                <ChevronRight className="w-3.5 h-3.5 text-border-strong mx-1 shrink-0" />
                {isLast || !item.href ? (
                  <span className="text-foreground font-medium truncate max-w-[200px]" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    href={item.href} 
                    className="text-on-surface-muted hover:text-foreground transition-colors truncate max-w-[150px]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
