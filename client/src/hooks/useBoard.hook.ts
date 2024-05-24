import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Board, Card, CreateCardDTO, UpdateCardDTO } from '../types';
import { QUERY_KEYS } from '../constants';
import { createCard, deleteCard, updateCard } from '../services/cards.service';
import { fetchBoardById } from '../services/boards.service';

export function useBoard(boardId: Board['_id']) {
  const queryClient = useQueryClient();

  const { data, isSuccess, isLoading, isError, refetch } = useQuery({
    queryKey: [QUERY_KEYS.BOARD, boardId],
    queryFn: () => fetchBoardById(boardId),
  });

  const createCardMutation = useMutation({
    mutationFn: ({ dto }: { dto: CreateCardDTO }) => createCard(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOARD, boardId] });
    },
  });

  const updateCardMutation = useMutation({
    mutationFn: ({ id, dto }: { id: Card['_id']; dto: UpdateCardDTO }) =>
      updateCard(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOARD, boardId] });
    },
  });

  const deleteCardMutation = useMutation({
    mutationFn: ({ id }: { id: Card['_id'] }) => deleteCard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOARD, boardId] });
    },
  });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
    refetch,
    createCard: (dto: CreateCardDTO) =>
      createCardMutation.mutate({
        dto,
      }),
    updateCard: (id: Card['_id'], dto: UpdateCardDTO) =>
      updateCardMutation.mutate({ id, dto }),
    deleteCard: (id: Card['_id']) => deleteCardMutation.mutate({ id }),
  };
}
