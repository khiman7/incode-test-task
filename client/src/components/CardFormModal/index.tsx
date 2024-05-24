import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  Sheet,
  Typography,
  Button,
  FormHelperText,
} from '@mui/joy';
import { Card as ICard } from '../../types';

const cardSchema = z.object({
  title: z.string().min(3, 'Title must consist of at least 3 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(64, 'Maximum description length is 64 characters'),
});

export type CardFormInputs = z.infer<typeof cardSchema>;

interface CardFormModalProps {
  open: boolean;
  mode: 'create' | 'edit';
  cardData?: ICard;
  onClose: () => void;
  onSubmit: (data: CardFormInputs) => void;
}

export default function CardFormModal({
  open,
  mode,
  cardData,
  onClose,
  onSubmit,
}: CardFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CardFormInputs>({
    resolver: zodResolver(cardSchema),
    defaultValues: cardData
      ? { title: cardData.title, description: cardData.description }
      : {},
  });

  const handleFormSubmit: SubmitHandler<CardFormInputs> = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{
          minWidth: 460,
          borderRadius: 'md',
          p: 3,
        }}
      >
        <ModalClose variant="outlined" />
        <Typography component="h2" level="h4" fontWeight="lg">
          {mode === 'create' ? '📝 Create new card' : '✏️ Edit card'}
        </Typography>
        <Box
          component="form"
          sx={{ mt: 2 }}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <FormControl>
            <FormLabel>Title:</FormLabel>
            <Input placeholder="Title" {...register('title')} />
            {errors.title && (
              <FormHelperText sx={{ color: 'tomato' }}>
                {errors.title.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ mt: 2 }}>
            <FormLabel>Description:</FormLabel>
            <Input placeholder="Description" {...register('description')} />
            {errors.description && (
              <FormHelperText sx={{ color: 'tomato' }}>
                {errors.description.message}
              </FormHelperText>
            )}
          </FormControl>
          <Button type="submit" sx={{ mt: 2 }} fullWidth>
            {mode === 'create' ? 'Create' : 'Update'}
          </Button>
        </Box>
      </Sheet>
    </Modal>
  );
}
