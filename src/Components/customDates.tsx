import { endOfDay, isSameDay, startOfYear } from "date-fns";

interface Irange {
  startDate: Date;
  endDate: Date;
}
const customDates = [
  {
    label: "This Year",
    range: () => ({
      startDate: startOfYear(new Date()),
      endDate: endOfDay(new Date()),
    }),
    isSelected(range: Irange) {
      const definedRange = this.range();
      return (
        isSameDay(range.startDate, definedRange.startDate) &&
        isSameDay(range.endDate, definedRange.endDate)
      );
    },
  },
  {
    label: "All trades",
    range: () => ({
      startDate: startOfYear(new Date(2016, 0, 1)),
      endDate: endOfDay(new Date()),
    }),
    isSelected(range: Irange) {
      const definedRange = this.range();
      return (
        isSameDay(range.startDate, definedRange.startDate) &&
        isSameDay(range.endDate, definedRange.endDate)
      );
    },
  },
];
export default customDates;
