export const Samplekeys = {
  all: ['sample'] as const,
  lists: () => [...Samplekeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => {
    return [...Samplekeys.lists(), filters] as const;
  },
  details: () => [...Samplekeys.all, 'detail'] as const,
  detail: (id: string) => [...Samplekeys.details(), id] as const,
};
