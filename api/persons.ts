import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM persons ORDER BY created_at DESC`;
      return res.status(200).json(rows);
    } else if (req.method === 'POST') {
      const person = req.body;
      await sql`INSERT INTO persons (id, name, last_name, personal_code, phone_number, address, additional_info, disease_or_problem, status, emergency_note, created_at) VALUES (${person.id}, ${person.name}, ${person.lastName}, ${person.personalCode}, ${person.phoneNumber}, ${person.address || null}, ${person.additionalInfo || null}, ${person.diseaseOrProblem || null}, ${person.status || null}, ${person.emergencyNote || null}, ${person.createdAt})`;
      return res.status(201).json({ success: true });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};