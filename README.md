# Lonare React Time Picker

A modern, lightweight React time picker component with a clean interface and Tailwind CSS styling.

## Installation


![NPM Version](https://img.shields.io/npm/v/lonare-react-date-picker) 

![License](https://img.shields.io/npm/l/lonare-react-date-picker) 

![Bundle Size](https://img.shields.io/bundlephobia/min/lonare-react-date-picker)

## Features

- 📅 Clean and intuitive interface
- 🎨 Styled with Tailwind CSS
- 📱 Responsive design
- 🔧 Highly customizable
- 🎯 Date range restrictions
- 🚀 Easy to implement
- ⚡ Lightweight

## Preview

![Time Picker Default View](https://raw.githubusercontent.com/harshalone/lonare-react-time-picker/main/assets/images/1.png)
![Time Picker Open State](https://raw.githubusercontent.com/harshalone/lonare-react-time-picker/main/assets/images/2.png)
![Time Picker Selection](https://raw.githubusercontent.com/harshalone/lonare-react-time-picker/main/assets/images/3.png)

## Installation

```bash
npm install lonare-react-time-picker
```

or with yarn:

```
yarn add lonare-react-time-picker
```

## Prerequisites

This package requires the following peer dependencies:

```json
{
  "react": ">=16.8.0",
  "react-dom": ">=16.8.0",
  "@heroicons/react": ">=2.0.0"
}
```

Make sure you have Tailwind CSS configured in your project.

## Usage

```jsx
import TimePicker from 'lonare-react-time-picker';

function App() {
  const handleTimeChange = (time) => {
    console.log('Selected time:', time);
  };
  return (
      <TimePicker
        onChange={handleTimeChange}
        value="10:00"
        disabled={false}
        placeholder="Select time"
      />
  );
}
```

## Props

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | '' | Current time value in "HH:mm" format |
| onChange | function | required | Callback function that receives the selected time |
| disabled | boolean | false | Disables the time picker when true |
| className | string | '' | Additional CSS classes for the container |
| placeholder | string | 'Select time' | Placeholder text shown when no time is selected |
| format | string | '24h' | Time format ('12h' or '24h') |

 



I'll add a comprehensive examples section to the README. Here's the additional content to add under the basic Usage section:

 
## Examples

### Basic Usage

```jsx
import TimePicker from 'lonare-react-time-picker';

function BasicExample() {
  const [time, setTime] = useState('10:00');
  
  return (
    <TimePicker
      value={time}
      onChange={setTime}
    />
  );
}
```

### With Custom Placeholder
```jsx
function PlaceholderExample() {
  const [time, setTime] = useState('');
  
  return (
    <TimePicker
      value={time}
      onChange={setTime}
      placeholder="Pick meeting time"
    />
  );
}
```

### Disabled State
```jsx
function DisabledExample() {
  return (
    <TimePicker
      value="09:30"
      onChange={() => {}}
      disabled={true}
    />
  );
}
```

### With Custom Styling
```jsx
function StyledExample() {
  const [time, setTime] = useState('14:00');
  
  return (
    <TimePicker
      value={time}
      onChange={setTime}
      className="custom-time-picker"
    />
  );
}
```

### Form Integration
```jsx
function FormExample() {
  const [formData, setFormData] = useState({
    meetingTime: '',
    title: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        placeholder="Meeting Title"
      />
      <TimePicker
        value={formData.meetingTime}
        onChange={(time) => setFormData({...formData, meetingTime: time})}
        placeholder="Select Meeting Time"
      />
      <button type="submit">Schedule Meeting</button>
    </form>
  );
}
```

### With Error Handling
```jsx
function ErrorHandlingExample() {
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handleTimeChange = (newTime) => {
    // Example validation: Don't allow times before 9 AM
    const hour = parseInt(newTime.split(':')[0]);
    if (hour < 9) {
      setError('Please select a time after 9:00 AM');
      return;
    }
    setError('');
    setTime(newTime);
  };

  return (
    <div>
      <TimePicker
        value={time}
        onChange={handleTimeChange}
        className={error ? 'error' : ''}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
```

### With Custom Format
```jsx
function CustomFormatExample() {
  const [time, setTime] = useState('13:00');
  
  return (
    <TimePicker
      value={time}
      onChange={setTime}
      format="12h" // Use 12-hour format
    />
  );
}
```
 