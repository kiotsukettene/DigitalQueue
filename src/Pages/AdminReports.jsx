import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Download } from 'lucide-react';

function AdminReports() {
  const generateReport = (type) => {
    // Add report generation logic here
    console.log(`Generating ${type} report...`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>


       

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Summary Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm font-medium">Total Served</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <div>
                <p className="text-sm font-medium">Average Wait Time</p>
                <p className="text-2xl font-bold">15 min</p>
              </div>
              <div>
                <p className="text-sm font-medium">Peak Hours</p>
                <p className="text-2xl font-bold">2-4 PM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminReports; 