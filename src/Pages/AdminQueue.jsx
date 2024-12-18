import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { database } from '../firebase';
import { ref, set, onValue } from 'firebase/database';

function AdminQueue() {
  const [currentQueue, setCurrentQueue] = useState(0);

  const handleNextQueue = () => {
    const newQueueNumber = currentQueue + 1;
    set(ref(database, 'queue/number'), newQueueNumber)
      .then(() => {
        setCurrentQueue(newQueueNumber);
      })
      .catch((error) => {
        console.error("Error updating queue:", error);
      });
  };

  const handleResetQueue = () => {
    set(ref(database, 'queue/number'), 0)
      .then(() => {
        setCurrentQueue(0);
      })
      .catch((error) => {
        console.error("Error resetting queue:", error);
      });
  };

  React.useEffect(() => {
    const queueRef = ref(database, 'queue/number');
    onValue(queueRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setCurrentQueue(data);
      }
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Queue Management</h1>
        <Button 
          variant="destructive" 
          onClick={handleResetQueue}
        >
          Reset Queue
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center py-4">
              {currentQueue}
            </div>
            <Button 
              className="w-full" 
              onClick={handleNextQueue}
            >
              Next Queue
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Queue Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Served Today:</span>
                <span className="font-bold">{currentQueue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Service Time:</span>
                <span className="font-bold">5 mins</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Status:</span>
                <span className="text-green-500 font-bold">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminQueue; 