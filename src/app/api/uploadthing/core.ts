import { currentUser } from "@/lib/current-user";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthenticated");
  }
  return { userId: user.id };
};

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
