// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";
import { signIn } from "next-auth/react"
import { GitHubAPI } from "../lib/github"
import { Session } from "next-auth"

export async function getData() {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not defined');
    }
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`...`;
    return data;
}

export async function signInWithGitHub(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/github')
    return true
  } catch (error) {
    console.error('GitHub authentication error:', error)
    return false
  }
}

export async function getGitHubData(session: Session | null) {
  if (!session?.accessToken) return null;

  const github = new GitHubAPI(session.accessToken);
  
  const [repos, prs, issues] = await Promise.all([
    github.getRepositories(),
    github.getPullRequests(),
    github.getIssues(),
  ]);

  return {
    repositories: repos,
    pullRequests: prs,
    issues: issues,
  };
}