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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Daily Report Card */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View today's queue statistics and performance metrics
            </p>
            <Button 
              className="w-full"
              onClick={() => generateReport('daily')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Daily Report
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Report Card */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Analyze this week's queue patterns and trends
            </p>
            <Button 
              className="w-full"
              onClick={() => generateReport('weekly')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Weekly Report
            </Button>
          </CardContent>
        </Card>

        {/* Monthly Report Card */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Review monthly performance and statistics
            </p>
            <Button 
              className="w-full"
              onClick={() => generateReport('monthly')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Monthly Report
            </Button>
          </CardContent>
        </Card>
      </div>

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