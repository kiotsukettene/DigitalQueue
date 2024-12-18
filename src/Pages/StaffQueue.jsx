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
      <h1 className="text-2xl font-bold text-stone-900">Queue Management</h1>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Current Number</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-stone-900">{currentNumber}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Served Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-stone-900">{totalServedToday} min</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-stone-900">{pendingQueue}/hr</div>
          </CardContent>
        </Card>
      </div>

      {/* Queue Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Queue Controls</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button 
            onClick={generateNewNumber}
            className="bg-stone-800 hover:bg-stone-900"
          >
            Generate New Number
          </Button>
          <Button 
            onClick={resetQueue}
            variant="destructive"
          >
            Reset Queue
          </Button>
        </CardContent>
      </Card>

      {/* Current Queue Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queue.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.number}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Pending"
                          ? "secondary"
                          : item.status === "Called"
                          ? "primary"
                          : "success"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => updateStatus(item.id, "Called")}
                      >
                        Call
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => updateStatus(item.id, "Completed")}
                      >
                        Complete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default StaffQueue; 