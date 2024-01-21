export function compareTime(startTime: string, endTime: string) {
  const now = new Date();

  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  const currentTimeInMinutes = currentHours * 60 + currentMinutes;
  const startTimeInMinutes = startHours * 60 + startMinutes;
  const endTimeInMinutes = endHours * 60 + endMinutes;

  return (
    currentTimeInMinutes >= startTimeInMinutes &&
    currentTimeInMinutes <= endTimeInMinutes
  );
}
