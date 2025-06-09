import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { transactionQueries } from "@/lib/database"

function verifyToken(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { amount, currency, address } = await request.json()

    // Validate input
    if (!amount || !currency || !address) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Check user's balance
    // 2. Validate withdrawal amount against minimum withdrawal limits
    // 3. Check if withdrawal amount + fee is less than or equal to user's balance
    // 4. Create a withdrawal transaction record

    const transaction = await transactionQueries.createTransaction({
      userId: (user as any).userId,
      type: "withdrawal",
      amount: Number.parseFloat(amount),
      currency,
      status: "pending",
      walletAddress: address,
      notes: "Withdrawal request",
    })

    return NextResponse.json({
      success: true,
      message: "Withdrawal request submitted successfully",
      transaction,
    })
  } catch (error) {
    console.error("Withdrawal error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
