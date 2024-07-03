# ReelsNet

Project Structure Explanation

## Overview of Directory Structure:

-`src`: Directory containing the source code.

-`src/assets`: Contains files such as images, icons, fonts.

-`src/components`: Contains files for components.

-`src/constants`: Contains files for constants.

-`src/routes`: Contains files for routes.

-`src/navigation`: Contains files for setting up screens.

-`src/screens`: Contains files for screens.

-`src/utils`: Contains utility functions such as encryption, email sending, etc.

## Commands to Run the Project:

🥈 Initialize node_modules:

👉 `yarn`

---

🥈 Run the project in development environment:

👉 `yarn start:development`

---

🥈 Run the project in development environment:

👉 `yarn start:production`

---

🥈 Build the TypeScript project to JavaScript for production:

### Android:

- To build an APK file:
  👉 `yarn apk`

- To build an AAB file:
  👉 `yarn aab`

### iOS:

- To build the file for iOS:
  1. Open Xcode.
  2. Select your project in Xcode.
  3. Choose the "Product" menu.
  4. Select "Archive" to create the build file.

---

🥈 Check ESLint / Prettier errors:

👉 `yarn lint`

👉 `npm run lint`

---

🥈 If you want ESLint to automatically fix errors, run:
👉 `npm run lint:fix`

---

🥈 Similarly, for Prettier, use:

👉 `npm run prettier`

👉 `npm run prettier:fix`

#### 🥇 Some notes:

Use Flipper to view logs.

Since this project runs with TypeScript, when installing any library, make sure to check if it supports TypeScript. Some libraries on npm have built-in TypeScript support, while others require you to install the TypeScript definitions separately via @types/library-name.

For example, to install expo-image-picker, you should do:

👉 `yarn add expo-image-picker`

👉 `yarn add -D @types/expo-image-picker`

Thank read me!!! 🤪
