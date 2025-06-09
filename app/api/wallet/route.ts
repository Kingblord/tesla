import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock wallet data
const mockWallets = {
  1: {
    BTC: { balance: 0.15432, address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" },
    ETH: { balance: 2.5643, address: "0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4" },
    USDT: { balance: 1250.0, address: "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE" },
  },
}

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

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const user = verifyToken(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (user as any).userId

    // In a real app, you would query the database:
    // const wallets = await db.query('SELECT * FROM wallets WHERE user_id = $1', [userId])

    // Mock wallet data
    const userWallets = mockWallets[userId as keyof typeof mockWallets] || {
      BTC: { balance: 0, address: null },
      ETH: { balance: 0, address: null },
      USDT: { balance: 0, address: null },
    }

    return NextResponse.json({
      success: true,
      wallets: userWallets,
    })
  } catch (error) {
    console.error("Error fetching wallet data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const user = verifyToken(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { action, currency, amount, address } = await request.json()

    // Validate input
    if (!action || !currency) {
      return NextResponse.json({ error: "Action and currency are required" }, { status: 400 })
    }

    if (!["deposit", "withdraw"].includes(action)) {
      return NextResponse.json({ error: "Invalid action. Must be deposit or withdraw" }, { status: 400 })
    }

    if (!["BTC", "ETH", "USDT"].includes(currency)) {
      return NextResponse.json({ error: "Invalid currency. Must be BTC, ETH, or USDT" }, { status: 400 })
    }

    if (action === "deposit") {
      // Generate deposit address
      const depositAddress = generateDepositAddress(currency)

      return NextResponse.json({
        success: true,
        message: "Deposit address generated",
        depositAddress,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${depositAddress}`,
      })
    }

    if (action === "withdraw") {
      if (!amount || !address) {
        return NextResponse.json({ error: "Amount and address are required for withdrawal" }, { status: 400 })
      }

      // Validate minimum withdrawal amounts
      const minWithdrawals = { BTC: 0.001, ETH: 0.01, USDT: 10 }
      if (amount < minWithdrawals[currency as keyof typeof minWithdrawals]) {
        return NextResponse.json(
          {
            error: `Minimum withdrawal amount is ${minWithdrawals[currency as keyof typeof minWithdrawals]} ${currency}`,
          },
          { status: 400 },
        )
      }

      // In a real app, you would:
      // 1. Check user's balance
      // 2. Validate withdrawal address
      // 3. Create withdrawal transaction
      // 4. Queue for processing

      const transaction = {
        id: Math.floor(Math.random() * 10000),
        type: "withdrawal",
        amount,
        currency,
        address,
        status: "pending",
        fee: calculateWithdrawalFee(currency, amount),
        createdAt: new Date().toISOString(),
      }

      return NextResponse.json({
        success: true,
        message: "Withdrawal request submitted",
        transaction,
      })
    }
  } catch (error) {
    console.error("Wallet operation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generateDepositAddress(currency: string): string {
  // In a real app, you would generate actual addresses using crypto libraries
  const addresses = {
    BTC: "1" + Math.random().toString(36).substring(2, 34),
    ETH: "0x" + Math.random().toString(16).substring(2, 42),
    USDT: "T" + Math.random().toString(36).substring(2, 34),
  }

  return addresses[currency as keyof typeof addresses] || ""
}

function calculateWithdrawalFee(currency: string, amount: number): number {
  const fees = {
    BTC: 0.0005,
    ETH: 0.005,
    USDT: 5,
  }

  return fees[currency as keyof typeof fees] || 0
}
