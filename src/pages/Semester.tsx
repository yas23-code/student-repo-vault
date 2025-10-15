import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar } from "lucide-react";

const YEARS = [2025, 2024, 2023, 2022, 2021, 2020];

const Semester = () => {
  const { semesterId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Semesters
          </Button>
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-3">
            Semester {semesterId}
          </h1>
          <p className="text-muted-foreground text-lg">
            Select a year to view available resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {YEARS.map((year) => (
            <Link key={year} to={`/semester/${semesterId}/year/${year}`} className="block group">
              <Card className="p-6 transition-all duration-300 hover:scale-105 hover:shadow-elevated bg-card border-border cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-primary">
                    <Calendar className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {year}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Academic year materials
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Semester;
