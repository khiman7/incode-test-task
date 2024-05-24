import { useEffect, useState } from 'react';
import { Box, BoxProps, Button, Typography } from '@mui/joy';
import { Delete } from '@mui/icons-material';

import { Board as IBoard, List as IList, Card as ICard } from '../../types';
import { useBoard } from '../../hooks/useBoard.hook';

import List from '../List';
import { CardFormInputs } from '../CardFormModal';

interface BoardProps extends BoxProps {
  boardId: IBoard['_id'];
  onDelete: (id: IBoard['_id']) => void;
}

export default function Board({ boardId, onDelete, ...props }: BoardProps) {
  const {
    data,
    isSuccess,
    isLoading,
    isError,
    createCard,
    updateCard,
    deleteCard,
  } = useBoard(boardId);
  const [board, setBoard] = useState(data);

  useEffect(() => {
    if (data) {
      setBoard(data);
    }
  }, [data]);

  function handleCreateCard(listName: IList['name'], dto: CardFormInputs) {
    createCard({
      boardId,
      listName,
      ...dto,
    });
  }

  function handleEditCard(id: ICard['_id'], dto: CardFormInputs) {
    updateCard(id, dto);
  }

  function handleDeleteCard(id: ICard['_id']) {
    deleteCard(id);
  }

  async function moveCard(cardId: ICard['_id'], listName: IList['name']) {
    updateCard(cardId, {
      boardId,
      listName,
    });

    setBoard((prevBoard) => {
      if (!prevBoard) return prevBoard;

      const newBoard = { ...prevBoard };
      const cardToMove = newBoard.lists
        .flatMap((list) => list.cards)
        .find((card) => card._id === cardId);

      if (!cardToMove) return newBoard;

      newBoard.lists = newBoard.lists.map((list) => ({
        ...list,
        cards: list.cards.filter((card) => card._id !== cardId),
      }));

      newBoard.lists = newBoard.lists.map((list) =>
        list.name === listName
          ? { ...list, cards: [...list.cards, cardToMove] }
          : list
      );

      return newBoard;
    });
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading board</div>;

  return (
    <Box>
      {isSuccess && board && (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 3,
              width: '100%',
            }}
          >
            <Typography level="h3">{board.name}</Typography>
            <Button
              variant="solid"
              color="danger"
              startDecorator={<Delete />}
              onClick={() => onDelete(boardId)}
            >
              Delete board
            </Button>
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
            {...props}
          >
            {board.lists.map((list) => (
              <List
                key={list.name}
                data={list}
                onCreateCard={handleCreateCard}
                onEditCard={handleEditCard}
                onDeleteCard={handleDeleteCard}
                onDrop={moveCard}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
