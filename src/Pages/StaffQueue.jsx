import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/Table";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { database } from '../firebase';
import { ref, set, onValue, push } from 'firebase/database';

function StaffQueue() {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [queue, setQueue] = useState([]);
  const [totalServedToday] = useState(5);
  const [pendingQueue] = useState(10);
  

  useEffect(() => {
    const queueRef = ref(database, 'queue');
    
    onValue(queueRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCurrentNumber(data.number || 0);
        
        // Convert queue object to array and add IDs
        const queueArray = data.list ? 
          Object.entries(data.list).map(([key, value]) => ({
            id: key,
            ...value
          })) : [];
        
        setQueue(queueArray);
      }
    });
  }, []);

  const handleComplete = async (id) => {
    try {
      // Update the status to Complete
      await set(ref(database, `queue/list/${id}/status`), 'Complete');
      
      // Update the timestamp
      await set(ref(database, `queue/list/${id}/timestamp`), new Date().toISOString());
      
      // Add to logs
      await push(ref(database, 'queue/logs'), {
        number: queue.find(item => item.id === id)?.number,
        timestamp: new Date().toISOString(),
        action: 'completed'
      });
    } catch (error) {
      console.error('Error completing queue:', error);
    }
  };

  const generateNewNumber = async () => {
    const newNumber = currentNumber + 1;
    try {
      await set(ref(database, 'queue/number'), newNumber);
      await push(ref(database, 'queue/list'), {
        number: newNumber,
        status: 'Pending',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error generating number:', error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await set(ref(database, `queue/list/${id}/status`), newStatus);
      if (newStatus === 'Completed') {
        // Add to logs
        await push(ref(database, 'queue/logs'), {
          number: queue.find(item => item.id === id)?.number,
          timestamp: new Date().toISOString(),
          action: 'completed'
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const resetQueue = async () => {
    try {
      await set(ref(database, 'queue'), {
        number: 0,
        list: null
      });
    } catch (error) {
      console.error('Error resetting queue:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900">Queue Management</h1>
        <Button onClick={generateNewNumber}>Generate Number</Button>
      </div>

      {/* Queue Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Queue Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queue.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.number}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleComplete(item.id)}
                    disabled={item.status === 'Complete'}
                    variant={item.status === 'Complete' ? 'outline' : 'default'}
                  >
                    {item.status === 'Complete' ? 'Completed' : 'Complete'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Served Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalServedToday}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pendingQueue}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default StaffQueue; 