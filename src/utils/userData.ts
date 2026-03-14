// src/utils/userData.ts
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// Save scores for a user (merge with existing data)
export async function saveScores(
  uid: string,
  puzzleScore?: number,
  memoryScore?: number,
) {
  const docRef = doc(db, "users", uid);
  const snapshot = await getDoc(docRef);
  const existingData = snapshot.exists() ? snapshot.data() : {};

  await setDoc(
    docRef,
    {
      puzzleScore: puzzleScore ?? existingData.puzzleScore ?? 0,
      memoryScore: memoryScore ?? existingData.memoryScore ?? 0,
    },
    { merge: true },
  );
}

// Get scores for a user
export async function getScores(uid: string) {
  const docRef = doc(db, "users", uid);
  const snapshot = await getDoc(docRef);
  return snapshot.exists()
    ? snapshot.data()
    : { puzzleScore: 0, memoryScore: 0 };
}
