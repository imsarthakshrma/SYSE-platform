export const REVIEWER_CONFIG = {
  githubUsername: 'imsarthakshrma', // Make sure this is EXACTLY your GitHub username
  role: 'REVIEWER',
  permissions: {
    canMerge: true,
    canReview: true
  }
}

export function isReviewer(username: string | null | undefined): boolean {
  console.log('isReviewer check:', {
    input: username?.trim(),
    expected: REVIEWER_CONFIG.githubUsername,
    matches: username?.trim().toLowerCase() === REVIEWER_CONFIG.githubUsername.toLowerCase()
  })
  
  if (!username) {
    console.log('No username provided')
    return false
  }
  
  // Case-insensitive comparison and trim any whitespace
  const normalizedInput = username.trim().toLowerCase()
  const normalizedExpected = REVIEWER_CONFIG.githubUsername.toLowerCase()
  const isMatch = normalizedInput === normalizedExpected
  
  console.log(`Username "${username}" ${isMatch ? 'matches' : 'does not match'} reviewer "${REVIEWER_CONFIG.githubUsername}"`)
  
  return isMatch
} 