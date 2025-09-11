import { PersonInfo } from '../types';

export const savePersonInfo = async (person: PersonInfo): Promise<void> => {
  const method = person.id ? 'PUT' : 'POST';
  const url = person.id ? `/api/persons/${person.id}` : '/api/persons';
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(person),
  });
  if (!res.ok) {
    throw new Error('Failed to save person');
  }
};

export const getPersonsData = async (): Promise<PersonInfo[]> => {
  const res = await fetch('/api/persons');
  if (!res.ok) {
    throw new Error('Failed to fetch persons');
  }
  return await res.json();
};

export const getPersonById = async (id: string): Promise<PersonInfo | null> => {
  const res = await fetch(`/api/persons/${id}`);
  if (!res.ok) {
    return null;
  }
  return await res.json();
};

export const deletePersonById = async (id: string): Promise<void> => {
  const res = await fetch(`/api/persons/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error('Failed to delete person');
  }
};