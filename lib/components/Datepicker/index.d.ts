/// <reference types="react" />
import "./datepicker.scss";
interface DatepickerProps {
    disableWeekendSelection?: boolean;
    defaultValue?: string;
    onDatePick?: Function;
}
declare const Datepicker: ({ disableWeekendSelection, defaultValue, onDatePick }: DatepickerProps) => JSX.Element;
export default Datepicker;
