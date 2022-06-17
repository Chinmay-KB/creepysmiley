import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const aggregateNew = functions.firestore
  .document('creepies/{docId}')
  .onCreate(async (change) => {
    const newVote = change.data();
    const aggregateVote = await admin
      .firestore()
      .doc('aggregate/creepy_smiley')
      .get();
    if (aggregateVote !== undefined) {
      const count: number = aggregateVote.get('totalCount');
      const newEyeRadius = newVote.eyeRadius + aggregateVote.get('eyeRadius') * count;
      const newSmileDistance = newVote.smileDistance + aggregateVote.get('smileDistance') * count;
      const newSmileAngle = newVote.smileAngle + aggregateVote.get('smileAngle') * count;
      await admin
        .firestore()
        .doc('aggregate/creepy_smiley')
        .update({
          eyeRadius: newEyeRadius,
          smileDistance: newSmileDistance,
          smileAngle: newSmileAngle,
          timestamp: Date.now(),
          count: count + 1,
        });
    }
  });

export default { aggregateNew };
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
