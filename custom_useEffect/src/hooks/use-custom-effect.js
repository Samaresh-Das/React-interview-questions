import { useRef } from "react"; // Import the useRef hook from React

const useCustomEffect = (cb, dependencies) => {
  // Define a custom hook called useCustomEffect that takes two arguments: cb (a callback function) and dependencies (an optional array of dependencies)
  //handle first render
  const firstRender = useRef(true); // Create a mutable reference called firstRender and initialize it with true (to track if it's the first render)
  const previousDependencies = useRef([]); // Create a mutable reference called previousDependencies and initialize it with an empty array (to store the previous dependencies)

  if (firstRender.current) {
    // If it's the first render (firstRender.current is true)
    firstRender.current = false; // Set firstRender.current to false (to mark that it's no longer the first render)
    const cleanup = cb(); // Call the callback function cb() and store its return value (which should be a cleanup function) in the cleanup variable
    return () => {
      // Return a cleanup function
      if (cleanup && typeof cleanup === "function") {
        // If the cleanup variable is truthy and is a function
        cleanup(); // Call the cleanup function
      }
    };
  }

  //handle render when dependencies change
  const dependenciesChanged = dependencies
    ? JSON.stringify(dependencies) !==
      JSON.stringify(previousDependencies.current) // If dependencies is provided, check if the current dependencies are different from the previous dependencies by stringifying and comparing them
    : true; // If dependencies is not provided, assume that the dependencies have changed (true)

  if (dependenciesChanged) {
    // If the dependencies have changed
    const cleanup = cb(); // Call the callback function cb() and store its return value (which should be a cleanup function) in the cleanup variable
    if (cleanup && typeof cleanup === "function" && dependencies) {
      // If the cleanup variable is truthy, is a function, and dependencies is provided
      cleanup(); // Call the cleanup function
    }
  }

  previousDependencies.current = dependencies || []; // Update the previousDependencies.current with the current dependencies or an empty array (if dependencies is falsy)
};

export default useCustomEffect; // Export the useCustomEffect hook as the default export
