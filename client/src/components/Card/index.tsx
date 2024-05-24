import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Box, IconButton, Typography } from '@mui/joy';
import { Delete, Edit } from '@mui/icons-material';

import { Card as ICard } from '../../types';
import { DND_ITEM_TYPES } from '../../constants';
import CardFormModal, { CardFormInputs } from '../CardFormModal';

export interface CardProps {
  data: ICard;
  onEdit: (data: CardFormInputs) => void;
  onDelete: () => void;
}

export default function Card({ data, onEdit, onDelete }: CardProps) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: DND_ITEM_TYPES.CARD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: data,
  }));
  const [isEditCardModalOpen, setIsEditCardModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <Box
        ref={dragRef}
        sx={{
          mb: 2,
          p: 2,
          boxShadow:
            'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
          borderRadius: 8,
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <Typography level="title-md">{data.title}</Typography>
        <Typography sx={{ mt: 1, wordWrap: 'break-word' }} level="body-md">
          {data.description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            gap: 1,
            mt: 2,
          }}
        >
          <IconButton
            size="sm"
            variant="solid"
            color="primary"
            onClick={() => setIsEditCardModalOpen(true)}
          >
            <Edit />
          </IconButton>
          <IconButton
            size="sm"
            variant="solid"
            color="danger"
            onClick={() => onDelete()}
          >
            <Delete />
          </IconButton>
        </Box>
      </Box>
      <CardFormModal
        mode="edit"
        open={isEditCardModalOpen}
        cardData={data}
        onSubmit={(formData) => onEdit(formData)}
        onClose={() => setIsEditCardModalOpen(false)}
      />
    </>
  );
}
