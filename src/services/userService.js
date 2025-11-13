import { db } from '../firebase/config'
import { collection, doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'

// Collection name for beta users
const USERS_COLLECTION = 'betaUsers'

/**
 * Save user data when they sign up
 */
export const saveBetaUser = async (userData) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userData.email)

    const userDoc = {
      email: userData.email,
      name: userData.name || '',
      signupMethod: userData.signupMethod || 'email', // 'email', 'google', 'apple'
      signupDate: serverTimestamp(),
      lastActive: serverTimestamp(),
      profile: {
        gender: userData.gender || '',
        styleVibes: userData.styleVibes || [],
        makeupPreference: userData.makeupPreference || '',
        theme: userData.theme || 'light'
      },
      engagement: {
        onboardingCompleted: userData.onboardingCompleted || false,
        hasUsedChat: false,
        hasAddedClothes: false,
        hasCreatedOutfit: false,
        totalSessions: 1
      },
      feedback: {
        rating: null,
        review: null,
        submitted: false
      }
    }

    await setDoc(userRef, userDoc, { merge: true })
    console.log('✅ Beta user saved:', userData.email)
    return { success: true, userId: userData.email }
  } catch (error) {
    console.error('❌ Error saving beta user:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Update user's last active timestamp
 */
export const updateUserActivity = async (email) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, email)
    await updateDoc(userRef, {
      lastActive: serverTimestamp()
    })
  } catch (error) {
    console.error('Error updating user activity:', error)
  }
}

/**
 * Track user engagement events
 */
export const trackUserEngagement = async (email, eventType) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, email)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      const updates = {
        lastActive: serverTimestamp()
      }

      // Update specific engagement metrics
      switch (eventType) {
        case 'chat':
          updates['engagement.hasUsedChat'] = true
          break
        case 'addClothes':
          updates['engagement.hasAddedClothes'] = true
          break
        case 'createOutfit':
          updates['engagement.hasCreatedOutfit'] = true
          break
        case 'session':
          const currentSessions = userDoc.data().engagement?.totalSessions || 0
          updates['engagement.totalSessions'] = currentSessions + 1
          break
      }

      await updateDoc(userRef, updates)
    }
  } catch (error) {
    console.error('Error tracking engagement:', error)
  }
}

/**
 * Save user feedback/review
 */
export const saveFeedback = async (email, rating, review) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, email)
    await updateDoc(userRef, {
      'feedback.rating': rating,
      'feedback.review': review,
      'feedback.submitted': true,
      'feedback.submittedAt': serverTimestamp()
    })
    return { success: true }
  } catch (error) {
    console.error('Error saving feedback:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Update user profile data
 */
export const updateUserProfile = async (email, profileData) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, email)
    await updateDoc(userRef, {
      'profile.name': profileData.name || '',
      'profile.gender': profileData.gender || '',
      'profile.styleVibes': profileData.styleVibes || [],
      'profile.makeupPreference': profileData.makeupPreference || '',
      'profile.theme': profileData.theme || 'light',
      lastActive: serverTimestamp()
    })
    return { success: true }
  } catch (error) {
    console.error('Error updating profile:', error)
    return { success: false, error: error.message }
  }
}
