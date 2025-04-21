import { mysqlPool } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const promisePool = mysqlPool.promise()
  const [rows, fields] = await promisePool.query(
    `SELECT * FROM attractions;`
  )
  return NextResponse.json(rows)
}
