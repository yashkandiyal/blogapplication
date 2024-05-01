import React, { useState, ChangeEvent, FormEvent } from "react";

const RegisterPage = () => {
  type Data = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  const [formData, setFormData] = useState<Data>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordColor, setPasswordColor] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Check password strength and set color accordingly
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$])(?=.*[0-9]).{8,}$/;
    if (name === "password") {
      if (value.length < 6 || !strongPasswordRegex.test(value)) {
        setPasswordColor("red");
      } else {
        setPasswordColor("green");
      }
    }
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitted(true);

    const { username, email, password, confirmPassword } = formData;

    // Check if all fields are filled
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setError("Please make sure your passwords match");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    // Check if password is strong
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$])(?=.*[0-9]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setError(
        "Please make sure your password is strong. Add special characters such as @, #, $, and uppercase letters."
      );
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        alert("Credentials successfully sent to register route!");
      }
    } catch (error) {
      console.log("Error at register page:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden md:max-w-md">
        <div className="px-8 py-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">
            Create an account
          </h2>
          {isSubmitted && error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                onBlur={handlePasswordBlur}
                onFocus={handlePasswordFocus}
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-green-500 sm:text-sm mt-2 ${
                  passwordColor === "red" && passwordFocused
                    ? "focus:border-red-500"
                    : passwordColor === "green" && passwordFocused
                    ? "focus:border-green-500"
                    : "border-gray-300"
                }`}
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M3.293 6.293a1 1 0 011.414-1.414L10 10.586l5.293-5.293a1 1 0 111.414 1.414L11.414 12l5.293 5.293a1 1 0 01-1.414 1.414L10 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 12 3.293 6.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M2.707 10.707a1 1 0 010-1.414l8-8a1 1 0 011.414 0l8 8a1 1 0 01-1.414 1.414L11 4.414V15a1 1 0 11-2 0V4.414L4.121 10.293a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"
                placeholder="Confirm Password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
