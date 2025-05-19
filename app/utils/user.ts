import { db } from "~/firebase.client";
import { doc, setDoc, getDoc } from "firebase/firestore";
import type { User } from "firebase/auth";

// Alt her er hentet fra remix firebase auth tutorial fra incertase.io: https://invertase.io/blog/remix-firebase-auth

export async function createUserIfItNotExists(user: User, name?: string) {
  if (!user.uid) return false;

  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const userData = {
        email: user.email,
        groups: [],
        name: name || user.displayName,
        uid: user.uid,
      };

      await setDoc(userRef, userData);
      return { created: true, userRef };
    } else {
      return { created: false, userRef, data: userSnap.data() };
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return { error };
  }
}
