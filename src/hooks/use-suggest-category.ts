"use client";

import { useState } from 'react';
import { suggestCategory as suggestCategoryFlow } from '@/ai/flows/suggest-category';
import { useToast } from '@/hooks/use-toast';

export function useSuggestCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const suggestCategory = async (description: string) => {
    if (!description.trim()) return null;
    setIsLoading(true);
    try {
      const result = await suggestCategoryFlow({ transactionDescription: description });
      return result.suggestedCategory;
    } catch (error) {
      console.error("Error suggesting category:", error);
      toast({
        title: "Suggestion Failed",
        description: "Could not get a category suggestion. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { suggestCategory, isLoading };
}
