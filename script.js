const specialCharactersList = document.querySelector(
  ".special_characters_list"
);

const generatePassword = () => {
  // Scrape DOM for user preferences
  const length = parseInt(document.getElementById("length_bar").value, 10);
  const lower_case = {
    enabled: document.getElementById("lower_case").checked,
    min: parseInt(document.getElementById("lower_case_min").value, 10) || 0,
  };
  const upper_case = {
    enabled: document.getElementById("upper_case").checked,
    min: parseInt(document.getElementById("upper_case_min").value, 10) || 0,
  };
  const numbers = {
    enabled: document.getElementById("numbers").checked,
    min: parseInt(document.getElementById("numbers_min").value, 10) || 0,
  };
  const special_characters = {
    enabled: Array.from(
      specialCharactersList.querySelectorAll("input[type='checkbox']")
    ).some((checkbox) => checkbox.checked),
    min:
      parseInt(document.getElementById("special_characters_min").value, 10) ||
      0,
  };
  //get array of all selected special characters
  const specialChars = Array.from(
    specialCharactersList.querySelectorAll("input[type='checkbox']:checked")
  ).map((checkbox) => checkbox.id.replace("special_char_", ""));

  // Build character set based on preferences
  const lowercase = lower_case.enabled ? "abcdefghijklmnopqrstuvwxyz" : "";
  const uppercase = upper_case.enabled ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
  const numSet = numbers.enabled ? "0123456789" : "";
  const charString = lowercase + uppercase + numSet + specialChars.join("");
  let result = "";

  for (let i = 0 ; i < length; i++ ) {
    const randomIndex = Math.floor(Math.random() * length);
    result+=charString[randomIndex];
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
      const randomIndex = Math.floor(Math.random() * charString.length);
      result += charString[randomIndex];
    }
  }

  output_field
    ? (output_field.innerHTML = result)
    : console.error("Output field element not found.");

  console.log("Generated Password:", result);
};

document.addEventListener("DOMContentLoaded", () => {
  createSpecialCharactersList();

  // Declare and reference the length_value element
  const generateButton = document.getElementById("generate_button");
  const lengthBar = document.getElementById("length_bar");
  const length_value = document.getElementById("length_value");
  const lowerCaseCheckbox = document.getElementById("lower_case");
  const upperCaseCheckbox = document.getElementById("upper_case");
  const numbersCheckbox = document.getElementById("numbers");

  // Update length when slider changes
  if (lengthBar) {
    lengthBar.addEventListener("input", (event) => {
      length_value.textContent = event.target.value;
    });
  }

  // Add event listener for generate button
  if (generateButton) {
    generateButton.addEventListener("click", generatePassword
    );
  } else {
    console.error("Element with ID 'generate_button' not found.");
  }
});

const createSpecialCharactersList = () => {
  // Example: Populate the specialCharactersList DOM element
  const specialCharacters = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "=",
    "+",
    "[",
    "]",
    "{",
    "}",
    ";",
    ":",
    "'",
    '"',
    ",",
    ".",
    "<",
    ">",
    "/",
    "?",
    "|",
    "`",
    "~",
  ];

  const fragment = document.createDocumentFragment();

  specialCharacters.forEach((char) => {
    const li = document.createElement("li");
    const label = document.createElement("label");
    label.setAttribute("for", `special_char_${char}`);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = `special_char_${char}`;
    input.name = `special_char_${char}`;
    input.checked = true;

    label.appendChild(input);
    label.appendChild(document.createTextNode(char));
    li.appendChild(label);
    fragment.appendChild(li);
  });

  specialCharactersList.appendChild(fragment);
};
