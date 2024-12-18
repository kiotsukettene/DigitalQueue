import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

function AdminHome() {
  const [currentQueueNumber, setCurrentQueueNumber] = useState(0);
  const [totalCustomersServed, setTotalCustomersServed] = useState(0);

  // Fetch real-time queue data from Firebase
  useEffect(() => {
    const queueRef = ref(database, 'queue/number');
    const servedRef = ref(database, 'queue/served');

    const unsubscribeQueue = onValue(queueRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setCurrentQueueNumber(data);
      }
    });

    const unsubscribeServed = onValue(servedRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setTotalCustomersServed(data);
      }
    });

    return () => {
      unsubscribeQueue();
      unsubscribeServed();
    };
  }, []);

  // Chart data
  const dailyChartData = {
    labels: ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"],
    datasets: [
      {
        label: "Customers Served",
        data: [5, 10, 8, 7, 12, 15, 18, 20],
        backgroundColor: "rgb(120, 113, 108)", // Stone-500
        borderColor: "rgb(87, 83, 78)", // Stone-600
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