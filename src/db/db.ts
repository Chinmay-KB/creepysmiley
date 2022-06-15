import { User } from "@firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase_config";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const creepiesRef = collection(db, "creepies");
interface Creepy {
  smileAngle: number;
  smileDistance: number;
  eyeRadius: number;
  timestamp: number;
}

const submitVote = (vote: Creepy, user: User, toast: any) => {
  setDoc(doc(creepiesRef, user.uid ?? "rand"), {
    smileAngle: vote?.smileAngle,
    smileDistance: vote?.smileDistance,
    eyeRadius: vote?.eyeRadius,
    timestamp: Date.now(),
  }).then(() => {
    toast({
      title: "Emoji Submitted Successfully",
      description: "🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  });
};

export { submitVote, app };
export type { Creepy };
