import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect("/error?message=No code provided");
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(tokenData.error_description);
    }

    // Get user's GitHub profile
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    // Update user in database with GitHub info
    await prisma.user.update({
      where: {
        // You'll need to get the actual user ID from the session
        id: "current-user-id",
      },
      data: {
        githubId: userData.id.toString(),
        githubUsername: userData.login,
        githubAccessToken: tokenData.access_token,
      },
    });

    return NextResponse.redirect("/dashboard?github=connected");
  } catch (error) {
    console.error("GitHub OAuth error:", error);
    return NextResponse.redirect("/error?message=Failed to connect GitHub");
  }
} 