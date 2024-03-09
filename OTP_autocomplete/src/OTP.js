import { useEffect, useRef, useState } from "react"; // Import required hooks

const OTP = () => {
  const [otp, setOtp] = useState(new Array(4).fill("")); // Initialize state with an array of 4 empty strings
  const inputRefs = useRef([]); // Create a ref to store input field references

  // Focus on the first input field on first render
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (e, index) => {
    const { value } = e.target; // Get the new value from the input field
    if (!/^\d*$/.test(value)) return; // Exit if the value is not a number
    const newOTP = [...otp]; // Create a copy of the otp state
    newOTP[index] = value; // Update the value at the current index
    setOtp(newOTP); // Update the otp state
    if (value && index < otp.length - 1) {
      // If there's a value and it's not the last input field
      inputRefs.current[index + 1].focus(); // Focus on the next input field
    }

    //IDEA - if the next field has value it'll go to the next input field that is empty until the end of the array.
    let nextIndex = index + 1; // Initialize nextIndex to the index of the next input field
    while (nextIndex < otp.length && newOTP[nextIndex]) {
      // Loop until an empty input field is found or the end of the array is reached
      nextIndex++; // Increment nextIndex to check the next input field
    }
    if (value && nextIndex < otp.length) {
      // If the current input field has a value and there's an empty input field ahead
      inputRefs.current[nextIndex].focus(); // Focus on the next empty input field
    } else if (!value && index > 0) {
      // If the current input field is empty and it's not the first one
      inputRefs.current[index - 1]?.focus(); // Focus on the previous input field
    }

    if (!value && index > 0) {
      // If the input field is empty and it's not the first one
      inputRefs.current[index - 1]?.focus(); // Focus on the previous input field
    }
  };

  //IDEA - if the user pastes, the fields will auto filled with proper behavior
  const handlePaste = (e, index) => {
    e.preventDefault(); // Prevent default paste behavior
    const pastedValue = e.clipboardData
      .getData("text")
      .split("")
      .filter((char, i) => index < otp.length - i); // Get the pasted value and filter out characters that won't fit
    const newOtp = [...otp]; // Create a copy of the otp state
    pastedValue.forEach((char, i) => {
      newOtp[index + i] = char; // Update the otp state with the pasted characters
    });
    setOtp(newOtp); // Update the otp state
    inputRefs.current[index + pastedValue.length]?.focus(); // Focus on the input field after the last pasted character
  };

  //IDEA - User can use arrow keys to switch fields
  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight" && index < otp.length - 1) {
      // If the right arrow key is pressed and it's not the last input field
      inputRefs.current[index + 1].focus(); // Focus on the next input field
    }
    if (e.key === "ArrowLeft" && index > 0) {
      // If the left arrow key is pressed and it's not the first input field
      inputRefs.current[index - 1].focus(); // Focus on the previous input field
    }
  };

  return (
    <div>
      {otp.map((value, index) => (
        <input
          style={{ width: 60, height: 40 }} // Set the width and height of the input fields
          ref={(el) => (inputRefs.current[index] = el)} // Store the input field reference
          key={index}
          type="text"
          onPaste={(e) => handlePaste(e, index)} // Handle paste event
          onKeyDown={(e) => handleKeyDown(e, index)} // Handle keydown event
          maxLength="1" // Allow only one character in the input field
          value={value} // Set the value of the input field
          onChange={(e) => handleChange(e, index)} // Handle change event
        />
      ))}
    </div>
  );
};

export default OTP;
