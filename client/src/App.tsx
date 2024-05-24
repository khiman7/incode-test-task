import { useState } from 'react';

import { Board as IBoard } from './types';
import useBoards from './hooks/useBoards.hook';

import MainLayout from './layouts/MainLayout';
import Search from './components/Search';
import Board from './components/Board';

export default function App() {
  const { data: boards, createBoard, deleteBoard } = useBoards();
  const [selectedBoard, setSelectedBoard] = useState<IBoard>();

  function handleDeleteBoard(id: IBoard['_id']) {
    deleteBoard(id);
    setSelectedBoard(undefined);
  }

  return (
    <MainLayout>
      {boards && (
        <Search
          options={boards}
          onLoad={(board) => setSelectedBoard(board)}
          onCreate={createBoard}
        />
      )}
      {selectedBoard && (
        <Board boardId={selectedBoard._id} onDelete={handleDeleteBoard} />
      )}
    </MainLayout>
  );
}
