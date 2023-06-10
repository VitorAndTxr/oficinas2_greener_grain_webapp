export const TimeSelectDropdown = (start: number = 5, minutes = NaN) => {
  let time = []
  for (let i = start; i < 23; i++) {
    for (let j = 0; j < 2; j++) {

      if (i > start) {
        time.push({ value: `${i >= 10 ? i : "0" + i}:${j === 0 ? "00" : 30 * j}`, text: `${i >= 10 ? i : "0" + i}:${j === 0 ? "00" : 30 * j}` })
      }
      else if (minutes === 0 && i === start && j === 1) {
        time.push({ value: `${i >= 10 ? i : "0" + i}:${30 * j}`, text: `${i >= 10 ? i : "0" + i}:${30 * j}` });
      }
    }
  }

  return (time);
};


