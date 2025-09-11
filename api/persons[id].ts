import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM persons WHERE id = ${id}`;
      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(rows[0]);
    } else if (req.method === 'PUT') {
      const person = req.body;
      await sql`UPDATE persons SET name = ${person.name}, last_name = ${person.lastName}, personal_code = ${person.personalCode}, phone_number = ${person.phoneNumber}, address = ${person.address || null}, additional_info = ${person.additionalInfo || null}, disease_or_problem = ${person.diseaseOrProblem || null}, status = ${person.status || null}, emergency_note = ${person.emergencyNote || null}, created_at = ${person.createdAt} WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    } else if (req.method === 'DELETE') {
      await sql`DELETE FROM persons WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};