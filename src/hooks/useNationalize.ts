import { useQuery, type QueryFunctionContext } from '@tanstack/react-query';
import { fetchNationalize, type NationalizeResponse } from '../api/nationalize';

export function useNationalize(name?: string | null) {
  return useQuery<NationalizeResponse, Error>({
    queryKey: ['nationalize', name], // cache id. 2nd time user ask for ['nationalize', 'John'] it will reply with cached data
    // react-query provides a signal (AbortSignal) to the queryFn for cancellation
    queryFn: (context: QueryFunctionContext) => fetchNationalize(name!, context.signal as AbortSignal | undefined),
    // if name is null or "", don't send the request
    enabled: !!name,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
