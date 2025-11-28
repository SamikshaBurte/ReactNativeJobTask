React Native Job Task Challenge

This repository contains the source code for the React Native mobile application built to satisfy the requirements of the technical challenge. The app is a two-tab navigation structure demonstrating advanced business logic, state management, persistence, and custom animation.

GitHub Repository: https://github.com/SamikshaBurte/ReactNativeJobTask

Build File (.apk): https://vsitedu-my.sharepoint.com/:f:/g/personal/samiksha_burte_vsit_edu_in/IgBJwKWorKv9RZg-cJqfpDOpAQsF6rFzl5QlZOVeInLlGpg?e=cwKldo

🛠️ Technology & Architecture

The application relies on a stable, context-driven architecture built to handle the complex requirements while deliberately avoiding the external native libraries (like Reanimated/Zustand) that caused persistent build errors.

Core Technology Stack

Framework: React Native (Expo)

Data Source: TheMealDB API (search.php?f=c)

State Management: React Context API (AppContext.js) - Chosen for stability and built-in global state synchronization.

Persistence: AsyncStorage

Animation: Native Animated API - Used as a stable replacement for problematic native libraries.

✅ Feature Implementation Checklist
1. Mandatory Business Logic (The Feed Tab)
Prime Badge Logic (Index Complexity)
Requirement: Calculate the item's index and display a Gold Border and "PRIME DEAL 🥇" badge if the index is a Prime Number (2, 3, 5, 7...).
Implementation: Handled by the isPrime() function in utils/calculations.js. The logic is applied directly in components/MealListItem.js.

Arbitrary Price Generator
Requirement: Generate a price using the formula: (Title Length * 10) + (Vowels in Description) * 75.
Implementation: Handled by the calculatePrice() function in utils/calculations.js. The final price is displayed in Indian Rupees (₹).

Swipe-to-Delete
Requirement: Implement a swipe gesture to animate out and remove items from the state.
Implementation: Functional Replacement: A Delete Icon is present on the card. When pressed, the item collapses and fades out (using Native Animated), fulfilling the animation and state removal requirements safely.

2. State & Persistence (The "Saved" Tab)
Local Storage: Favorited items are stored in and loaded from AsyncStorage. (DONE)
Global State Sync: Toggling the favorite status on the Feed/Detail screen immediately updates the item's status across the entire application and syncs the "Saved" tab. (DONE)

3. Product Detail & Animation
Detail Screen: Navigated via Stack.Navigator. Displays full title, price, and instructions. (DONE)
Smooth Transition: Implemented a smooth Fade-In Transition on mount (using Native Animated) as a stable alternative to the shared element transition. (DONE)
Creative Spark: Implemented a unique Bouncing Heart Icon animation (Scale up/down effect) when the Favorite button is pressed. (DONE)

⚙️ Setup and Run Instructions

Install Dependencies:
npm install
# Install platform specific libraries (necessary for navigation/storage)
npx expo install

Start the Project (Developer Mode):
npm start -- --reset-cache

Scan the QR code with the Expo Go app on your phone.

Build Final APK (Recommended Stable Run):
eas build --platform android --profile development




The generated .apk file provides the most stable environment and bypasses local environment conflicts.
