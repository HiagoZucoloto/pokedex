export const getColorClass = (id: number): string => {
  const colors = [
    "bg-green-100",
    "bg-green-200",
    "bg-green-300",
    "bg-yellow-100",
    "bg-yellow-200",
    "bg-blue-100",
    "bg-blue-200",
    "bg-blue-300",
    "bg-teal-200",
    "bg-teal-300",
    "bg-purple-100",
    "bg-purple-200",
    "bg-orange-200",
    "bg-orange-300",
    "bg-pink-100",
    "bg-pink-200",
  ];

  const index = id % colors.length;
  return colors[index];
};
