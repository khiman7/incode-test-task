import { useState } from 'react';
import { Add, Dashboard, FileDownload } from '@mui/icons-material';
import {
  Autocomplete,
  AutocompleteOption,
  Box,
  Button,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from '@mui/joy';

import { Board } from '../../types';
import BoardFormModal, { BoardFormInputs } from '../BoardFormModal';

export interface SearchProps {
  options: Board[];
  onLoad: (board: Board) => void;
  onCreate: (data: BoardFormInputs) => void;
}

export default function Search({ options, onLoad, onCreate }: SearchProps) {
  const [selectedBoard, setSelectedBoard] = useState<Board>();
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        {options && (
          <>
            <Autocomplete
              sx={{ flex: 1 }}
              placeholder="Enter a board ID here..."
              startDecorator={<Dashboard />}
              options={options}
              getOptionLabel={(option) => option._id}
              renderOption={(props, option) => (
                <AutocompleteOption {...props}>
                  <ListItemDecorator>
                    <img
                      width={32}
                      height={32}
                      src={`https://picsum.photos/seed/${option._id}/200/300`}
                      alt=""
                    />
                  </ListItemDecorator>
                  <ListItemContent sx={{ ml: 2 }}>
                    <Typography level="title-md">{option.name}</Typography>
                    <Typography level="body-sm">ID: {option._id}</Typography>
                  </ListItemContent>
                </AutocompleteOption>
              )}
              onChange={(_, board) => board && setSelectedBoard(board)}
            />
            <Button
              disabled={!selectedBoard}
              variant="solid"
              startDecorator={<FileDownload />}
              sx={{ ml: 2 }}
              onClick={() => selectedBoard && onLoad(selectedBoard)}
            >
              Load
            </Button>
            <Button
              variant="solid"
              startDecorator={<Add />}
              sx={{ ml: 1 }}
              onClick={() => setIsCreateBoardModalOpen(true)}
            >
              New
            </Button>
          </>
        )}
      </Box>
      <BoardFormModal
        open={isCreateBoardModalOpen}
        onSubmit={onCreate}
        onClose={() => setIsCreateBoardModalOpen(false)}
      />
    </>
  );
}
