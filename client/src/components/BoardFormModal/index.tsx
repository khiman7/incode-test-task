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

const boardSchema = z.object({
  name: z.string().min(3, 'Name must consist of at least 3 characters'),
});

export type BoardFormInputs = z.infer<typeof boardSchema>;

interface BoardFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BoardFormInputs) => void;
}

export default function BoardFormModal({
  open,
  onClose,
  onSubmit,
}: BoardFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BoardFormInputs>({
    resolver: zodResolver(boardSchema),
  });

  const handleFormSubmit: SubmitHandler<BoardFormInputs> = (data) => {
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
          📝 Create new board
        </Typography>
        <Box
          component="form"
          sx={{ mt: 2 }}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <FormControl>
            <FormLabel>Name:</FormLabel>
            <Input placeholder="Name" {...register('name')} />
            {errors.name && (
              <FormHelperText sx={{ color: 'tomato' }}>
                {errors.name.message}
              </FormHelperText>
            )}
          </FormControl>
          <Button type="submit" sx={{ mt: 2 }} fullWidth>
            Create
          </Button>
        </Box>
      </Sheet>
    </Modal>
  );
}
