import { ResourceAuthor } from "@/cms/resources/types";
import { MessageCircle, Briefcase, Globe } from "lucide-react";

export function KnowledgeAuthorCard({ author }: { author: ResourceAuthor }) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-surface/30 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-surface border-2 border-border-strong flex items-center justify-center font-bold text-2xl text-primary shadow-inner mb-4">
        {author.avatarPlaceholder || author.name.charAt(0)}
      </div>
      <h4 className="font-semibold text-foreground text-lg">{author.name}</h4>
      <p className="text-sm text-primary mb-4">{author.role}</p>
      
      <div className="flex items-center justify-center gap-3 w-full border-t border-border-strong pt-4 mt-2">
        {author.twitter && (
          <a href={author.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-on-surface-muted hover:text-primary hover:border-primary/50 transition-colors">
            <MessageCircle className="w-4 h-4" />
          </a>
        )}
        {author.linkedin && (
          <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-on-surface-muted hover:text-primary hover:border-primary/50 transition-colors">
            <Briefcase className="w-4 h-4" />
          </a>
        )}
        {!author.twitter && !author.linkedin && (
          <a href="#" className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-on-surface-muted hover:text-primary hover:border-primary/50 transition-colors">
            <Globe className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
