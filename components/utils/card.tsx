/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { getAllTeachersData } from "@/data/teachers";

export const MarqueeDemo = async () => {
  const teachers = await getAllTeachersData()
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {teachers.map((teacher) => (
          <div key={teacher.id}>
            <figure
              className={cn(
                "relative w-56 lg:w-80 rounded-lg cursor-pointer overflow-hidden border p-4 space-y-2",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              )}
            >
              <img className="rounded-md" alt="" src={teacher.image ? teacher.image : "/placeholder.svg"} />
              <figcaption className="text-lg font-semibold text-primary leading-5">
                {teacher.name}
                <p className="text-base text-muted-foreground md:text-sm/relaxed lg:text-md/relaxed xl:text-lg/relaxed">{teacher.position}</p>
              </figcaption>
            </figure>
          </div>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 lg:w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 lg:w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
