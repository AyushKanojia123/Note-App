import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('notesapp');
    const notes = await db
      .collection('notes')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(notes);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('notesapp');
    
    const note = {
      title: body.title,
      content: body.content,
      createdAt: new Date(),
    };
    
    const result = await db.collection('notes').insertOne(note);
    return NextResponse.json({ ...note, _id: result.insertedId }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}