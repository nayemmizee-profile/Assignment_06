const ApiUrl = "https://api.abcz.workers.dev/api/fitlog";

export async function getExercises() {
  const response = await fetch(ApiUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch exercises");
  }

  return response.json();
}

export async function getExerciseById(id) {
  const exercises = await getExercises();

  return exercises.find((exercise) => String(exercise.DataID) === String(id));
}
