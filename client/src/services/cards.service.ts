import axios from '../axios';
import { API_ENDPOINTS } from '../constants';
import { Card, CreateCardDTO, UpdateCardDTO } from '../types';

export async function createCard(dto: CreateCardDTO) {
  const { data } = await axios.post(API_ENDPOINTS.CARDS, dto);

  return data;
}

export async function updateCard(id: Card['_id'], dto: UpdateCardDTO) {
  const { data } = await axios.put(`${API_ENDPOINTS.CARDS}/${id}`, dto);

  return data;
}

export async function deleteCard(id: Card['_id']) {
  return axios.delete(`${API_ENDPOINTS.CARDS}/${id}`);
}
