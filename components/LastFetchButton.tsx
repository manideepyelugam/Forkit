'use client'

import React, { useTransition } from 'react'
import { Button } from './ui/button'
import revalidate from "@/lib/revalidate"
import { useRouter } from "next/navigation";
import { RefreshCw } from 'lucide-react';

type LastFetch = {
  updatedAtData: string,
  revalidateData: string,
  onRefresh?: () => void
}

const LastFetchButton = ({ updatedAtData, revalidateData, onRefresh }: LastFetch) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRefresh = () => {
    startTransition(async () => {
      await revalidate(revalidateData);
      if (onRefresh) {
        onRefresh(); // Trigger parent component to refetch
      }
      router.refresh(); 
    });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="text-xs text-muted-foreground">
        Last updated: <span className="font-medium">{updatedAtData || 'Loading...'}</span>
      </div>
      <Button
        disabled={isPending}
        onClick={handleRefresh}
        size="sm"
        variant="outline"
        className="gap-2"
      >
        <RefreshCw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
        {isPending ? "Refreshing..." : "Refresh"}
      </Button>
    </div>
  )
}

export default LastFetchButton;
