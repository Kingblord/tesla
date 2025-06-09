import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { query } from "@/lib/database"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action")

  if (action === "check") {
    try {
      // Check if admin user exists
      const adminUser = await query(
        "SELECT id, email, first_name, last_name, role, status, password_hash FROM users WHERE email = $1",
        ["admin@teslainvest.com"],
      )

      // Check all users count
      const userCount = await query("SELECT COUNT(*) as count FROM users")

      // Test password if admin exists
      let passwordTest = null
      if (adminUser.rows.length > 0) {
        const user = adminUser.rows[0]
        try {
          passwordTest = await bcrypt.compare("admin123", user.password_hash)
        } catch (error) {
          passwordTest = { error: error.message }
        }
      }

      // Check database connection
      const dbTest = await query("SELECT NOW() as current_time, version() as db_version")

      return NextResponse.json({
        success: true,
        adminUserExists: adminUser.rows.length > 0,
        adminUser: adminUser.rows[0]
          ? {
              id: adminUser.rows[0].id,
              email: adminUser.rows[0].email,
              name: `${adminUser.rows[0].first_name} ${adminUser.rows[0].last_name}`,
              role: adminUser.rows[0].role,
              status: adminUser.rows[0].status,
              hasPasswordHash: !!adminUser.rows[0].password_hash,
              passwordHashLength: adminUser.rows[0].password_hash?.length || 0,
            }
          : null,
        passwordTest,
        totalUsers: Number.parseInt(userCount.rows[0].count),
        databaseConnection: dbTest.rows[0],
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Check admin error:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Database check failed",
          details: error.message,
        },
        { status: 500 },
      )
    }
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action")

  try {
    if (action === "reset") {
      console.log("Resetting admin user...")
      // Delete existing admin user
      await query("DELETE FROM users WHERE email = $1", ["admin@teslainvest.com"])
    }

    // Create fresh password hash
    const password = "admin123"
    const hashedPassword = await bcrypt.hash(password, 12)

    console.log("Creating admin user with hash:", hashedPassword.substring(0, 20) + "...")

    // Create new admin user
    const result = await query(
      `INSERT INTO users (
        email, 
        password_hash, 
        first_name, 
        last_name, 
        role, 
        status, 
        email_verified,
        referral_code,
        created_at,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      ON CONFLICT (email) DO UPDATE SET
        password_hash = EXCLUDED.password_hash,
        role = EXCLUDED.role,
        status = EXCLUDED.status,
        updated_at = NOW()
      RETURNING id, email, first_name, last_name, role, status`,
      ["admin@teslainvest.com", hashedPassword, "Admin", "User", "super_admin", "active", true, "ADMIN001"],
    )

    // Test the password immediately
    const passwordTest = await bcrypt.compare(password, hashedPassword)

    // Test login API
    let loginTest = null
    try {
      const loginResponse = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "admin@teslainvest.com",
          password: "admin123",
        }),
      })
      loginTest = {
        status: loginResponse.status,
        success: loginResponse.ok,
      }
    } catch (error) {
      loginTest = { error: error.message }
    }

    return NextResponse.json({
      success: true,
      message: action === "reset" ? "Admin user reset and created successfully" : "Admin user created successfully",
      user: result.rows[0],
      passwordTest: passwordTest,
      loginTest,
      credentials: {
        email: "admin@teslainvest.com",
        password: "admin123",
      },
      nextSteps: ["Go to /login", "Enter the credentials above", "You should be redirected to /admin"],
    })
  } catch (error) {
    console.error("Setup admin error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create admin user",
        details: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
