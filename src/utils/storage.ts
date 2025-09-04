import { PersonInfo } from '../types';

const STORAGE_KEY = 'personal_info_data';

export const savePersonInfo = (person: PersonInfo): void => {
  const existingData = getPersonsData();
  
  // Check if person with same ID already exists
  const existingIndex = existingData.findIndex(p => p.id === person.id);
  
  let updatedData;
  if (existingIndex !== -1) {
    // Update existing person
    updatedData = [...existingData];
    updatedData[existingIndex] = person;
  } else {
    // Add new person
    updatedData = [...existingData, person];
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
};

export const getPersonsData = (): PersonInfo[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getPersonById = (id: string): PersonInfo | null => {
  const data = getPersonsData();
  return data.find(person => person.id === id) || null;
};

export const deletePersonById = (id: string): void => {
  const data = getPersonsData();
  const filteredData = data.filter(person => person.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredData));
};