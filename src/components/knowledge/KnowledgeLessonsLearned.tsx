import { CaseStudyLesson } from "@/constants/case-study-types";
import { CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";

export function KnowledgeLessonsLearned({ lessons }: { lessons: CaseStudyLesson[] }) {
  if (!lessons || lessons.length === 0) return null;

  return (
    <section className=" md:">
      <div className="">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Lessons Learned
        </h3>
        <p className="text-xl text-on-surface-muted max-w-3xl">
          We believe in radical transparency. Here&apos;s what worked, what we struggled with, and how we&apos;re improving.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lessons.map((lesson, idx) => (
          <div 
            key={idx} 
            className="flex flex-col p-8 rounded-3xl border border-border-strong bg-surface/30 hover:bg-surface/80 transition-colors"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              lesson.type === "success" ? "bg-success/10 text-success" :
              lesson.type === "challenge" ? "bg-warning/10 text-warning" :
              "bg-primary/10 text-primary"
            }`}>
              {lesson.type === "success" && <CheckCircle2 className="w-6 h-6" />}
              {lesson.type === "challenge" && <AlertTriangle className="w-6 h-6" />}
              {lesson.type === "future" && <Lightbulb className="w-6 h-6" />}
            </div>
            
            <h4 className="text-xl font-bold text-foreground">
              {lesson.title}
            </h4>
            
            <p className="text-on-surface-muted leading-relaxed">
              {lesson.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
