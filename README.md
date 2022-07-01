# Verify WhatsApp Number

> This is an example implementation of [adiwajshing/Baileys](https://github.com/adiwajshing/Baileys)

## What is this?

This is a tool which you can use to validate WhatsApp numbers in bulk.

**Note: This tool has only been tested using Indonesian phone numbers.**

## How to use?

1. Clone this repo.

2. Enter the project repo.

3. Run `npm install` or `yarn install`.

4. Prepare a file in the root folder titled `numbers.txt`. Number format must be like country code and then the numbers, without any special character, e.g. 6281XXXXXXXXXXX

5. Run `npm run start` or `yarn start` depending on your package manager.

6. Connect your WhatsApp account by scanning the QR code through your WhatsApp (first time only.)

7. Result will be stored in the root folder in a file titled `validNumbers.txt`.
