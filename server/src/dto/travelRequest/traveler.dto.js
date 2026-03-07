export const travelerDTO = (traveler) => {
  return {
    name: traveler?.name?.trim(),
    age: traveler?.age,
    gender: traveler?.gender,
  };
};
