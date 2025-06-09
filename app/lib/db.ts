import { neon } from "@neondatabase/serverless"

// Create the database connection using Neon
export const sql = neon(process.env.DATABASE_URL!)

// For compatibility with components that expect 'db'
export const db = sql

// Database helper functions
export async function query(text: string, params: any[] = []) {
  try {
    const result = await sql(text, params)
    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// User-related database functions
export async function getUserById(id: number) {
  const result = await sql`SELECT * FROM users WHERE id = ${id}`
  return result[0] || null
}

export async function getUserByEmail(email: string) {
  const result = await sql`SELECT * FROM users WHERE email = ${email}`
  return result[0] || null
}

export async function createUser(userData: {
  email: string
  password: string
  full_name: string
  phone?: string
}) {
  const result = await sql`
    INSERT INTO users (email, password, full_name, phone, wallet_balance, created_at)
    VALUES (${userData.email}, ${userData.password}, ${userData.full_name}, ${userData.phone || ""}, 0.00, NOW())
    RETURNING *
  `
  return result[0]
}

// Wallet-related functions
export async function updateUserWallet(userId: number, amount: number, description: string, adminId?: number) {
  // Start transaction
  const user = await sql`SELECT wallet_balance FROM users WHERE id = ${userId}`
  if (!user[0]) throw new Error("User not found")

  const newBalance = Number.parseFloat(user[0].wallet_balance) + amount
  if (newBalance < 0) throw new Error("Insufficient balance")

  // Update wallet balance
  await sql`UPDATE users SET wallet_balance = ${newBalance} WHERE id = ${userId}`

  // Record transaction
  await sql`
    INSERT INTO transactions (user_id, type, amount, description, admin_id, created_at)
    VALUES (${userId}, ${amount > 0 ? "credit" : "debit"}, ${Math.abs(amount)}, ${description}, ${adminId || null}, NOW())
  `

  return newBalance
}

// Investment-related functions
export async function createInvestment(investmentData: {
  user_id: number
  plan_name: string
  amount: number
  expected_return: number
  duration_days: number
}) {
  const result = await sql`
    INSERT INTO investments (user_id, plan_name, amount, expected_return, duration_days, status, created_at)
    VALUES (${investmentData.user_id}, ${investmentData.plan_name}, ${investmentData.amount}, 
            ${investmentData.expected_return}, ${investmentData.duration_days}, 'active', NOW())
    RETURNING *
  `
  return result[0]
}

// Transaction functions
export async function getTransactionsByUserId(userId: number) {
  return await sql`
    SELECT * FROM transactions 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC
  `
}

export async function getAllTransactions() {
  return await sql`
    SELECT t.*, u.full_name, u.email 
    FROM transactions t
    LEFT JOIN users u ON t.user_id = u.id
    ORDER BY t.created_at DESC
  `
}

// Admin functions
export async function getAllUsers() {
  return await sql`
    SELECT id, email, full_name, phone, wallet_balance, is_admin, created_at
    FROM users 
    ORDER BY created_at DESC
  `
}

export async function getAllInvestments() {
  return await sql`
    SELECT i.*, u.full_name, u.email 
    FROM investments i
    LEFT JOIN users u ON i.user_id = u.id
    ORDER BY i.created_at DESC
  `
}

// Stats functions
export async function getAdminStats() {
  const totalUsers = await sql`SELECT COUNT(*) as count FROM users WHERE is_admin = false`
  const totalInvestments = await sql`SELECT COUNT(*) as count FROM investments`
  const totalDeposits =
    await sql`SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE type = 'deposit' AND status = 'approved'`
  const totalWithdrawals =
    await sql`SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE type = 'withdrawal' AND status = 'approved'`

  return {
    totalUsers: Number.parseInt(totalUsers[0].count),
    totalInvestments: Number.parseInt(totalInvestments[0].count),
    totalDeposits: Number.parseFloat(totalDeposits[0].total),
    totalWithdrawals: Number.parseFloat(totalWithdrawals[0].total),
  }
}
