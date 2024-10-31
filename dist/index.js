'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

function TimePicker({
  setTime,
  defaultTime,
  startTime,
  endTime,
  buttonText,
  buttonClassName,
  timePickerClassName,
  is24Hour,
  disabled
}) {
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [selectedHour, setSelectedHour] = React.useState(null);
  const [selectedMinute, setSelectedMinute] = React.useState(null);
  const [error, setError] = React.useState(null);

  // Parse time function with validation
  const parseTime = time => {
    if (!time) return {
      hour: null,
      minute: null
    };
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeRegex.test(time)) {
      console.warn(`Invalid time format: ${time}. Expected format: HH:MM`);
      return {
        hour: null,
        minute: null
      };
    }
    const [hour, minute] = time.split(':').map(Number);
    return {
      hour,
      minute
    };
  };

  // Validate time ranges
  React.useEffect(() => {
    if (startTime && endTime) {
      const start = parseTime(startTime);
      const end = parseTime(endTime);
      if (start.hour > end.hour || start.hour === end.hour && start.minute >= end.minute) {
        setError('Start time must be before end time');
      } else {
        setError(null);
      }
    }
  }, [startTime, endTime]);
  const {
    hour: defaultHour,
    minute: defaultMinute
  } = parseTime(defaultTime);
  const {
    hour: startHour,
    minute: startMinute
  } = parseTime(startTime);
  const {
    hour: endHour,
    minute: endMinute
  } = parseTime(endTime);
  const hours = Array.from({
    length: 24
  }, (_, i) => i);
  const minutes = Array.from({
    length: 60
  }, (_, i) => i);

  // Initialize with default time
  React.useEffect(() => {
    if (defaultHour !== null && defaultMinute !== null) {
      setSelectedHour(defaultHour);
      setSelectedMinute(defaultMinute);
    }
  }, [defaultHour, defaultMinute]);
  const showTimePickerHandler = () => {
    if (disabled) return;
    setSelectedHour(null);
    setSelectedMinute(null);
    setShowTimePicker(true);
  };
  const handleHourSelection = hour => {
    setSelectedHour(hour);
    setSelectedMinute(null); // Reset minute selection when a new hour is selected
  };
  const set_time = () => {
    if (selectedHour !== null && selectedMinute !== null) {
      const time = `${String(selectedHour).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')}`;
      setTime(time);
      setShowTimePicker(false);
    }
  };

  // Helper function to filter available minutes based on selected hour and start/end times
  const getFilteredMinutes = hour => {
    const startMin = startHour === hour ? startMinute : 0;
    const endMin = endHour === hour ? endMinute : 59;
    return minutes.filter(min => min >= startMin && min <= endMin);
  };

  // Helper function to convert 24-hour format to 12-hour format with AM/PM
  const formatTo12Hour = hour => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12} ${period}`;
  };
  const formatTo12HourTime = (hour, minute = 0) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    const minuteFormatted = String(minute).padStart(2, '0');
    return `${hour12}:${minuteFormatted} ${period}`;
  };
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: "relative inline-block"
  }, /*#__PURE__*/React__namespace.createElement("button", {
    disabled: disabled,
    className: `border-2 border-gray-300 px-3 py-1 rounded-md flex flex-row gap-1 items-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'} ${buttonClassName}`,
    onClick: showTimePickerHandler
  }, /*#__PURE__*/React__namespace.createElement("span", {
    className: "text-gray-900 text-sm"
  }, buttonText)), error && /*#__PURE__*/React__namespace.createElement("div", {
    className: "text-red-500 text-sm mt-1"
  }, error), showTimePicker && /*#__PURE__*/React__namespace.createElement("div", {
    className: `absolute left-0 z-10 mt-2 min-w-[450px] bg-white rounded-md shadow-lg p-4 ${timePickerClassName}`
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "flex justify-end"
  }, /*#__PURE__*/React__namespace.createElement("button", {
    onClick: () => setShowTimePicker(false),
    className: "px-3 py-1 border-2 border-gray-300 bg-black text-white rounded-md hover:bg-gray-700"
  }, /*#__PURE__*/React__namespace.createElement("span", null, "\u2715"))), /*#__PURE__*/React__namespace.createElement("div", {
    className: "mt-4"
  }, selectedHour !== null && /*#__PURE__*/React__namespace.createElement("div", {
    className: "w-full flex mb-4"
  }, /*#__PURE__*/React__namespace.createElement("button", {
    onClick: () => setSelectedHour(null),
    className: `p-2 border-2 ${selectedHour !== null ? 'border-blue-400 my-1' : 'border-gray-300'} rounded-md flex-1 text-lg font-semibold relative`
  }, String(selectedHour).padStart(2, '0'), ":", selectedMinute !== null ? String(selectedMinute).padStart(2, '0') : 'MM', /*#__PURE__*/React__namespace.createElement("span", {
    className: "absolute bottom-0 right-1 text-xs text-blue-500"
  }, formatTo12HourTime(selectedHour, selectedMinute)))), selectedHour === null && /*#__PURE__*/React__namespace.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React__namespace.createElement("h3", {
    className: "text-lg font-semibold"
  }, "Select Hour"), /*#__PURE__*/React__namespace.createElement("div", {
    className: "grid grid-cols-4 gap-2 mt-2"
  }, hours.map(hour => /*#__PURE__*/React__namespace.createElement("button", {
    key: hour,
    onClick: () => handleHourSelection(hour),
    className: "p-2 border-2 border-gray-300 rounded-md hover:bg-gray-100 text-center text-lg relative"
  }, String(hour).padStart(2, '0'), /*#__PURE__*/React__namespace.createElement("span", {
    className: "absolute bottom-0 right-1 text-xs text-blue-500"
  }, formatTo12Hour(hour)))))), selectedHour !== null && selectedMinute === null && /*#__PURE__*/React__namespace.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React__namespace.createElement("h3", {
    className: "text-lg font-semibold"
  }, "Select Minute"), /*#__PURE__*/React__namespace.createElement("div", {
    className: "grid grid-cols-10 gap-2 mt-2"
  }, getFilteredMinutes(selectedHour).map(min => /*#__PURE__*/React__namespace.createElement("button", {
    key: min,
    onClick: () => setSelectedMinute(min),
    className: "px-1 py-1 border-2 border-gray-300 rounded-md hover:bg-gray-100 text-center text-sm"
  }, String(min).padStart(2, '0'))))), selectedHour !== null && selectedMinute !== null && /*#__PURE__*/React__namespace.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React__namespace.createElement("h3", {
    className: "text-lg font-semibold"
  }, "Selected Time: ", String(selectedHour).padStart(2, '0'), ":", String(selectedMinute).padStart(2, '0')), /*#__PURE__*/React__namespace.createElement("button", {
    onClick: () => set_time(),
    className: "p-2 mt-4 border-2 border-gray-300 w-full bg-black text-white rounded-md hover:bg-gray-700"
  }, "Done")))));
}
TimePicker.propTypes = {
  setTime: PropTypes.func,
  defaultTime: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  buttonText: PropTypes.string,
  buttonClassName: PropTypes.string,
  timePickerClassName: PropTypes.string,
  is24Hour: PropTypes.bool,
  disabled: PropTypes.bool
};
TimePicker.defaultProps = {
  setTime: () => {},
  defaultTime: '',
  startTime: '',
  endTime: '',
  buttonText: 'Select Time',
  buttonClassName: '',
  timePickerClassName: '',
  is24Hour: false,
  disabled: false
};

exports.TimePicker = TimePicker;
exports.default = TimePicker;
