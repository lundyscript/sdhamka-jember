import { getAllPosts, getFourPosts } from "@/data/posts";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export const BentoForHomePage = async () => {
    const news = await getFourPosts()
    return (
      <div className={cn( "grid w-full auto-rows-[22rem] lg:grid-cols-3 gap-6")} >
      {news.map((post, idx) => (
        <div
          key={idx}
          className={cn(
            idx === 0 || idx === 3 ? "lg:col-span-2" : "col-span-1",
            "group relative flex flex-col justify-between overflow-hidden rounded-xl text-left",
            // light styles
            "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
            // dark styles
            "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
          )}
        >
          <div>
            <Image src={post.image ? `/${post.image}` : "/placeholder.svg"} alt={post.title} layout="fill" sizes="100vw" priority className="absolute rounded-md object-cover border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] group-hover:scale-105" />
          </div>
          <div className="z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
            <Link href={{pathname: '/topic', query: { q: post.id }}}>
              <h3 className="text-xl font-semibold text-primary">
                {post.title}
              </h3>
            </Link>
            <div className="max-w-lg text-muted-foreground" dangerouslySetInnerHTML={{ __html: post.body.substring(0,100) + "..." }} />
          </div>

          <div
            className={cn(
              "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
            )}
          >
              <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
                <Link href={{pathname: '/topic', query: { q: post.id }}}>
                  Selengkapnya
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
          </div>
          <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
        </div>
      ))}
    </div>
    );
  }

export const BentoForNewsPage = async ({query, currentPage}:{query: string, currentPage: number}) => {
  const news = await getAllPosts(query, currentPage)
  return (
    <div className={cn( "grid auto-rows-[22rem] lg:grid-cols-4 gap-6")} >
      {news.map((post, idx) => (
        <div
          key={idx}
          className={cn(
            "group relative flex flex-col justify-between overflow-hidden rounded-xl text-left",
            // light styles
            "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
            // dark styles
            "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
          )}
        >
          <div>
            <Image src={post.image ? `/${post.image}` : "/placeholder.svg"} alt={post.title} layout="fill" sizes="100vw" priority className="absolute rounded-md object-cover border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] group-hover:scale-105" />
          </div>
          <div className="z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
            <Link href={{pathname: '/topic', query: { q: post.id }}}>
              <h3 className="text-xl font-semibold text-primary">
                {post.title}
              </h3>
            </Link>
            <div className="max-w-lg text-muted-foreground" dangerouslySetInnerHTML={{ __html: post.body.substring(0,100) + "..." }} />
          </div>

          <div
            className={cn(
              "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
            )}
          >
              <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
                <Link href={{pathname: '/topic', query: { q: post.id }}}>
                  Selengkapnya
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
          </div>
          <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
        </div>
      ))}
    </div>
  );
}