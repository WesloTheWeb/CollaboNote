import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const isConnected = await db.testConnection();
    // const isConnected = false
    
    if (isConnected) {
      return NextResponse.json({ 
        status: 'healthy',
        database: 'connected' 
      });
    } else {
      return NextResponse.json({ 
        status: 'unhealthy',
        database: 'disconnected' 
      }, { status: 503 });
    }
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({ 
      status: 'error',
      database: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 });
  }
}