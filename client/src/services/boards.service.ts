import axios from '../axios';
import { API_ENDPOINTS } from '../constants';
import { Board, CreateBoardDTO } from '../types';

export interface FetchBoardsQueryParams {
  q: string;
}

export async function fetchBoards(
  queryParams?: FetchBoardsQueryParams
): Promise<Board[]> {
  const { data } = await axios.get(
    API_ENDPOINTS.BOARDS,
    queryParams && {
      params: {
        q: queryParams.q,
      },
    }
  );

  return data;
}

export async function fetchBoardById(id: Board['_id']): Promise<Board> {
  const { data } = await axios.get(`${API_ENDPOINTS.BOARDS}/${id}`);

  return data;
}

export async function createBoard(dto: CreateBoardDTO): Promise<Board> {
  const { data } = await axios.post(API_ENDPOINTS.BOARDS, dto);

  return data;
}

export async function deleteBoard(id: Board['_id']): Promise<void> {
  return axios.delete(`${API_ENDPOINTS.BOARDS}/${id}`);
}
