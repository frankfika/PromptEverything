import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const url = 'http://127.0.0.1:8000/api/v1/tags/top?limit=10';
    console.log('Next.js API Route: Requesting URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Next.js API Route: Received data:', data);

    // 正确提取 tags 数组
    const formattedResponse = {
      code: 200,
      data: data.tags || [], // 从 data.tags 获取数组
      message: 'Success'
    };

    console.log('Next.js API Route: Sending response:', formattedResponse);
    return NextResponse.json(formattedResponse);

  } catch (error) {
    console.error('Next.js API Route: Error:', error);
    return NextResponse.json(
      { 
        code: 500,
        data: [],
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
} 