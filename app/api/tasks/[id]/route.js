import { NextResponse } from 'next/server';
export async function DELETE(req, { params }) {
    const { id } = params;
  
    // Perform deletion logic here, e.g., delete from DB
    return NextResponse.json({ message: `Task ${id} deleted successfully` });
  }

export async function PUT(req, { params }) {
  const { id,title } = params;
  const body = await req.json();

  // your update logic here
  return NextResponse.json({ message: `Task ${title} updated successfully`, data: body });
}
