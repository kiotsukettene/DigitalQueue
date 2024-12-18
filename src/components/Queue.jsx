import React, { useState, useEffect } from 'react';
import { database } from '../firebase';  // Note the changed path
import { ref, onValue } from 'firebase/database';

function QueueDisplay() {
  const [queueNumber, setQueueNumber] = useState(0);

  useEffect(() => {
    const queueRef = ref(database, 'queue/number');
    onValue(queueRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase Data:", data);
      if (data !== null) {
        setQueueNumber(data);
      }
    }, (error) => {
      console.error("Firebase error:", error);
    });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Queue Management System</h1>
      <h2>Now Serving: {queueNumber}</h2>
    </div>
  );
}

export default QueueDisplay; 