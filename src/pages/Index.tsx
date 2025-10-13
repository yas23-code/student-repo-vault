import { SemesterCard } from "@/components/SemesterCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload } from "lucide-react";

const Index = () => {
  const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-3">
              CampusConnect
            </h1>
            <p className="text-muted-foreground text-lg">
              Your academic resource hub for all semesters
            </p>
          </div>
          <Link to="/upload">
            <Button className="bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-opacity">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {semesters.map((semester) => (
            <SemesterCard key={semester} semester={semester} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
