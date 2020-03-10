/// <reference types="react" />
import { Day } from "../../interfaces";
interface WeeksProps {
    onDatePick: Function;
    selectedDate: string;
    weeks: Day[][];
}
declare const Weeks: ({ weeks, selectedDate, onDatePick }: WeeksProps) => JSX.Element;
export default Weeks;
