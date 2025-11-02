import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function GET(request: NextRequest) {
      const res = await prisma.openSourceOrg.findMany();
      return NextResponse.json(res);
}


export async function POST(request: NextRequest) {
      const { name, url, language,userId } = await request.json();
      const res = await prisma.openSourceOrg.create({
            data: { name, url, language,userId },
      });
      return NextResponse.json(res);
}


export async function DELETE(request: NextRequest) {
      const { id } = await request.json();
      
      const res = await prisma.openSourceOrg.delete({
            where: { id },
      });
      return NextResponse.json(res);
}