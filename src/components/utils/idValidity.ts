export const idValidity = (grade: string): number => {
  // The numbers define how many more year they will graduate
  const gradeMapping: { [key: string]: number } = {
    NSY: 3,
    KD1: 2,
    KD2: 1,
    G1: 6,
    G2: 5,
    G3: 4,
    G4: 3,
    G5: 2,
    G6: 1,
    G7: 3,
    G8: 2,
    G9: 1,
    G10: 3,
    G11: 2,
    G12: 1,
  };

  if (grade in gradeMapping) {
    return gradeMapping[grade];
  }
  return -1;
};
