import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { blogCard } from "./lib/interface";
import { sanityClient, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  const query = `
  *[_type=='blog'] | order(_createdAt desc) {
    title,
    smallDescription,
    "currentSlug":slug.current,
    titleImage
  }
  `;

  const data = await sanityClient.fetch(query);

  return data;
}

export default async function Home() {
  const data: blogCard[] = await getData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 mt-5 gap-5">
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image
            width={500}
            height={500}
            src={urlFor(post.titleImage).url()}
            alt="blog image"
            className="rounded-t-lg h-[200px] object-cover"
          />
          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              {post.smallDescription}
            </p>
            <Button asChild className="w-full mt-7">
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
