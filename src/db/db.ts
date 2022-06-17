import { User } from "@firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  getDoc,
  updateDoc,
  DocumentData,
} from "firebase/firestore";
import { firebaseConfig } from "./firebase_config";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const creepiesRef = collection(db, "creepies");
const aggregateRef = collection(db, "aggregate");

interface Creepy {
  smileAngle: number;
  smileDistance: number;
  eyeRadius: number;
  count?: number;
  timestamp: number;
}

const checkVoteExist = async (user?: User): Promise<Creepy | undefined> => {
  if (user == null) return;

  const data = await getDoc(doc(creepiesRef, user.email!));
  if (data != undefined) return <Creepy>data?.data();
};

const getAggregateData = async () => {
  return <Creepy>(await getDoc(doc(aggregateRef, "creepy_smiley"))).data();
};

const submitUserVote = async (email: string, vote: Creepy) =>
  await setDoc(doc(creepiesRef, email ?? "rand"), {
    smileAngle: vote?.smileAngle,
    smileDistance: vote?.smileDistance,
    eyeRadius: vote?.eyeRadius,
    timestamp: Date.now(),
  });

const submitAggregate = async (vote: Creepy) =>
  await setDoc(doc(aggregateRef, "creepy_smiley"), {
    smileAngle: vote.smileAngle,
    smileDistance: vote.smileDistance,
    eyeRadius: vote.eyeRadius,
    timestamp: Date.now(),
    count: vote.count,
  });

const submitVote = async (vote: Creepy, user: User, toast: any) => {
  const data = await checkVoteExist(user);
  const aggregate = await getAggregateData();
  const count = aggregate.count!;
  var newAggregate: Creepy;
  if (data) {
    newAggregate = {
      smileAngle:
        (aggregate.smileAngle * count - data.smileAngle + vote?.smileAngle) /
        count,
      smileDistance:
        (aggregate.smileDistance * count -
          data.smileDistance +
          vote?.smileDistance) /
        count,
      eyeRadius:
        (aggregate.eyeRadius * count - data.eyeRadius + vote?.eyeRadius) /
        count,
      count: count,
      timestamp: Date.now(),
    };
  } else {
    newAggregate = {
      smileAngle:
        (aggregate.smileAngle * count + vote?.smileAngle) / (count + 1),
      smileDistance:
        (aggregate.smileDistance * count + vote?.smileDistance) / (count + 1),
      eyeRadius: (aggregate.eyeRadius * count + vote?.eyeRadius) / (count + 1),
      count: count + 1,
      timestamp: Date.now(),
    };
  }
  await submitUserVote(user!.email!, vote!);
  await submitAggregate(newAggregate);
  toast({
    title: "Emoji Submitted Successfully",
    description: "🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂",
    status: "success",
    duration: 5000,
    isClosable: true,
  });

  // getDoc(doc(creepiesRef, user.email!)).then((existingData) => {
  //   if (existingData.exists()) {
  //     alert("exists");
  //     getDoc(doc(aggregateRef, "creepy_smiley")).then((data) => {
  //       const count = data.get("count");
  //       const oldSmileAngle = data.get("smileAngle") * count;
  //       const oldSmileDistance = data.get("smileDistance") * count;
  //       const oldEyeRadius = data.get("eyeRadius") * count;
  //       const newAggregate = {
  //         smileAngle:
  //           (vote?.smileAngle -
  //             existingData.get("smileAngle") +
  //             oldSmileAngle) /
  //           count,
  //         smileDistance:
  //           (vote?.smileDistance -
  //             existingData.get("smileDistance") +
  //             oldSmileDistance) /
  //           count,
  //         eyeRadius:
  //           (vote?.eyeRadius - existingData.get("eyeRadius") + oldEyeRadius) /
  //           count,
  //         timestamp: Date.now(),
  //         count: count,
  //       };
  //       updateDoc(doc(aggregateRef, "creepy_smiley"), newAggregate);
  //     });
  //   } else {
  //     getDoc(doc(aggregateRef, "creepy_smiley")).then((data) => {
  //       const count: number = data.get("count");
  //       const oldSmileAngle = (data.get("smileAngle") as number) * count;
  //       const oldSmileDistance = data.get("smileDistance") * count;
  //       const oldEyeRadius = data.get("eyeRadius") * count;
  //       const newAggregate = {
  //         smileAngle: (vote?.smileAngle + oldSmileAngle) / (count + 1),
  //         smileDistance: (vote?.smileDistance + oldSmileDistance) / (count + 1),
  //         eyeRadius: (vote?.eyeRadius + oldEyeRadius) / (count + 1),
  //         timestamp: Date.now(),
  //         count: count + 1,
  //       };
  //       console.log(oldSmileAngle, vote?.smileAngle);
  //       updateDoc(doc(aggregateRef, "creepy_smiley"), newAggregate);
  //     });
  //   }
  // });
  // setDoc(doc(creepiesRef, user.email ?? "rand"), {
  //   smileAngle: vote?.smileAngle,
  //   smileDistance: vote?.smileDistance,
  //   eyeRadius: vote?.eyeRadius,
  //   timestamp: Date.now(),
  // }).then(() => {
  // toast({
  //   title: "Emoji Submitted Successfully",
  //   description: "🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂",
  //   status: "success",
  //   duration: 5000,
  //   isClosable: true,
  // });
  // });
};

export { submitVote, app, getAggregateData };
export type { Creepy };
