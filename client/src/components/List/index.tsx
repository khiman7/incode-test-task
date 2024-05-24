import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Box, Divider, IconButton, Typography } from '@mui/joy';
import { Add } from '@mui/icons-material';

import { List as IList, Card as ICard } from '../../types';
import { capitalize } from '../../utils/helpers';
import { DND_ITEM_TYPES } from '../../constants';

import Card from '../Card';
import CardFormModal, { CardFormInputs } from '../CardFormModal';

export interface ListProps {
  data: IList;
  onCreateCard: (listName: IList['name'], data: CardFormInputs) => void;
  onEditCard: (cardId: ICard['_id'], data: CardFormInputs) => void;
  onDeleteCard: (cardId: ICard['_id']) => void;
  onDrop: (cardId: ICard['_id'], listName: IList['name']) => void;
}

export default function List({
  data,
  onCreateCard,
  onEditCard,
  onDeleteCard,
  onDrop,
}: ListProps) {
  const [, dropRef] = useDrop({
    accept: DND_ITEM_TYPES.CARD,
    drop(card: ICard) {
      onDrop(card._id, data.name);
    },
  });
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] =
    useState<boolean>(false);

  function normalizeListName(name: string) {
    return name
      .split('_')
      .map((word) => capitalize(word))
      .join(' ');
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          width: '30%',
          justifyContent: 'center',
          flexDirection: 'column',
          alignSelf: 'self-start',
        }}
      >
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Typography level="title-lg">
              {normalizeListName(data.name)}
            </Typography>
          </Box>
          <IconButton
            variant="solid"
            color="primary"
            onClick={() => setIsCreateCardModalOpen(true)}
          >
            <Add />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box
          ref={dropRef}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '480px',
            p: 1,
          }}
        >
          {data.cards.map((card) => (
            <Card
              key={card._id}
              data={card}
              onEdit={(formData) => onEditCard(card._id, formData)}
              onDelete={() => onDeleteCard(card._id)}
            />
          ))}
        </Box>
      </div>
      <CardFormModal
        mode="create"
        open={isCreateCardModalOpen}
        onSubmit={(formData) => onCreateCard(data.name, formData)}
        onClose={() => setIsCreateCardModalOpen(false)}
      />
    </>
  );
}
