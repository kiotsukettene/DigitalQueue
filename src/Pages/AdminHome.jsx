import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

function AdminHome() {
  const [currentQueueNumber, setCurrentQueueNumber] = useState(0);
  const [totalCustomersServed, setTotalCustomersServed] = useState(0);
  const [hourlyData, setHourlyData] = useState(Array(8).fill(0));

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const queueRef = ref(database, 'queue/list');
    
    const unsubscribeList = onValue(queueRef, (snapshot) => {
      const data = snapshot.val();
      
      if (!data) return;

      const hourCounts = Array(8).fill(0);
      let totalServed = 0;
      let currentNumber = 0;
      
      Object.values(data).forEach(entry => {
        if (entry.status === 'Complete') {
          // Parse the timestamp and adjust for timezone
          const entryDate = new Date(entry.timestamp);
          const localHour = entryDate.getHours() + 8; // Adjust for timezone difference
          
          // Get today's date for comparison
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          // Check if the entry is from today
          const entryDay = new Date(entryDate);
          entryDay.setHours(0, 0, 0, 0);
          
          if (entryDay.getTime() === today.getTime()) {
            totalServed++;
            
            console.log('Processing entry:', {
              originalTimestamp: entry.timestamp,
              localHour: localHour,
              parsedDate: entryDate.toString()
            });
            
            // Map the hour to the correct slot (8 AM - 3 PM)
            if (localHour >= 8 && localHour <= 15) {
              hourCounts[localHour - 8]++;
            }
          }
        }

        const entryNumber = parseInt(entry.number);
        if (!isNaN(entryNumber) && entryNumber > currentNumber) {
          currentNumber = entryNumber;
        }
      });

      console.log('Final hour counts:', hourCounts);

      setHourlyData(hourCounts);
      setTotalCustomersServed(totalServed);
      setCurrentQueueNumber(currentNumber);
    });

    return () => unsubscribeList();
  }, []);

  const dailyChartData = {
    labels: ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"],
    datasets: [
      {
        label: "Customers Served",
        data: hourlyData,
        backgroundColor: "rgb(120, 113, 108)",
        borderColor: "rgb(87, 83, 78)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options for better styling
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {/* Current Queue Number */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-stone-800">Current Queue Number</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center text-stone-900">
              {currentQueueNumber}
            </div>
          </CardContent>
        </Card>

        {/* Total Customers Served */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-stone-800">Total Customers Served Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center text-stone-900">
              {totalCustomersServed}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-stone-800">Daily Customers Served</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <Bar data={dailyChartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminHome; 