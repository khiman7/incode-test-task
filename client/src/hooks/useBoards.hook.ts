import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../constants';
import {
  FetchBoardsQueryParams,
  createBoard,
  deleteBoard,
  fetchBoards,
} from '../services/boards.service';
import { Board, CreateBoardDTO } from '../types';

export default function useBoards(queryParams?: FetchBoardsQueryParams) {
  const queryClient = useQueryClient();
  const { data, isSuccess, isLoading, isError, error, refetch } = useQuery<
    Board[]
  >({
    queryKey: [QUERY_KEYS.BOARDS],
    queryFn: () => fetchBoards(queryParams),
  });

  const createMutation = useMutation({
    mutationFn: ({ dto }: { dto: CreateBoardDTO }) => createBoard(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOARDS] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: Board['_id'] }) => deleteBoard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOARDS] });
    },
  });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
    error,
    createBoard: (dto: CreateBoardDTO) =>
      createMutation.mutate({
        dto,
      }),
    deleteBoard: (id: Board['_id']) => deleteMutation.mutate({ id }),
    refetch,
  };
}
