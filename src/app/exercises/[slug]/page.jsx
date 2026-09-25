import ExerciseDetails from "@/components/exercises/ExerciseDetails";
import { getExerciseById } from "@/lib/exercises";
import { notFound } from "next/navigation";

export default async function ExercisePage({ params }) {
  const { slug } = await params;

  const exercise = await getExerciseById(slug);

  if (!exercise) {
    notFound();
  }

  return <ExerciseDetails exercise={exercise} />;
}
