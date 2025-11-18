"use server";

import { revalidateTag } from "next/cache";

async function revalidate(tag: string) {
  console.log(`🔄 Revalidating tag: ${tag}`);
  revalidateTag(tag);
  console.log(`✅ Tag revalidated: ${tag}`);
}

export default revalidate;
