import { endOfDay, isSameDay, startOfYear } from "date-fns";
import { StaticRange, Range } from "react-date-range";

const customDates: StaticRange[] = [
  {
    label: "This Year",
    range: () => ({
      startDate: startOfYear(new Date()),
      endDate: endOfDay(new Date()),
    }),
    isSelected(range: Range) {
      const definedRange = this.range();
      if (
        !range.startDate ||
        !range.endDate ||
        !definedRange.startDate ||
        !definedRange.endDate
      )
        return true;
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
    isSelected(range: Range) {
      const definedRange = this.range();
      if (
        !range.startDate ||
        !range.endDate ||
        !definedRange.startDate ||
        !definedRange.endDate
      )
        return false;
      return (
        isSameDay(range.startDate, definedRange.startDate) &&
        isSameDay(range.endDate, definedRange.endDate)
      );
    },
  },
];
export default customDates;
