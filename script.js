const specialCharactersList = document.querySelector(
  ".special_characters_list"
);

const user_preferences = {
  length: 0,
  lower_case: { include: true, min: 1 },
  upper_case: { include: true, min: 1 },
  numbers: { include: true, min: 1 },
  special_characters: {
    "!": true,
    "@": true,
    "#": true,
    $: true,
    "%": true,
    "^": true,
    "&": true,
    "*": true,
    "(": true,
    ")": true,
    "-": true,
    _: true,
    "=": true,
    "+": true,
    "[": true,
    "]": true,
    "{": true,
    "}": true,
    ";": true,
    ":": true,
    "'": true,
    '"': true,
    ",": true,
    ".": true,
    "<": true,
    ">": true,
    "/": true,
    "?": true,
    "|": true,
    "`": true,
    "~": true,
    min: 1,
  },
  frequency: 0,
};

const createSpecialCharactersList = () => {
  // Example: Populate the specialCharactersList DOM element
  const result = Object.keys(user_preferences.special_characters)
    .filter((char) => user_preferences.special_characters[char])
    .map(
      (char) => `
            <li>
                <label for="char_${char}">
                    <input type="checkbox" id="char_${char}" name="char_${char}" checked>
                    ${char}
                </label>
            </li>
        `
    )
    .join("");

  specialCharactersList.innerHTML = result;
};

// Call the function as soon as the page loads
document.addEventListener("DOMContentLoaded", createSpecialCharactersList);

const generatePassword = (options) => {
  const { length, lower_case, upper_case, numbers, special_characters } =
    options;
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numSet = numbers ? "0123456789" : "";
  const specialChars = Object.keys(special_characters)
    .filter((char) => special_characters[char])
    .join("");
  const characters =
    (lower_case ? lowercase : "") +
    (upper_case ? uppercase : "") +
    numSet +
    specialChars;
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  // Ensure the result meets the minimum character requirements
  const validateResult = () => {
    const hasMinLower =
      (result.match(new RegExp(`[${lowercase}]`, "g")) || []).length >=
      lower_case.min;
    const hasMinUpper =
      (result.match(new RegExp(`[${uppercase}]`, "g")) || []).length >=
      upper_case.min;
    const hasMinNumbers =
      (result.match(new RegExp(`[${numSet}]`, "g")) || []).length >=
      numbers.min;
    const hasMinSpecial =
      (result.match(new RegExp(`[${specialChars}]`, "g")) || []).length >=
      special_characters.min;

    return hasMinLower && hasMinUpper && hasMinNumbers && hasMinSpecial;
  };

  while (!validateResult()) {
    result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
  }

  console.log("Generated Password:", result);
};

document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("generate_button");
  if (generateButton) {
    generateButton.addEventListener("click", () => generatePassword(user_preferences));
  } else {
    console.error("Element with ID 'generate_button' not found.");
  }
});
