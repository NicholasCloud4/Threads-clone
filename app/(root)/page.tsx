import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();

  //console.log(result);

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((posts) => (
              <ThreadCard
                key={posts._id}
                id={posts._id}
                currentUserId={user?.id || ""}
                parentId={posts.parentId}
                content={posts.text}
                author={posts.author}
                community={posts.community}
                createdAt={posts.createdAt}
                comments={posts.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
