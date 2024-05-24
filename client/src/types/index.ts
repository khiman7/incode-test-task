export enum BoardList {
  TODO = 'todo',
  WORK_IN_PROGRESS = 'work_in_progress',
  DONE = 'done',
}

export interface Card {
  _id: string;
  title: string;
  description: string;
}

export interface List {
  _id: string;
  name: BoardList;
  cards: Card[];
}

export interface Board {
  _id: string;
  name: string;
  lists: List[];
}

export interface CreateBoardDTO {
  name: string;
}

export interface CreateCardDTO {
  boardId: string;
  listName: List['name'];
  title: string;
  description: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateCardDTO
  extends Partial<{
    boardId: string;
    listName: string;
    title: string;
    description: string;
  }> {}
